// script.js — Interactive Story Engine
(function () {
  'use strict';
  /* ═══ SOUND EFFECTS ═══ */
  function playSound(freq, type, duration) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.3));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (duration || 0.3));
    } catch (e) {
      // Audio not supported — ignore silently
    }
  }
  function sfxClick()   { playSound(600, 'sine', 0.1); }
  function sfxGold()    { playSound(880, 'sine', 0.6); playSound(1320, 'sine', 0.6); }
  function sfxHit()     { playSound(120, 'square', 0.15); }
  function sfxWin()     { playSound(523, 'sine', 0.2); setTimeout(() => playSound(659, 'sine', 0.2), 150); setTimeout(() => playSound(784, 'sine', 0.4), 300); }
  function sfxLose()    { playSound(200, 'sawtooth', 0.5); }
  function sfxGlitch()  { playSound(80, 'sawtooth', 0.3); playSound(2000, 'square', 0.1); }
  function sfxLove()    { playSound(700, 'triangle', 0.15); }
  function sfxDanger()  { playSound(150, 'square', 0.4); }
  /* ═══ ITEM DATA (mirrored from app.js for roulette) ═══ */
  const S = 'https://community.akamai.steamstatic.com/economy/image/';
  const ITEMS = [
    { n:'MP7 | Skulls',       r:'milspec',    img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY' },
    { n:'AUG | Wings',        r:'milspec',    img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc' },
    { n:'SG 553 | Ultraviolet',r:'milspec',   img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA' },
    { n:'Glock-18 | Dragon Tattoo',r:'restricted',img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg' },
    { n:'USP-S | Dark Water',  r:'restricted', img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj' },
    { n:'AK-47 | Case Hardened',r:'classified',img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q' },
    { n:'Desert Eagle | Hypnotic',r:'classified',img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J' },
    { n:'AWP | Lightning Strike',r:'covert',   img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN' },
    { n:'★ Karambit',          r:'gold',       img:S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2labZsLfKaGinEx-0u5LhqGHrjlElz52jRmN2sd3yfb1NzWZVwRbNeu0S5k9WxMuvh-UWA3ObnwJvj' },
  ];
  const RW = { milspec:79.92, restricted:15.98, classified:3.20, covert:0.64, gold:0.26 };
  function pickRandom() {
    const t = ITEMS.reduce((s, i) => s + RW[i.r], 0);
    let r = Math.random() * t;
    for (const item of ITEMS) { r -= RW[item.r]; if (r <= 0) return item; }
    return ITEMS[0];
  }
  function pickNonGold() { let i; do { i = pickRandom(); } while (i.r === 'gold'); return i; }
  /* ═══ STATE ═══ */
  let day = 0;
  let playerHP, maxHP, enemyHP, maxEnemyHP;
  let fightTimer = null;
  let loveInterval = null;
  let loveCount = 0;
  let loveSeconds = 60;
  /* ═══ DOM ═══ */
  const $ = id => document.getElementById(id);
  const container = $('storyContainer');
  /* ═══ HELPERS ═══ */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function flash(color) {
    const f = el('div', 'screen-flash ' + color);
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 700);
  }
  function clear() { container.innerHTML = ''; }
  // Video performance text for each day
  const VIDEO_PERF = [
    '', 'does ok', 'does ok', 'does ok', 'does ok', 'does ok',
    'BLOWS UP! 🔥', 'does a little worse', 'does great!', 'does great!', 'goes VIRAL'
  ];
  /* ═══ STATIC ELEMENT REFERENCES (document.getElementById) ═══ */
  const paragraph1 = document.getElementById('paragraph1');
  const paragraph2 = document.getElementById('paragraph2');
  const paragraph3 = document.getElementById('paragraph3');
  const storyImage = document.getElementById('story-image');
  const imageTooltip = document.getElementById('image-tooltip');
  /* ═══ IMAGE SWAP FUNCTION ═══ */
  function changeImage(filename) {
    if (storyImage) storyImage.src = filename;
  }
  function setImageTooltip(text) {
    if (imageTooltip) imageTooltip.textContent = text;
  }
  /* ═══ TEXT DISPLAY FUNCTION (populates paragraphs with id) ═══ */
  function displaySceneText(texts) {
    const paras = [paragraph1, paragraph2, paragraph3];
    for (let i = 0; i < paras.length; i++) {
      if (paras[i]) paras[i].textContent = (texts && texts[i]) ? texts[i] : '';
    }
  }
  /* ═══ SOUND — new Audio() pattern ═══ */
  function playSoundFile(file) {
    try { const a = new Audio(file); a.volume = 0.3; a.play(); } catch (e) { /* ignore */ }
  }
  /* ═══ IMAGE HOVER — mouseover / mouseout + tooltip ═══ */
  if (storyImage && imageTooltip) {
    storyImage.addEventListener('mouseover', function () {
      imageTooltip.style.display = 'block';
    });
    storyImage.addEventListener('mouseout', function () {
      imageTooltip.style.display = 'none';
    });
  }
  /* ═══ KEYBOARD INPUT — keydown on document ═══ */
  let tooltipVisible = false;
  document.addEventListener('keydown', function (event) {
    // Space or Enter → click first visible continue button
    if (event.key === ' ' || event.key === 'Enter') {
      const btn = container.querySelector('.story-continue');
      if (btn && !btn.disabled) {
        event.preventDefault();
        btn.click();
        sfxClick();
      }
    }
    // Arrow Right / Down → cycle forward through choice buttons
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      const choices = container.querySelectorAll('.story-btn');
      if (choices.length > 0) {
        event.preventDefault();
        const focused = container.querySelector('.story-btn:focus');
        if (focused) {
          const idx = Array.from(choices).indexOf(focused);
          choices[(idx + 1) % choices.length].focus();
        } else {
          choices[0].focus();
        }
      }
    }
    // Arrow Left / Up → cycle backward through choice buttons
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      const choices = container.querySelectorAll('.story-btn');
      if (choices.length > 0) {
        event.preventDefault();
        const focused = container.querySelector('.story-btn:focus');
        if (focused) {
          const idx = Array.from(choices).indexOf(focused);
          choices[(idx - 1 + choices.length) % choices.length].focus();
        } else {
          choices[choices.length - 1].focus();
        }
      }
    }
    // E key → toggle image tooltip / interact
    if (event.key === 'e' || event.key === 'E') {
      if (storyImage && imageTooltip) {
        tooltipVisible = !tooltipVisible;
        imageTooltip.style.display = tooltipVisible ? 'block' : 'none';
      }
    }
  });
  /* ═══════════════════════════════════════════════
     SCENES
     ═══════════════════════════════════════════════ */
  /* ── SCENE: Wake Up ── */
  function sceneWake() {
    clear();
    changeImage('0520f69a-d549-4dbe-96cf-58051e7b9f50.jpg');
    setImageTooltip('You — just waking up. A new day begins...');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <p class="narrator">Your alarm buzzes. You roll over and open your eyes. UHHHHHHHHHHHHHHH IM SO TIRED</p>
      <p class="dramatic">. . .</p>
      <p class="narrator">Another day wasted. You reach for your phone on the nightstand.</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '📱 Pick up phone');
    btn.addEventListener('click', scenePhone);
    container.appendChild(btn);
  }
  /* ── SCENE: Phone ── */
  function scenePhone() {
    clear();
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <p class="narrator">You unlock your phone and start scrolling. like always</p>
      <p class="narrator">Memes… ads… drama…</p>
      <p class="narrator">Then a video catches your gambaling addicted mind.</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '▶ Watch video');
    btn.addEventListener('click', sceneVideo);
    container.appendChild(btn);
  }
  /* ── SCENE: See the Video ── */
  function sceneVideo() {
    clear();
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <div class="comment-box video-embed-box">
        <div class="comment-user text-muted-light">CaseGrinder6348</div>
        <div class="video-embed-title">
          "opening 1 case a day untill i get a gold"
        </div>
        <div class="video-embed-day">day 6,348</div>
        <div class="video-embed-views">34B views</div>
      </div>
      <p class="narrator video-think">You think: <em class="text-violet">HA I could get a gold easily!</em></p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '🎯 Start the challenge');
    btn.addEventListener('click', () => startCaseDay(1));
    container.appendChild(btn);
  }
  /* ═══ CASE OPENING LOOP ═══ */
  function startCaseDay(d) {
    day = d;
    clear();
    // Day counter
    changeImage('gold.jpg');
    setImageTooltip('Day ' + d + ' — will you get the gold?');
    // displaySceneText removed to prevent duplicate text
    const dc = el('div', 'day-counter' + (d === 10 ? ' gold-day' : ''));
    dc.innerHTML = `<div class="day-label">DAY</div><div class="day-num">${d}</div>`;
    container.appendChild(dc);
    // Roulette
    const rc = el('div', 'roulette-container', `
      <div class="roulette-marker"></div>
      <div class="roulette-strip" id="miniStrip"></div>
    `);
    container.appendChild(rc);
    const btn = el('button', 'story-continue', '🔑 OPEN CASE');
    btn.classList.add('anim-delay-half');
    btn.addEventListener('click', () => {
      btn.disabled = true;

      spinCase(d === 10);
    });
    container.appendChild(btn);
    const skip = el('button', 'story-continue story-skip', '⏩ SKIP CASES');
    skip.addEventListener('click', () => { day = 10; sceneDay10Viral(); });
    container.appendChild(skip);
  }
  function spinCase(forceGold) {
    const strip = $('miniStrip');
    if (!strip) return;
    try {
    strip.innerHTML = '';
    strip.style.transform = 'translateX(0)';
    strip.style.transition = 'none';
    const ITEM_W = 140;
    const TOTAL = 70;
    const WIN_I = 55;
    const winItem = forceGold ? ITEMS.find(i => i.r === 'gold') : pickNonGold();
    for (let i = 0; i < TOTAL; i++) {
      const item = (i === WIN_I) ? winItem : pickNonGold();
      const d = el('div', 'roulette-item rarity-' + item.r);
      if (item.r === 'gold') {
        d.innerHTML = `<img class="item-icon" src="gold.jpg" alt="★"><div class="item-name text-gold">★ Rare Special ★</div>`;
        d.dataset.goldImg = item.img;
        d.dataset.goldName = item.n;
      } else {
        d.innerHTML = `<img class="item-icon" src="${item.img}" alt="${item.n}"><div class="item-name">${item.n}</div>`;
      }
      strip.appendChild(d);
    }
    const cw = strip.parentElement.offsetWidth;
    const center = cw / 2 - ITEM_W / 2;
    const nudge = (Math.random() - 0.5) * (ITEM_W * 0.6);
    const target = -(WIN_I * ITEM_W) + center + nudge;
    const dur = forceGold ? 6000 : (2000 + Math.random() * 1500);
    setTimeout(() => {
      strip.style.transition = `transform ${dur}ms cubic-bezier(0.25,0.1,0.25,1)`;
      strip.style.transform = `translateX(${target}px)`;
    }, 50);
    setTimeout(() => {
      // Reveal gold art if applicable
      if (winItem.r === 'gold') {
        const we = strip.children[WIN_I];
        if (we && we.dataset.goldImg) {
          we.innerHTML = `<img class="item-icon" src="${we.dataset.goldImg}" alt="${we.dataset.goldName}"><div class="item-name">${we.dataset.goldName}</div>`;
        }
        flash('gold');
        sfxGold();
      } else {
        sfxClick();
      }
      showCaseResult(winItem);
    }, dur + 300);
    } catch (e) {
      console.error('Case spin error:', e);
    }
  }
  function showCaseResult(item) {
    // Remove the open button
    const btns = container.querySelectorAll('.story-continue');
    btns.forEach(b => b.remove());
    const isGold = item.r === 'gold';
    const result = el('div', 'day-result ' + (isGold ? 'gold' : 'nothing'));
    result.innerHTML = isGold
      ? `<div>★ <strong>${item.n}</strong> ★</div><div class="result-sub">YOU GOT GOLD!</div>`
      : `<div>Nothing special.</div><div class="result-sub text-muted">${item.n}</div>`;
    container.appendChild(result);
    if (isGold) {
      // Day 10 — gold path
      const btn = el('button', 'story-continue', '📹 Post the video');
      btn.classList.add('anim-delay-1');
      btn.addEventListener('click', sceneDay10Viral);
      container.appendChild(btn);
    } else {
      // Post video
      const perf = VIDEO_PERF[day] || 'does ok';
      const stats = el('div', 'video-stats');
      const isViral = perf.includes('BLOWS') || perf.includes('great');
      stats.innerHTML = `<span>📹 Post video — it <span class="${isViral ? 'viral' : ''}">${perf}</span></span>`;
      container.appendChild(stats);
      if (day < 10) {
        const btn = el('button', 'story-continue', '➡ Next day');
        btn.classList.add('anim-delay-1half');
        btn.addEventListener('click', () => startCaseDay(day + 1));
        container.appendChild(btn);
      }
    }
  }
  /* ═══ AFTER GOLD ═══ */
  function sceneDay10Viral() {
    clear();
    flash('gold');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You post the video.</p>
      <p class="dramatic dramatic-large">VIRAL</p>
      <p class="narrator">Views pour in. Billions. The views dont slow down!.</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '💬 Read comments');
    btn.addEventListener('click', sceneGrinderComment);
    container.appendChild(btn);
  }
  function sceneGrinderComment() {
    clear();
    const box = el('div', 'story-text char-casegrinder');
    box.innerHTML = `
      <p class="narrator">Top comment:</p>
      <div class="comment-box">
        <div class="comment-user">CaseGrinder6348</div>
        <div class="comment-text">6,358 days. You took everything from me in 10.<br>Enjoy it while you can. Im getting that knife...</div>
      </div>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '😨 Keep reading...');
    btn.addEventListener('click', sceneScreenGlitch);
    container.appendChild(btn);
  }
  function sceneScreenGlitch() {
    clear();
    flash('violet');
    sfxGlitch();
    playSoundFile('click.wav');
    changeImage('0520f69a-d549-4dbe-96cf-58051e7b9f50.jpg');
    setImageTooltip('Something is crawling out of your monitor...');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text dramatic-moment char-protagonist');
    box.innerHTML = `
      <p class="narrator">That night your screen <span class="glitch-text">glitches</span>.</p>
      <p class="narrator">Static crawls across the monitor. Then something <em>moves</em> inside it.</p>
      <p class="dramatic">. . .</p>
      <p class="narrator">A <em class="text-violet">Karambit Case Hardened 387 Factory New</em> with glowing violet eyes crawls out of your monitor.</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue romantic', '👁 Who are you?');
    btn.addEventListener('click', sceneMarenIntro);
    container.appendChild(btn);
  }
  function sceneMarenIntro() {
    clear();
    flash('violet');
    changeImage('0520f69a-d549-4dbe-96cf-58051e7b9f50.jpg');
    setImageTooltip('Karambit Case Hardened 387 Factory New — with glowing violet eyes');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text maren-appear');
    box.innerHTML = `
      <p class="maren">"The gold summoned me here. It opens doors between worlds."</p>
      <p class="narrator">Their name is <strong class="text-violet">Karambit Case Hardened 387 Factory New</strong>.</p>
      <p class="maren">"That man… he's been opening cases so long he wants a gold. He can feel me so close. He wants what you have."</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue', '💬 Reply to his comment');
    btn.addEventListener('click', sceneReplyChoice);
    container.appendChild(btn);
  }
  /* ═══ CHOICE 1: Reply ═══ */
  function sceneReplyChoice() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You stare at his comment. Your cursor hovers over the reply box.</p>
      <p class="narrator">What do you type?</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const opts = [
      { text: '"haha loser"', fn: replyHaha, cls: 'danger' },
      { text: '"i did this for u"', fn: replyForYou, cls: '' },
      { text: '"you can have it!"', fn: replyGiveIt, cls: 'danger' },
      { text: '"im keeping it its mine"', fn: replyKeeping, cls: 'romantic' },
    ];
    opts.forEach(o => {
      const b = el('button', 'story-btn ' + o.cls, o.text);
      b.addEventListener('click', o.fn);
      choices.appendChild(b);
    });
    container.appendChild(choices);
  }
  // ── "haha loser" ──
  function replyHaha() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You reply: <em>"haha loser"</em></p>
      <div class="comment-box">
        <div class="comment-user">CaseGrinder6348</div>
        <div class="comment-text">Watch yourself.</div>
      </div>
      <p class="maren">"That man is dangerous. I can feel it."</p>
    `;
    container.appendChild(box);
    addContinue(sceneGrowCloser);
  }
  // ── "i did this for u" ──
  function replyForYou() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You reply: <em>"i did this for u"</em></p>
      <div class="comment-box">
        <div class="comment-user">CaseGrinder6348</div>
        <div class="comment-text">Then give me the knife. I deserve it. 6,358 days.</div>
      </div>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const give = el('button', 'story-btn danger', '🔪 Give him the knife');
    give.addEventListener('click', sceneTradeEnding);
    const keep = el('button', 'story-btn romantic', '❌ Don\'t give him the knife');
    keep.addEventListener('click', replyDontGive);
    choices.appendChild(give);
    choices.appendChild(keep);
    container.appendChild(choices);
  }
  function replyDontGive() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You don't give him the knife.</p>
      <div class="comment-box">
        <div class="comment-user">CaseGrinder6348</div>
        <div class="comment-text">Watch yourself.</div>
      </div>
      <p class="maren">"Thank you for keeping me. dont sell me for 1.5 million dollars!"</p>
    `;
    container.appendChild(box);
    addContinue(sceneGrowCloser);
  }
  // ── "you can have it!" ──
  function replyGiveIt() {
    sceneTradeEnding();
  }
  // ── "im keeping it its mine" ──
  function replyKeeping() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You reply: <em>"im keeping it its mine"</em></p>
      <div class="comment-box">
        <div class="comment-user">CaseGrinder6348</div>
        <div class="comment-text">Watch yourself.</div>
      </div>
      <p class="maren">"I'm not a thing to be kept… but I want to stay.please dont sell me for 1.5 million dollars!"</p>
    `;
    container.appendChild(box);
    addContinue(sceneGrowCloser);
  }
  /* ═══ TRADE ENDING ═══ */
  function sceneTradeEnding() {
    clear();
    flash('red');
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You trade him the knife.</p>
      <p class="narrator">The moment it leaves your inventory, Karambit Case Hardened 387 Factory New starts to fade.</p>
      <p class="maren">"You gave me away for free? Im 1.5m Dollars!!!!"</p>
      <p class="narrator">Their Blue Glow meets yours one last time as they vanish.</p>
      <p class="dramatic">. . .</p>
      <p class="narrator">You stop posting videos. Stop everything. Just go back to daily life.</p>
      <p class="narrator">Your apartment feels colder than it ever has.</p>
    `;
    container.appendChild(box);
    addContinue(endingTrade);
  }
  function endingTrade() {
    clear();
    const box = el('div', 'ending-screen ending-tragic');
    box.innerHTML = `
      <div class="ending-type bad">ENDING</div>
      <div class="ending-title ending-title-muted">The Cold Apartment</div>
      <div class="ending-text">
        Days pass. The sun rises and sets. You lie in bed watching the light
        move across the ceiling. At the last second before sleep — you swear
        you see a pair of glowing Blue edges flash in the window.<br>
        Watching over you. Even now.
      </div>
      <div class="the-end tragic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  /* ═══ WATCH YOURSELF PATH ═══ */
  function sceneGrowCloser() {
    clear();
    const box = el('div', 'story-text char-maren');
    box.innerHTML = `
      <p class="narrator">Weeks pass. Then months.</p>
      <p class="narrator">You and Karambit Case Hardened 387 Factory New grow closer — they teach you about the shadow world
        that exists behind screens. You teach them about being human.</p>
      <p class="highlight text-center">Your channel hits 100,000,000 subscribers.</p>
      <p class="narrator text-red">But CaseGrinder6348 has stopped posting. Something does not feel right…</p>
      <p class="maren">"He's not gone. He's preparing something. He wants the me."</p>
    `;
    container.appendChild(box);
    addContinue(sceneDM);
  }
  function sceneDM() {
    clear();
    flash('red');
    changeImage('unnamed.jpg');
    setImageTooltip('CaseGrinder6348 — he found your address');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'story-text char-casegrinder');
    box.innerHTML = `
      <p class="narrator">You're on the computer when a DM notification pops up.</p>
      <p class="narrator">It's from his account — just a photo of <strong class="text-red">YOUR front door</strong>. No text.</p>
      <p class="maren">"He's here."</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const block = el('button', 'story-btn', '🚫 Block him');
    block.addEventListener('click', sceneBlock);
    const police = el('button', 'story-btn danger', '🚔 Call the police');
    police.addEventListener('click', scenePolice);
    choices.appendChild(block);
    choices.appendChild(police);
    container.appendChild(choices);
  }
  /* ── Block path ── */
  function sceneBlock() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You block him.</p>
      <p class="narrator">Karambit Case Hardened 387 Factory New curls up beside you that night — you fall asleep feeling safe.</p>
      <p class="dramatic">. . .</p>
    `;
    container.appendChild(box);
    addContinue(sceneMiddleOfNight);
  }
  /* ── Police path ── */
  function scenePolice() {
    clear();
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You call the police. They say they can't do anything about an online threat.</p>
      <p class="maren">"AHHHHHHHHHHHHHHHs"</p>
      <p class="dramatic">. . .</p>
    `;
    container.appendChild(box);
    addContinue(sceneMiddleOfNight);
  }
  /* ── Middle of night ── */
  function sceneMiddleOfNight() {
    clear();
    flash('red');
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <p class="narrator">You wake up in the middle of the night to a noise in your kitchen.</p>
      <p class="narrator text-red">Karambit Case Hardened 387 Factory New is gone from the bed.</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const hide = el('button', 'story-btn', '🛏 Hide');
    hide.addEventListener('click', sceneHide);
    const check = el('button', 'story-btn danger', '👀 Check it out');
    check.addEventListener('click', sceneCheckItOut);
    choices.appendChild(hide);
    choices.appendChild(check);
    container.appendChild(choices);
  }
  /* ═══ HIDE PATH ═══ */
  function sceneHide() {
    clear();
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <p class="narrator">You scramble under the bed.</p>
      <p class="narrator">You see two legs walk to your computer — he <strong class="text-red">smashes it!</strong></p>
      <p class="narrator">You hear Karambit Case Hardened 387 Factory New hiss from the shadows.</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const fight = el('button', 'story-btn danger', '⚔ Exit hiding spot and fight');
    fight.addEventListener('click', () => startFight(100, 15));
    const stay = el('button', 'story-btn romantic', '🤫 Stay hidden');
    stay.addEventListener('click', sceneStayHidden);
    choices.appendChild(fight);
    choices.appendChild(stay);
    container.appendChild(choices);
  }
  /* ── Stay Hidden → Love Puzzle ── */
  function sceneStayHidden() {
    clear();
    flash('violet');
    const box = el('div', 'story-text maren-appear char-maren');
    box.innerHTML = `
      <p class="maren">"Type what you feel for me. Say it and I'll have the power to protect us."</p>
    `;
    container.appendChild(box);
    const btn = el('button', 'story-continue romantic', '💜 I know the word...');
    btn.addEventListener('click', startLovePuzzle);
    container.appendChild(btn);
  }
  /* ═══ CHECK IT OUT PATH ═══ */
  function sceneCheckItOut() {
    clear();
    const box = el('div', 'story-text char-maren');
    box.innerHTML = `
      <p class="narrator">You sneak to the staircase.</p>
      <p class="narrator">Karambit Case Hardened 387 Factory New appears beside you in shadow form, pressing a clawed hand to your chest. You feel stronger.</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const go = el('button', 'story-btn danger', '➡ Keep going');
    go.addEventListener('click', sceneKeepGoing);
    const back = el('button', 'story-btn', '🔙 Go back and hide');
    back.addEventListener('click', sceneGoBack);
    choices.appendChild(go);
    choices.appendChild(back);
    container.appendChild(choices);
  }
  function sceneKeepGoing() {
    clear();
    flash('red');
    const box = el('div', 'story-text char-casegrinder');
    box.innerHTML = `
      <p class="narrator">You make your way to the kitchen and peek in —</p>
      <p class="narrator"><strong class="text-red">He spots you.</strong></p>
      <p class="narrator">He's holding a <em class="text-violet">binding crystal</em> — something he got from 6,000 days of failed case openings. It traps creatures like Karambit Case Hardened 387 Factory New.</p>
    `;
    container.appendChild(box);
    const choices = el('div', 'story-choices');
    const run = el('button', 'story-btn', '🏃 Run!');
    run.addEventListener('click', sceneRun);
    const fight = el('button', 'story-btn danger', '⚔ Fight!');
    fight.addEventListener('click', () => startFight(100, 15));
    choices.appendChild(run);
    choices.appendChild(fight);
    container.appendChild(choices);
  }
  function sceneRun() {
    clear();
    flash('red');
    const box = el('div', 'story-text');
    box.innerHTML = `
      <p class="narrator">You start running — and <strong class="text-red">trip!</strong></p>
      <p class="narrator">He throws the crystal at Karambit Case Hardened 387 Factory New.</p>
      <p class="narrator">Next thing you know, Karambit Case Hardened 387 Factory New is trapped and he's gone.</p>
      <p class="dramatic">. . .</p>
    `;
    container.appendChild(box);
    addContinue(endingTrapped);
  }
  function sceneGoBack() {
    clear();
    flash('red');
    const box = el('div', 'story-text char-protagonist');
    box.innerHTML = `
      <p class="narrator">You make your way back but — you <strong class="text-red">stub your toe!</strong></p>
      <p class="narrator">A loud noise. You hear him getting closer.</p>
      <p class="maren">"I won't let him take me from you."</p>
      <p class="narrator">Karambit Case Hardened 387 Factory New appears and stands between you.</p>
    `;
    container.appendChild(box);
    // Fight with -15 HP from toe
    const btn = el('button', 'story-continue danger', '⚔ Fight! (injured)');
    btn.addEventListener('click', () => startFight(85, 15));
    container.appendChild(btn);
  }
  /* ═══ FIGHT SYSTEM ═══ */
  function startFight(baseHP, marenBoost) {
    clear();
    try {
    sfxDanger();
    changeImage('svg/casegrinder.svg');
    setImageTooltip('CaseGrinder6348 — FIGHT!');
    // displaySceneText removed to prevent duplicate text
    playerHP = baseHP + marenBoost;
    maxHP = playerHP;
    enemyHP = 80;
    maxEnemyHP = 80;
    const arena = el('div', 'fight-arena');
    arena.innerHTML = `
      <div class="maren-boost">Karambit Case Hardened 387 Factory New fights alongside you! (+${marenBoost} HP)</div>
      ${baseHP < 100 ? '<div class="maren-boost maren-boost-injured">Injured from stubbed toe (-15 HP)</div>' : ''}
      <div class="fight-hud">
        <div class="fighter player">
          <div class="fighter-name">YOU + MAREN</div>
          <div class="hp-bar-container">
            <div class="hp-bar player-hp" id="playerBar"></div>
            <div class="hp-text" id="playerHPText">${playerHP} HP</div>
          </div>
        </div>
        <div class="fighter enemy">
          <div class="fighter-name">CASEGRINDER</div>
          <div class="hp-bar-container">
            <div class="hp-bar enemy-hp" id="enemyBar"></div>
            <div class="hp-text" id="enemyHPText">${enemyHP} HP</div>
          </div>
        </div>
      </div>
      <div class="fight-log" id="fLog"></div>
      <div class="fight-actions">
        <button class="btn-attack" id="atkBtn">⚔ ATTACK</button>
      </div>
    `;
    container.appendChild(arena);
    const atkBtn = $('atkBtn');
    const fLog = $('fLog');
    const pBar = $('playerBar');
    const eBar = $('enemyBar');
    const pText = $('playerHPText');
    const eText = $('enemyHPText');
    function log(msg, cls) {
      const p = el('div', 'log-' + cls, msg);
      fLog.appendChild(p);
      fLog.scrollTop = fLog.scrollHeight;
    }
    function updateBars() {
      pBar.style.width = Math.max(0, (playerHP / maxHP) * 100) + '%';
      eBar.style.width = Math.max(0, (enemyHP / maxEnemyHP) * 100) + '%';
      pText.textContent = Math.max(0, playerHP) + ' HP';
      eText.textContent = Math.max(0, enemyHP) + ' HP';
    }
    function checkEnd() {
      if (enemyHP <= 0) {
        clearInterval(fightTimer);
        atkBtn.disabled = true;
        log('CaseGrinder collapses!', 'player');
        log('Karambit Case Hardened 387 Factory New wraps around you protectively.', 'maren');
        sfxWin();
        setTimeout(() => endFight(true), 1500);
        return true;
      }
      if (playerHP <= 0) {
        clearInterval(fightTimer);
        atkBtn.disabled = true;
        sfxLose();
        log('You fall...', 'enemy');
        log('He pulls out the binding crystal.', 'enemy');
        setTimeout(() => endFight(false), 1500);
        return true;
      }
      return false;
    }
    // Player attack
    atkBtn.addEventListener('click', () => {
      if (playerHP <= 0 || enemyHP <= 0) return;
      const dmg = 5 + Math.floor(Math.random() * 8); // 5-12 (no weapon)
      enemyHP -= dmg;
      sfxHit();
      log(`You strike for ${dmg} damage!`, 'player');
      updateBars();
      flash('violet');
      if (!checkEnd()) {
        atkBtn.disabled = true;
        setTimeout(() => { atkBtn.disabled = false; }, 800);
      }
    });
    // Enemy attacks on timer
    fightTimer = setInterval(() => {
      if (playerHP <= 0 || enemyHP <= 0) return;
      const dmg = 6 + Math.floor(Math.random() * 7); // 6-12
      playerHP -= dmg;
      sfxHit();
      log(`CaseGrinder hits you for ${dmg}!`, 'enemy');
      updateBars();
      flash('red');
      checkEnd();
    }, 2000);
    } catch (e) {
      console.error('Fight system error:', e);
    }
  }
  function endFight(won) {
    clearInterval(fightTimer);
    clear();
    if (won) {
      endingFightWin();
    } else {
      endingFightLose();
    }
  }
  function endingFightWin() {
    flash('violet');
    changeImage('0520f69a-d549-4dbe-96cf-58051e7b9f50.jpg');
    setImageTooltip('Together in the Shadows — you fought for each other');
    // displaySceneText removed to prevent duplicate text
    const box = el('div', 'ending-screen ending-romantic');
    box.innerHTML = `
      <div class="ending-type good">ENDING</div>
      <div class="ending-title ending-title-romantic">Together in the Shadows</div>
      <div class="ending-text">
        You shatter his binding crystal. He flees into the night.<br><br>
        Karambit Case Hardened 387 Factory New wraps around your finger. <em class="text-violet">"You fought for me."</em><br><br>
        You and Karambit Case Hardened 387 Factory New live together. You stop posting and just enjoy being with each other.
        No one knows what you've been through.
      </div>
      <div class="the-end romantic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  function endingFightLose() {
    flash('red');
    const box = el('div', 'ending-screen ending-tragic');
    box.innerHTML = `
      <div class="ending-type bad">ENDING</div>
      <div class="ending-title ending-title-red">6,358 Days</div>
      <div class="ending-text">
        He traps Karambit Case Hardened 387 Factory New in the binding crystal and vanishes.<br><br>
        You open cases every single day.
        Every day, hoping for another gold. They never come.<br><br>
        On day 6,358… you finally understand what he felt.
      </div>
      <div class="the-end tragic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  function endingTrapped() {
    clear();
    flash('red');
    const box = el('div', 'ending-screen ending-tragic');
    box.innerHTML = `
      <div class="ending-type bad">ENDING</div>
      <div class="ending-title ending-title-red">Trapped</div>
      <div class="ending-text">
        Karambit Case Hardened 387 Factory New is trapped. He's gone.<br><br>
        You open cases every single day trying to get another gold.
        But they never come back.<br><br>
        On day 6,358, you finally understand.
      </div>
      <div class="the-end tragic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  /* ═══ LOVE PUZZLE ═══ */
  function startLovePuzzle() {
    clear();
    loveCount = 0;
    loveSeconds = 60;
    changeImage('0520f69a-d549-4dbe-96cf-58051e7b9f50.jpg');
    setImageTooltip('Type LOVE to give Karambit Case Hardened 387 Factory New the power to protect you');
    // displaySceneText removed to prevent duplicate text
    try {
    const puzzle = el('div', 'puzzle-container');
    puzzle.innerHTML = `
      <div class="puzzle-prompt">"Say it and I'll have the power to protect us."</div>
      <div class="puzzle-timer normal" id="pTimer">60</div>
      <div class="puzzle-counter"><span class="count" id="pCount">0</span> / 10</div>
      <input type="text" class="puzzle-input" id="pInput" maxlength="4" autocomplete="off" placeholder="____">
      <div class="puzzle-hint">Hint: what I feel for Karambit Case Hardened 387 Factory New (4 letters)</div>
    `;
    container.appendChild(puzzle);
    const input = $('pInput');
    const timer = $('pTimer');
    const counter = $('pCount');
    input.focus();
    input.addEventListener('input', () => {
      const val = input.value.toUpperCase().trim();
      if (val.length === 4) {
        if (val === 'LOVE') {
          loveCount++;
          counter.textContent = loveCount;
          input.value = '';
          input.className = 'puzzle-input correct';
          sfxLove();
          flash('violet');
          setTimeout(() => { input.className = 'puzzle-input'; }, 300);
          if (loveCount >= 10) {
            clearInterval(loveInterval);
            sfxWin();
            setTimeout(endingLoveWin, 500);
          }
        } else {
          input.className = 'puzzle-input wrong';
          setTimeout(() => { input.className = 'puzzle-input'; input.value = ''; }, 400);
        }
      }
    });
    loveInterval = setInterval(() => {
      loveSeconds--;
      timer.textContent = loveSeconds;
      if (loveSeconds <= 10) timer.className = 'puzzle-timer urgent';
      if (loveSeconds <= 0) {
        clearInterval(loveInterval);
        sfxLose();
        endingLoveFail();
      }
    }, 1000);
    } catch (e) {
      console.error('Love puzzle error:', e);
    }
  }
  function endingLoveWin() {
    clear();
    flash('violet');
    const box = el('div', 'ending-screen ending-best');
    box.innerHTML = `
      <div class="ending-type best">★ BEST ENDING ★</div>
      <div class="ending-title ending-title-romantic">Love is the Strongest Magic</div>
      <div class="ending-text">
        Karambit Case Hardened 387 Factory New glows <em class="text-violet">brilliant violet</em> — brighter than you've ever seen.<br><br>
        The man <span class="text-red">screams</span> and flees into the night.<br><br>
        <em class="text-violet">"Love is the only magic stronger than a binding crystal."</em><br><br>
        You stay together forever. Safe in each other.
        The door between worlds stays open — just for you two.
      </div>
      <div class="the-end romantic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  function endingLoveFail() {
    clear();
    flash('red');
    const box = el('div', 'ending-screen ending-tragic');
    box.innerHTML = `
      <div class="ending-type bad">ENDING</div>
      <div class="ending-title ending-title-muted">Too Late</div>
      <div class="ending-text">
        Karambit Case Hardened 387 Factory New's power fades. He finds you both.<br><br>
        He traps Karambit Case Hardened 387 Factory New and leaves. You open cases every single day.<br><br>
        On day 6,358, a pair of violet eyes flickers on your screen
        for just a moment — then nothing.
      </div>
      <div class="the-end tragic">— THE END —</div>
      <a href="story.html" class="btn-restart">↻ Play Again</a>
      <a href="https://henry6197.github.io/caseopening/" class="btn-restart">Open Cases →</a>
    `;
    container.appendChild(box);
  }
  /* ═══ UTILITY ═══ */
  function addContinue(fn) {
    const btn = el('button', 'story-continue', '→ Continue');
    btn.addEventListener('click', fn);
    container.appendChild(btn);
  }
  /* ═══ INIT ═══ */
  try {
    sceneWake();
  } catch (e) {
    console.error('Failed to initialize story:', e);
    container.innerHTML = '<p class="text-red">Something went wrong loading the story. Please refresh.</p>';
  }
})();
