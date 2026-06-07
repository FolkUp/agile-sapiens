/**
 * Telegram send helper with proper UTF-8 encoding.
 * Avoid bash variable interpolation breaking Russian chars.
 *
 * Usage:
 *   TG_BOT="..." node scripts/tg-send.cjs probe
 *   TG_BOT="..." node scripts/tg-send.cjs photo <photoUrl> <captionFile>
 *   TG_BOT="..." node scripts/tg-send.cjs delete <message_id>
 */
const https = require('https');
const fs = require('fs');

const TG_BOT = process.env.TG_BOT;
if (!TG_BOT) { console.error('TG_BOT required'); process.exit(1); }

// Default: Deploy Reports System thread (preview/tech channel)
// Override via env: TG_CHAT_ID, TG_THREAD_ID
const CHAT_ID = process.env.TG_CHAT_ID || '-1003596453051';
const THREAD_ID = process.env.TG_THREAD_ID || '9';

function tgPost(method, params) {
  return new Promise((resolve, reject) => {
    const body = Object.entries(params).map(([k, v]) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    ).join('&');
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${TG_BOT}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  if (cmd === 'probe') {
    const text = 'Проверка UTF-8: тест русского текста с эмодзи 🎷 и кавычками «ёлочки», тире —. Если читаемо — ок, продолжаем.';
    const r = await tgPost('sendMessage', { chat_id: CHAT_ID, message_thread_id: THREAD_ID, text });
    console.log(JSON.stringify({ ok: r.ok, message_id: r.result?.message_id, sent_text_first_80: r.result?.text?.slice(0, 80), error_code: r.error_code, description: r.description }, null, 2));
    return;
  }

  if (cmd === 'photo') {
    const [photoUrl, captionFile] = args;
    const caption = fs.readFileSync(captionFile, 'utf8');
    const params = { chat_id: CHAT_ID, photo: photoUrl, caption };
    // Only add thread_id if not 'none' (channels don't have threads)
    if (THREAD_ID && THREAD_ID !== 'none') params.message_thread_id = THREAD_ID;
    const r = await tgPost('sendPhoto', params);
    console.log(JSON.stringify({ ok: r.ok, message_id: r.result?.message_id, chat_id: r.result?.chat?.id, chat_title: r.result?.chat?.title, has_photo: r.result?.photo?.length > 0, caption_first_80: r.result?.caption?.slice(0, 80), error_code: r.error_code, description: r.description }, null, 2));
    return;
  }

  if (cmd === 'delete') {
    const [msgId] = args;
    const r = await tgPost('deleteMessage', { chat_id: CHAT_ID, message_id: msgId });
    console.log(JSON.stringify({ ok: r.ok, error_code: r.error_code, description: r.description }, null, 2));
    return;
  }

  if (cmd === 'message') {
    const [textFile] = args;
    const text = fs.readFileSync(textFile, 'utf8');
    const r = await tgPost('sendMessage', { chat_id: CHAT_ID, message_thread_id: THREAD_ID, text });
    console.log(JSON.stringify({ ok: r.ok, message_id: r.result?.message_id, sent_text_first_80: r.result?.text?.slice(0, 80), error_code: r.error_code, description: r.description }, null, 2));
    return;
  }

  console.error('Usage: probe | photo <url> <captionFile> | message <textFile> | delete <msgId>');
  process.exit(1);
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
