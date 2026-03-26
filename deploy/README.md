# AGILE SAPIENS Deployment Procedures

## Quick Deployment Checklist

### Pre-Deployment
- [ ] `hugo --gc --minify` builds without errors
- [ ] Chapter 1 renders correctly (`draft: false`)
- [ ] Static assets present (favicon, logo)
- [ ] Level 1 compliance verified (no AI tool names)

### Deployment Options

#### Option 1: Manual Deployment (Recommended for MVP)
1. Run `bash deploy/deploy-production.sh`
2. Follow manual steps for server configuration
3. Execute rsync command when ready

#### Option 2: Cloudflare Pages (Future)
- Connect GitHub repository to Cloudflare Pages
- Build command: `hugo --gc --minify`
- Build output directory: `public`

#### Option 3: Netlify (Alternative)
- Connect GitHub repository to Netlify
- Build command: `hugo --gc --minify`
- Publish directory: `public`

### Post-Deployment Verification

#### Technical Checklist
- [ ] Website loads at production URL
- [ ] Chapter 1 accessible and renders correctly
- [ ] Favicon displays in browser tab
- [ ] Logo displays in header/navigation
- [ ] Social sharing previews work (Twitter, LinkedIn)
- [ ] Mobile responsive design verified

#### Content Checklist
- [ ] All internal links work (relref)
- [ ] НЕПРОВЕРЕНО markers display appropriately
- [ ] Copyright notices and legal pages accessible
- [ ] Contact information up-to-date

### Emergency Rollback

If deployment issues occur:

1. Restore previous version: `rsync backup/ production-server:/path/`
2. Clear CDN cache if applicable
3. Verify site functionality
4. Investigate issues before retry

### DNS and CDN Configuration

For production domain setup:
- Domain: `sapiens.folkup.life` (suggested)
- CDN: Cloudflare (configured but not tested)
- SSL: Let's Encrypt or Cloudflare SSL

### Monitoring (Manual - No Analytics)

Track these metrics manually during first week:
- Page load performance (visual inspection)
- Community engagement (comments, shares)
- Error reports (user feedback)
- Traffic patterns (server logs if available)

---

**Status**: Basic deployment procedure ready for Chapter 1 launch
**Last Updated**: 2026-03-26
**Next Steps**: Configure production server details in deploy script