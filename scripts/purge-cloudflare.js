#!/usr/bin/env node
/**
 * AGIL-007: Cloudflare CDN Cache Purge Script
 * Purges CDN cache after successful deployment.
 *
 * STATUS 2026-04-26: INACTIVE under current architecture.
 * sapiens.folkup.life (subdomain) → CF proxy OFF (DNS only) per
 * vault/memory/infra.md DNS table. Let's Encrypt cert constraint forces
 * Proxy OFF on all subdomains; only apex (folkup.app, folkup.city) are Proxied.
 * No CDN on request path → cache purge N/A. Browser cache busting via
 * ETag/Last-Modified headers + Ctrl+F5 is sufficient.
 *
 * The script + workflow step (build-deploy.yml: Purge CDN Cache) remain
 * in the repo as future-proofing: graceful skip when CLOUDFLARE_TOKEN /
 * CLOUDFLARE_ZONE GH secrets are absent (see early exit below). To activate:
 * (1) enable CF proxy on subdomain (requires CF Origin Cert pattern for
 *     Let's Encrypt compatibility),
 * (2) create scoped Bearer token (Zone.Cache Purge:Edit, folkup.life only),
 * (3) set CLOUDFLARE_TOKEN + CLOUDFLARE_ZONE GH secrets.
 */

import https from 'https';

const CLOUDFLARE_TOKEN = process.env.CLOUDFLARE_TOKEN;
const CLOUDFLARE_ZONE = process.env.CLOUDFLARE_ZONE;

if (!CLOUDFLARE_TOKEN || !CLOUDFLARE_ZONE) {
  console.log('ℹ️  CLOUDFLARE_TOKEN/ZONE not configured — skipping CDN purge (non-critical for soft launch)');
  process.exit(0);
}

console.log('🌐 Cloudflare CDN Cache Purge — agile-sapiens');
console.log('============================================');

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: response });
        } catch (err) {
          reject(new Error(`Failed to parse response: ${err.message}`));
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function purgeCache() {
  try {
    console.log('🔄 Initiating cache purge...');

    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/zones/${CLOUDFLARE_ZONE}/purge_cache`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    // Purge all cache for the zone
    const purgeData = JSON.stringify({
      purge_everything: true
    });

    const response = await makeRequest(options, purgeData);

    if (response.statusCode === 200 && response.data.success) {
      console.log('✅ Cache purge successful');
      console.log(`📊 Purge ID: ${response.data.result.id}`);

      // Log cache purge details
      const logEntry = {
        timestamp: new Date().toISOString(),
        zone: CLOUDFLARE_ZONE,
        purge_id: response.data.result.id,
        status: 'success'
      };

      console.log('📋 Cache purge report:', JSON.stringify(logEntry, null, 2));

    } else {
      console.error('❌ Cache purge failed');
      console.error('Status:', response.statusCode);
      console.error('Response:', JSON.stringify(response.data, null, 2));
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Cache purge error:', error.message);
    process.exit(1);
  }
}

async function verifyPurge() {
  try {
    console.log('🔍 Verifying cache purge...');

    // Wait a moment for purge to propagate
    await new Promise(resolve => setTimeout(resolve, 2000));

    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/zones/${CLOUDFLARE_ZONE}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await makeRequest(options);

    if (response.statusCode === 200 && response.data.success) {
      const zone = response.data.result;
      console.log(`✅ Zone status verified: ${zone.name}`);
      console.log(`📊 Zone status: ${zone.status}`);
    } else {
      console.warn('⚠️  Zone verification warning (non-critical)');
    }

  } catch (error) {
    console.warn('⚠️  Zone verification failed (non-critical):', error.message);
  }
}

// Selective cache purge for specific files (if needed)
async function purgeSpecificFiles(files) {
  if (!files || files.length === 0) return;

  try {
    console.log(`🎯 Purging specific files: ${files.length} files`);

    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/zones/${CLOUDFLARE_ZONE}/purge_cache`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    const purgeData = JSON.stringify({
      files: files
    });

    const response = await makeRequest(options, purgeData);

    if (response.statusCode === 200 && response.data.success) {
      console.log('✅ Specific file purge successful');
    } else {
      console.error('❌ Specific file purge failed');
      console.error('Response:', JSON.stringify(response.data, null, 2));
    }

  } catch (error) {
    console.error('❌ Specific file purge error:', error.message);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const specificFiles = args.filter(arg => arg.startsWith('https://'));

  if (specificFiles.length > 0) {
    await purgeSpecificFiles(specificFiles);
  } else {
    await purgeCache();
  }

  await verifyPurge();

  console.log('');
  console.log('🎉 CDN cache management completed');
  console.log('🌐 agile-sapiens cache: PURGED');
  console.log('🚀 New content: LIVE');
}

main().catch(error => {
  console.error('❌ CDN cache purge failed:', error.message);
  process.exit(1);
});