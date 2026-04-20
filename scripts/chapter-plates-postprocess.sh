#!/bin/bash
# AGIL-079 chapter plates post-processing
# Universal 7% bottom crop per plate (removes Flux-invented signature-line phantoms)
# Builds HTML-picker grid for Андрей selection
#
# Usage: bash scripts/chapter-plates-postprocess.sh
# Source: C:/Transit/agil-079-cycle0/*.webp (42 files: 14 slots × 3 seeds)
# Output: C:/Transit/agil-079-cycle0-cleaned/*.webp + picker.html

set -euo pipefail

SRC_DIR="C:/Transit/agil-079-cycle0"
OUT_DIR="C:/Transit/agil-079-cycle0-cleaned"
mkdir -p "$OUT_DIR"

SLOTS=(ch0 ch1 ch2 ch3 ch4 ch5 ch6 ch7 ch8 ch9 ch10 int1 int2 int3)
# Slot → Act mapping (for grouping in picker)
declare -A SLOT_ACT=(
  [ch0]="I" [ch1]="I" [ch2]="I" [ch3]="I" [ch4]="I" [int1]="I"
  [ch5]="II" [ch6]="II" [ch7]="II" [int2]="II"
  [ch8]="III" [ch9]="III" [ch10]="III" [int3]="III"
)
declare -A SLOT_DIM=(
  [ch0]="2:3 vertical" [ch5]="2:3 vertical" [ch8]="2:3 vertical"
  [int1]="1:1 square" [int2]="1:1 square" [int3]="1:1 square"
  [ch1]="4:3 landscape" [ch2]="4:3 landscape" [ch3]="4:3 landscape" [ch4]="4:3 landscape"
  [ch6]="4:3 landscape" [ch7]="4:3 landscape" [ch9]="4:3 landscape" [ch10]="4:3 landscape"
)
declare -A SLOT_NAME=(
  [ch0]="Verne · 80 days (Act I opener)"
  [ch1]="Verne + Hetzel · publishing"
  [ch2]="Shelley · Frankenstein"
  [ch3]="Conan Doyle · Sherlock"
  [ch4]="Borges · Library of Babel"
  [ch5]="Verne · Mysterious Island (Act II opener)"
  [ch6]="Stevenson · Jekyll & Hyde"
  [ch7]="Cervantes · Don Quixote"
  [ch8]="Wells · Time Machine (Act III opener)"
  [ch9]="Vinge · Singularity"
  [ch10]="Gibson · Neuromancer"
  [int1]="Carroll + Bulgakov · Mad Tea Party"
  [int2]="Carroll + Bulgakov · Underground"
  [int3]="Carroll + Bulgakov · Looking-Glass"
)

echo "[1/2] Universal 7% bottom crop + minor side crops on all plates..."
CROPPED=0
for slot in "${SLOTS[@]}"; do
  for v in 1 2 3; do
    src="$SRC_DIR/${slot}-v${v}.webp"
    dst="$OUT_DIR/${slot}-v${v}.webp"
    if [[ ! -f "$src" ]]; then
      echo "  SKIP missing: ${slot}-v${v}"
      continue
    fi
    # Identify source dimensions
    W=$(magick identify -format "%w" "$src")
    H=$(magick identify -format "%h" "$src")
    CROP_BOTTOM=$(( H * 7 / 100 ))
    NEW_H=$(( H - CROP_BOTTOM ))
    magick "$src" -crop "${W}x${NEW_H}+0+0" +repage -strip -quality 90 "$dst"
    CROPPED=$((CROPPED + 1))
  done
done
echo "  cropped: $CROPPED plates"

echo "[2/2] Build HTML picker..."
PICKER="$OUT_DIR/picker.html"

cat > "$PICKER" <<'HTML_HEAD'
<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8">
<title>AGIL-079 picker — Зеркальце</title>
<style>
  :root { --bordo:#7D4450; --amber:#E8AD4A; --sage:#839E75; --ivory:#FEFCF6; --chocolate:#2A2317; --cream:#F5F1EA; --cappuccino:#8B7866; }
  * { box-sizing:border-box; }
  body { margin:0; padding:2rem 2rem 10rem; background:var(--ivory); color:var(--chocolate); font-family:Georgia,serif; }
  h1 { color:var(--bordo); font-size:1.6rem; margin:0 0 0.3rem; }
  .note { color:var(--cappuccino); font-style:italic; margin-bottom:1.5rem; max-width:900px; }
  .progress-wrap { position:sticky; top:0; background:var(--ivory); padding:0.8rem 0; border-bottom:2px solid var(--cream); margin-bottom:1rem; z-index:10; }
  .progress-bar { height:8px; background:var(--cream); border-radius:4px; overflow:hidden; margin-bottom:0.4rem; }
  .progress-fill { height:100%; background:var(--bordo); width:0%; transition:width 0.2s ease; }
  .progress-text { font-size:0.9rem; color:var(--cappuccino); }
  .progress-text strong { color:var(--bordo); }
  section.act { margin-bottom:2.5rem; padding-top:1rem; border-top:2px solid var(--cream); }
  section.act h2 { color:var(--bordo); font-size:1.3rem; margin:0 0 1rem; }
  .act-I h2::before { content:"— "; color:var(--bordo); }
  .act-II h2::before { content:"— "; color:var(--amber); }
  .act-III h2::before { content:"— "; color:var(--sage); }
  .slot { margin-bottom:1.8rem; padding:0.8rem; border-radius:4px; transition:background 0.15s; }
  .slot.done { background:var(--cream); }
  .slot.reroll { background:#fbe9e3; }
  .slot-header { display:flex; gap:1rem; align-items:baseline; flex-wrap:wrap; margin-bottom:0.6rem; }
  .slot-code { font-size:1.1rem; color:var(--bordo); font-weight:700; min-width:3.5rem; }
  .slot-name { font-size:1rem; color:var(--chocolate); font-style:italic; flex:1; }
  .slot-dim { font-size:0.8rem; color:var(--cappuccino); }
  .slot-action { background:transparent; border:1px solid var(--cappuccino); color:var(--cappuccino); padding:0.25rem 0.6rem; border-radius:3px; font-size:0.8rem; cursor:pointer; font-family:inherit; }
  .slot-action:hover { border-color:var(--bordo); color:var(--bordo); }
  .slot.reroll .slot-action { background:var(--bordo); color:var(--ivory); border-color:var(--bordo); }
  .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; max-width:1200px; }
  figure { margin:0; text-align:center; cursor:pointer; position:relative; padding:6px; border:2px solid transparent; border-radius:4px; transition:all 0.15s; }
  figure:hover { border-color:var(--cappuccino); }
  figure.selected { border-color:var(--bordo); background:var(--cream); }
  figure.selected::after { content:"✓"; position:absolute; top:8px; right:8px; background:var(--bordo); color:var(--ivory); width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:bold; box-shadow:0 2px 4px rgba(125,68,80,0.3); }
  img { width:100%; height:auto; border:1px solid var(--cream); border-radius:3px; display:block; pointer-events:none; }
  figcaption { font-size:0.8rem; color:var(--cappuccino); margin-top:0.3rem; }
  figure.selected figcaption { color:var(--bordo); font-weight:600; }
  .controls { position:fixed; bottom:0; left:0; right:0; background:var(--ivory); border-top:2px solid var(--bordo); padding:1rem 2rem; display:flex; gap:1rem; align-items:center; flex-wrap:wrap; z-index:20; box-shadow:0 -4px 12px rgba(0,0,0,0.08); }
  .controls-status { flex:1; font-size:0.9rem; color:var(--chocolate); }
  button.primary { background:var(--bordo); color:var(--ivory); border:none; padding:0.7rem 1.4rem; border-radius:4px; cursor:pointer; font-family:inherit; font-size:0.95rem; font-weight:600; }
  button.primary:disabled { opacity:0.4; cursor:not-allowed; }
  button.primary:hover:not(:disabled) { background:var(--chocolate); }
  button.secondary { background:transparent; color:var(--cappuccino); border:1px solid var(--cappuccino); padding:0.7rem 1.2rem; border-radius:4px; cursor:pointer; font-family:inherit; font-size:0.9rem; }
  button.secondary:hover { color:var(--bordo); border-color:var(--bordo); }
  .toast { position:fixed; bottom:5rem; left:50%; transform:translateX(-50%); background:var(--chocolate); color:var(--ivory); padding:0.8rem 1.4rem; border-radius:4px; font-size:0.9rem; opacity:0; transition:opacity 0.3s; pointer-events:none; z-index:30; }
  .toast.show { opacity:1; }
  footer { margin-top:2rem; color:var(--cappuccino); font-size:0.85rem; font-style:italic; text-align:center; }
</style>
</head><body>
  <h1>AGIL-079 Cycle 0 · Зеркальце</h1>
  <p class="note">14 глав × 3 seed-варианта. Клик на картинке = выбран этот seed. Если ни один из трёх не устраивает — кнопка «reroll». Выбор сохраняется в браузере. Когда всё готово — «Скопировать» внизу.</p>

  <div class="progress-wrap">
    <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
    <div class="progress-text">Выбрано: <strong id="progressCount">0</strong> из <strong>14</strong> · reroll: <strong id="rerollCount">0</strong></div>
  </div>
HTML_HEAD

# Emit sections per act
for ACT in I II III; do
  case "$ACT" in
    I) ACT_NAME="Акт I · Истоки" ;;
    II) ACT_NAME="Акт II · Трансформация" ;;
    III) ACT_NAME="Акт III · Горизонты" ;;
  esac
  echo "  <section class=\"act act-${ACT}\"><h2>${ACT_NAME}</h2>" >> "$PICKER"
  for slot in "${SLOTS[@]}"; do
    if [[ "${SLOT_ACT[$slot]}" != "$ACT" ]]; then
      continue
    fi
    name="${SLOT_NAME[$slot]}"
    dim="${SLOT_DIM[$slot]}"
    echo "    <div class=\"slot\" data-slot=\"${slot}\">" >> "$PICKER"
    echo "      <div class=\"slot-header\"><span class=\"slot-code\">${slot}</span><span class=\"slot-name\">${name}</span><span class=\"slot-dim\">${dim}</span><button class=\"slot-action\" data-action=\"reroll\" data-slot=\"${slot}\">reroll</button></div>" >> "$PICKER"
    echo "      <div class=\"grid\">" >> "$PICKER"
    for v in 1 2 3; do
      f="${slot}-v${v}.webp"
      if [[ -f "$OUT_DIR/$f" ]]; then
        echo "        <figure data-slot=\"${slot}\" data-seed=\"${v}\" tabindex=\"0\"><img src=\"${f}\" alt=\"${slot} seed ${v}\" loading=\"lazy\"><figcaption>seed v${v}</figcaption></figure>" >> "$PICKER"
      else
        echo "        <figure class=\"missing\"><figcaption>v${v}: missing</figcaption></figure>" >> "$PICKER"
      fi
    done
    echo "      </div></div>" >> "$PICKER"
  done
  echo "  </section>" >> "$PICKER"
done

cat >> "$PICKER" <<HTML_FOOT
  <div class="controls">
    <div class="controls-status" id="controlsStatus">Выбери seed для каждой главы</div>
    <button class="secondary" id="resetBtn">Сбросить</button>
    <button class="primary" id="copyBtn" disabled>Скопировать выбор</button>
  </div>
  <div class="toast" id="toast"></div>
  <footer>Зеркальце · AGIL-079 Cycle 0 · $(date -u +%Y-%m-%d) · 14 plates × 3 seeds · bottom-crop phantom-clean</footer>

<script>
(function() {
  const STORAGE_KEY = 'agil-079-picks-v1';
  const SLOTS = ['ch0','ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10','int1','int2','int3'];
  const TOTAL = SLOTS.length;

  const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  // state[slot] = {choice: 1|2|3|'reroll'}

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  function render() {
    // Reset all visual states
    document.querySelectorAll('figure[data-slot]').forEach(f => f.classList.remove('selected'));
    document.querySelectorAll('.slot[data-slot]').forEach(s => { s.classList.remove('done'); s.classList.remove('reroll'); });
    document.querySelectorAll('.slot-action').forEach(b => { b.textContent = 'reroll'; });

    let picked = 0, rerolls = 0;
    for (const slot of SLOTS) {
      const entry = state[slot];
      if (!entry) continue;
      const slotEl = document.querySelector('.slot[data-slot="' + slot + '"]');
      if (entry.choice === 'reroll') {
        rerolls++;
        if (slotEl) {
          slotEl.classList.add('reroll');
          const btn = slotEl.querySelector('.slot-action');
          if (btn) btn.textContent = 'cancel reroll';
        }
      } else {
        picked++;
        if (slotEl) slotEl.classList.add('done');
        const fig = document.querySelector('figure[data-slot="' + slot + '"][data-seed="' + entry.choice + '"]');
        if (fig) fig.classList.add('selected');
      }
    }

    document.getElementById('progressCount').textContent = picked;
    document.getElementById('rerollCount').textContent = rerolls;
    const fillPct = Math.round(((picked + rerolls) / TOTAL) * 100);
    document.getElementById('progressFill').style.width = fillPct + '%';

    const complete = (picked + rerolls) === TOTAL;
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.disabled = !complete;
    const status = document.getElementById('controlsStatus');
    if (complete) {
      status.innerHTML = '<strong>Готово:</strong> ' + picked + ' выбрано + ' + rerolls + ' reroll. Нажми «Скопировать».';
    } else {
      const left = TOTAL - picked - rerolls;
      status.textContent = 'Осталось: ' + left + ' слотов';
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function buildOutput() {
    const lines = [];
    lines.push('AGIL-079 Cycle 0 picks:');
    const picks = [], rerolls = [];
    for (const slot of SLOTS) {
      const entry = state[slot];
      if (!entry) continue;
      if (entry.choice === 'reroll') rerolls.push(slot);
      else picks.push(slot + '=v' + entry.choice);
    }
    if (picks.length) lines.push('selected: ' + picks.join(' '));
    if (rerolls.length) lines.push('reroll: ' + rerolls.join(' '));
    return lines.join('\n');
  }

  document.addEventListener('click', function(e) {
    const fig = e.target.closest('figure[data-slot]');
    if (fig) {
      const slot = fig.dataset.slot;
      const seed = parseInt(fig.dataset.seed, 10);
      if (state[slot] && state[slot].choice === seed) {
        delete state[slot]; // toggle off
      } else {
        state[slot] = { choice: seed };
      }
      save(); render();
      return;
    }
    const rerollBtn = e.target.closest('.slot-action[data-action="reroll"]');
    if (rerollBtn) {
      const slot = rerollBtn.dataset.slot;
      if (state[slot] && state[slot].choice === 'reroll') {
        delete state[slot];
      } else {
        state[slot] = { choice: 'reroll' };
      }
      save(); render();
      return;
    }
    if (e.target.id === 'resetBtn') {
      if (confirm('Сбросить весь выбор?')) {
        for (const k of Object.keys(state)) delete state[k];
        save(); render();
      }
      return;
    }
    if (e.target.id === 'copyBtn' && !e.target.disabled) {
      const text = buildOutput();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => showToast('Скопировано в буфер — отправь Алисе'),
          () => { prompt('Скопируй вручную:', text); }
        );
      } else {
        prompt('Скопируй вручную:', text);
      }
      return;
    }
  });

  document.addEventListener('keydown', function(e) {
    const fig = document.activeElement.closest && document.activeElement.closest('figure[data-slot]');
    if (!fig) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fig.click(); }
  });

  render();
})();
</script>
</body></html>
HTML_FOOT

echo ""
echo "=== Post-processing complete ==="
echo "Cleaned plates: $OUT_DIR"
echo "Picker: $PICKER"
ls "$OUT_DIR" | wc -l
