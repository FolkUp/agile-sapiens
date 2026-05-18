# 🚀 QUICK START: Cover Generation for AGILE SAPIENS

**Status:** ✅ Ready to use (infrastructure workaround implemented)  
**Time to generate:** ~5-10 minutes after token setup

## 1. Get Your Replicate API Token

1. Visit: https://replicate.com/account/api-tokens
2. Log in or create account (free tier available)
3. Create new token or copy existing one
4. Token will look like: `r8_1234567890abcdef...`

## 2. Set Token in PowerShell

```powershell
$env:REPLICATE_API_TOKEN = "your_actual_token_here"
```

## 3. Generate Covers

### Test First (Recommended)
```powershell
node scripts/generate-cover-emergency.js --dry-run
```

### Generate 3 Variants
```powershell
node scripts/generate-cover-emergency.js --variants 3
```

### Generate Single Cover
```powershell
node scripts/generate-cover-emergency.js --variants 1
```

## 📁 Output Location

Covers will be saved to: `static/images/`  
Filename format: `agile-sapiens-cover-literary-v1-2026-05-18T14-30-45.png`

## ⚡ Quick Setup Check

Run this to verify everything is ready:
```powershell
scripts/quick-setup.ps1
```

## 🎨 Cover Style

The generated covers will feature:
- **Theme:** Victorian engraving style, sepia palette
- **Title:** "AGILE SAPIENS" in bold serif typography
- **Subtitle:** "Литературный бизнес-анализ" and "How Literature Predicted Modern Management"
- **Design:** Academic aesthetic with literary symbols (quills, books, scrolls)
- **Format:** 9:16 aspect ratio (perfect for book covers)

## ⚠️ Troubleshooting

### "REPLICATE_API_TOKEN not set"
- Solution: Set the environment variable as shown in step 2

### "Node.js not found" 
- Node.js is available at: `C:\Program Files\nodejs\`
- Try running: `node --version`

### "Permission denied" or similar errors
- Run PowerShell as Administrator if needed

### API rate limits or errors
- Wait a few minutes between requests
- Check your Replicate account limits

## 📋 What Happens Next

1. Script generates 3 cover variants
2. Each takes ~30-60 seconds to generate
3. Files saved automatically to `static/images/`
4. Review generated covers and select best one
5. Add to git and deploy

## 🔧 Alternative Methods

If the emergency script doesn't work:

### Manual approach
1. Use Replicate web interface directly
2. Copy the prompt from `--dry-run` output
3. Download images manually

### Infrastructure setup
1. See: `SOPS_SETUP_INSTRUCTIONS.md`
2. Full SOPS + Age encryption setup
3. Proper secret management

## 📊 Success Metrics

After running, you should have:
- ✅ 3 cover image files in `static/images/`
- ✅ Victorian-style academic design
- ✅ Proper book dimensions (9:16)
- ✅ Ready for publication use

## 🎯 Next Steps

1. **Review covers:** Open generated files
2. **Select best:** Choose most appealing variant
3. **Add to git:** `git add static/images/agile-sapiens-cover-*`
4. **Update references:** Link cover in publication files
5. **Deploy:** Push to production

---

**Emergency Contact:** If nothing works, see `INFRASTRUCTURE_DIAGNOSIS_REPORT.md` for full technical details and alternative approaches.

**Infrastructure Status:** Working workaround implemented, proper SOPS infrastructure optional for this task.