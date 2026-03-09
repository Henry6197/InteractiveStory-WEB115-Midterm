// ═══════════════════════════════════════════════════
// MONSTER ROMANCE — Interactive Story Engine
// ═══════════════════════════════════════════════════

const container = document.getElementById('storyContainer');
const eyesBg = document.getElementById('marenEyes');

// ── State ────────────────────────────────────────
let currentScene = 'intro';
let introDay = 0;
let fightCfg = {};
let puzzleTimer = null;
let caseSpinning = false;

// ── Case data (from app.js) ─────────────────────
const S = 'https://community.akamai.steamstatic.com/economy/image/';

const RARITIES = {
  milspec:    { label: 'Mil-Spec',  color: '#4b69ff', weight: 79.92 },
  restricted: { label: 'Restricted', color: '#8847ff', weight: 15.98 },
  classified: { label: 'Classified', color: '#d32ce6', weight: 3.20 },
  covert:     { label: 'Covert', color: '#eb4b4b', weight: 0.64 },
  gold:       { label: '★ Rare Special', color: '#ffd700', weight: 0.26 },
};

const CASE_ITEMS = [
  { name: 'MP7 | Skulls', rarity: 'milspec', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY' },
  { name: 'AUG | Wings', rarity: 'milspec', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc' },
  { name: 'SG 553 | Ultraviolet', rarity: 'milspec', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA' },
  { name: 'Glock-18 | Dragon Tattoo', rarity: 'restricted', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg' },
  { name: 'USP-S | Dark Water', rarity: 'restricted', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj' },
  { name: 'M4A1-S | Dark Water', rarity: 'restricted', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A' },
  { name: 'AK-47 | Case Hardened', rarity: 'classified', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q' },
  { name: 'Desert Eagle | Hypnotic', rarity: 'classified', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J' },
  { name: 'AWP | Lightning Strike', rarity: 'covert', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN' },
  { name: '★ Karambit', rarity: 'gold', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2labZsLfKaGinEx-0u5LhqGHrjlElz52jRmN2sd3yfb1NzWZVwRbNeu0S5k9WxMuvh-UWA3ObnwJvj' },
  { name: '★ Bayonet', rarity: 'gold', image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA' },
];

function storyPickItem() {
  const totalWeight = CASE_ITEMS.reduce((sum, item) => sum + RARITIES[item.rarity].weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of CASE_ITEMS) {
    rand -= RARITIES[item.rarity].weight;
    if (rand <= 0) return item;
  }
  return CASE_ITEMS[0];
}

function storyPickNonGold() {
  const nonGold = CASE_ITEMS.filter(i => i.rarity !== 'gold');
  const totalWeight = nonGold.reduce((sum, item) => sum + RARITIES[item.rarity].weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of nonGold) {
    rand -= RARITIES[item.rarity].weight;
    if (rand <= 0) return item;
  }
  return nonGold[0];
}

function storyBuildStrip(stripEl, winItem) {
  const ITEM_WIDTH = 140;
  const TOTAL_ITEMS = 70;
  const WIN_INDEX = 55;

  stripEl.innerHTML = '';
  stripEl.style.transform = 'translateX(0)';
  stripEl.style.transition = 'none';

  for (let i = 0; i < TOTAL_ITEMS; i++) {
    const item = (i === WIN_INDEX) ? winItem : storyPickItem();
    const el = document.createElement('div');
    el.className = 'roulette-item rarity-' + item.rarity;

    if (item.rarity === 'gold') {
      el.innerHTML =
        '<img class="item-icon" src="gold.jpg" alt="★ Rare Special ★">' +
        '<div class="item-name" style="color:#ffd700">★ Rare Special ★</div>';
      el.dataset.goldImage = item.image;
      el.dataset.goldName = item.name;
    } else {
      el.innerHTML =
        '<img class="item-icon" src="' + item.image + '" alt="' + item.name + '">' +
        '<div class="item-name">' + item.name + '</div>';
    }

    stripEl.appendChild(el);
  }

  return { ITEM_WIDTH, WIN_INDEX };
}

function spinCase(stripEl, winItem, callback) {
  const { ITEM_WIDTH, WIN_INDEX } = storyBuildStrip(stripEl, winItem);
  const rouletteContainer = stripEl.parentElement;
  const containerWidth = rouletteContainer.offsetWidth;
  const centerOffset = containerWidth / 2 - ITEM_WIDTH / 2;
  const randomNudge = (Math.random() - 0.5) * (ITEM_WIDTH * 0.6);
  const targetX = -(WIN_INDEX * ITEM_WIDTH) + centerOffset + randomNudge;
  const duration = 4000 + Math.random() * 1000;

  setTimeout(() => {
    stripEl.style.transition = 'transform ' + duration + 'ms cubic-bezier(0.25, 0.1, 0.25, 1)';
    stripEl.style.transform = 'translateX(' + targetX + 'px)';
  }, 50);

  setTimeout(() => {
    // Reveal gold after spin
    if (winItem.rarity === 'gold') {
      const winEl = stripEl.children[WIN_INDEX];
      if (winEl && winEl.dataset.goldImage) {
        winEl.innerHTML =
          '<img class="item-icon" src="' + winEl.dataset.goldImage + '" alt="' + winEl.dataset.goldName + '">' +
          '<div class="item-name">' + winEl.dataset.goldName + '</div>';
      }
    }
    if (callback) callback(winItem);
  }, duration + 300);
}

// ── Day data for intro ───────────────────────────
const DAYS = [
  { day: 1, result: 'nothing', video: 'does ok' },
  { day: 2, result: 'nothing', video: 'does ok' },
  { day: 3, result: 'nothing', video: 'does ok' },
  { day: 4, result: 'nothing', video: 'does ok' },
  { day: 5, result: 'nothing', video: 'does ok' },
  { day: 6, result: 'nothing', video: 'blows up!' },
  { day: 7, result: 'nothing', video: 'does a little worse than blowing up' },
  { day: 8, result: 'nothing', video: 'does great!' },
  { day: 9, result: 'nothing', video: 'does great!' },
  { day: 10, result: 'gold', video: 'goes VIRAL' },
];

// ── Scenes ───────────────────────────────────────
const SCENES = {

  // ─── INTRO: Day progression ─────────────────────
  intro: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You wake up in your apartment and scroll through your phone.</p>
          <p class="narrator">You see a video: <strong>"opening 1 case a day untill i get a gold — day 6348"</strong></p>
          <p class="narrator">Some guy has been opening CS:GO cases every single day for over 6,000 days straight. No gold. Ever.</p>
          <p class="narrator">You think: <em>I could do that.</em></p>
        </div>
        <div id="dayArea">
          <div class="day-counter">
            <div class="day-label">DAY</div>
            <div class="day-num" id="dayNum">1</div>
          </div>
          <div class="roulette-container">
            <div class="roulette-marker"></div>
            <div class="roulette-strip" id="storyStrip"></div>
          </div>
          <div id="dayResult" style="margin-top:15px"></div>
        </div>
        <button class="story-continue" id="openCaseBtn">Open Day 1 Case</button>
      `;
      container.innerHTML = html;
      introDay = 0;
      caseSpinning = false;
      document.getElementById('openCaseBtn').addEventListener('click', openDayCase);
    }
  },

  // ─── MAREN APPEARS (after day 10) ──────────────
  marenAppears: {
    render() {
      flash('gold');
      container.innerHTML = '';
      eyesBg.style.display = 'block';

      var cs = document.createElement('div');
      cs.id = 'activeCutscene';
      cs.className = 'cutscene';
      cs.innerHTML =
        '<div class="cs-letterbox-top"></div>' +
        '<div class="cs-letterbox-bot"></div>' +
        '<div class="cs-vignette"></div>' +

        '<div class="cs-frame" style="animation-delay:0.5s;animation-duration:3.2s">' +
          '<div class="cs-gold">★ DAY 10 ★</div>' +
        '</div>' +
        '<div class="cs-bg cs-gold-bg" style="animation-delay:0.5s;animation-duration:3.2s"></div>' +

        '<div class="cs-frame" style="animation-delay:3.7s;animation-duration:3.5s">' +
          '<div class="cs-narrator">That night, your screen glitches.</div>' +
        '</div>' +
        '<div class="cs-bg cs-glitch" style="animation-delay:3.7s;animation-duration:3.5s"></div>' +

        '<div class="cs-frame" style="animation-delay:7.2s;animation-duration:3.5s">' +
          '<div class="cs-narrator">Static crawls across the monitor.</div>' +
          '<div class="cs-narrator" style="margin-top:12px">Then something <em>moves</em> inside it.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:10.7s;animation-duration:4s">' +
          '<div class="cs-dramatic" style="color:#8b5cf6">\uD83D\uDC41\uFE0F\u00A0\u00A0\u00A0\u00A0\u00A0\uD83D\uDC41\uFE0F</div>' +
        '</div>' +
        '<div class="cs-bg cs-eyes" style="animation-delay:10.7s;animation-duration:4s"></div>' +

        '<div class="cs-frame" style="animation-delay:14.7s;animation-duration:3.5s">' +
          '<div class="cs-narrator">A shadow creature with <em style="color:#8b5cf6">glowing violet eyes</em></div>' +
          '<div class="cs-narrator">crawls out of your screen.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:18.2s;animation-duration:3.5s">' +
          '<div class="cs-maren">&ldquo;The gold called me here. Luck that strong opens doors between worlds.&rdquo;</div>' +
        '</div>' +
        '<div class="cs-bg cs-violet-ambient" style="animation-delay:18.2s;animation-duration:3.5s"></div>' +

        '<div class="cs-frame cs-hold" style="animation-delay:21.7s;animation-duration:3s">' +
          '<div class="cs-narrator">They call themselves <strong style="color:#c084fc">Maren</strong>.</div>' +
          '<button class="cs-continue" style="animation-delay:23.5s" onclick="endCutscene(\'comment\')">Continue</button>' +
        '</div>' +

        '<button class="cs-skip" onclick="endCutscene(\'comment\')">Skip \u25B8</button>';

      document.body.appendChild(cs);
    }
  },

  // ─── VIRAL VIDEO + COMMENT ─────────────────────
  comment: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You post the video. It goes <span class="highlight">VIRAL</span>.</p>
          <p class="narrator">Millions of views overnight. And then you see the top comment:</p>
          <div class="comment-box">
            <div class="comment-user">CaseGrinder6348</div>
            <div class="comment-text">6,358 days. You took everything from me in 10. Enjoy it while you can. I'm coming for what's mine.</div>
          </div>
          <p class="maren">That man... he's been opening cases so long the door almost opened for him. He can feel me. He wants what you have.</p>
          <p class="narrator">How do you reply to his comment?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('watchyourself','loser')">\"haha loser\"</button>
          <button class="story-btn" onclick="showScene('didthisforu')">\"i did this for u\"</button>
          <button class="story-btn" onclick="showScene('tradeend')">\"you can have it!\"</button>
          <button class="story-btn danger" onclick="showScene('watchyourself','keeping')">\"im keeping it its mine\"</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── "I DID THIS FOR U" sub-choice ─────────────
  didthisforu: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You reply: <em>"i did this for u"</em></p>
          <div class="comment-box">
            <div class="comment-user">CaseGrinder6348</div>
            <div class="comment-text">Then give me the knife. I've earned it. 6,358 days. It's mine.</div>
          </div>
          <p class="maren">If you trade the knife... the gold was my anchor to this world. I'll fade.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('tradeend')">Give him the knife</button>
          <button class="story-btn romantic" onclick="showScene('watchyourself','kept')">Don't give him the knife</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── TRADE END (gave knife away) ───────────────
  tradeend: {
    render() {
      eyesBg.style.display = 'none';
      let html = `
        <div class="ending-screen">
          <div class="ending-type bad">ENDING</div>
          <div class="ending-title" style="color:#9580b0">The Fading</div>
          <div class="ending-text">
            <p>You trade him the knife.</p>
            <p>The moment it leaves your inventory, Maren starts to flicker. Their violet eyes grow dim.</p>
            <p class="maren">The gold was my anchor...</p>
            <p>They vanish.</p>
            <p>You stop posting videos. Stop everything. Just go back to daily life. Your apartment feels colder than it ever has.</p>
            <br>
            <p style="color:#6b5580;font-style:italic">At the last second, before you fall asleep, you see glowing violet eyes flash in the window — watching over you even now.</p>
          </div>
          <div class="the-end tragic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── "WATCH YOURSELF" (paths merge here) ───────
  watchyourself: {
    render(variant) {
      let replyText = '';
      if (variant === 'loser') {
        replyText = `
          <p class="narrator">You reply: <em>"haha loser"</em></p>
          <div class="comment-box">
            <div class="comment-user">CaseGrinder6348</div>
            <div class="comment-text">Watch yourself.</div>
          </div>
          <p class="maren">That man is dangerous. I can feel it.</p>
        `;
      } else if (variant === 'keeping') {
        replyText = `
          <p class="narrator">You reply: <em>"im keeping it its mine"</em></p>
          <div class="comment-box">
            <div class="comment-user">CaseGrinder6348</div>
            <div class="comment-text">Watch yourself.</div>
          </div>
          <p class="maren">I'm not a thing to be kept... but I want to stay.</p>
        `;
      } else {
        replyText = `
          <p class="narrator">You don't give him the knife.</p>
          <div class="comment-box">
            <div class="comment-user">CaseGrinder6348</div>
            <div class="comment-text">Watch yourself.</div>
          </div>
          <p class="maren">Thank you for choosing me.</p>
        `;
      }

      let html = `
        <div class="story-text">
          ${replyText}
        </div>
        <button class="story-continue" onclick="showScene('rising')">Continue</button>
      `;
      container.innerHTML = html;
    }
  },

  // ─── RISING (channel grows, bond with Maren) ───
  rising: {
    render() {
      container.innerHTML =
        '<div class="story-text">' +
          '<p class="narrator">Weeks pass. Then months.</p>' +
          '<p class="narrator">You and Maren grow closer. They teach you about the shadow world that exists behind screens. You teach them about being human.</p>' +
          '<p class="maren">Your world is so bright. So fragile. I want to protect it.</p>' +
          '<p class="narrator">Your channel hits <span class="highlight">1,000,000 subscribers</span>. You\'re bigger than ever.</p>' +
          '<p class="narrator">But the other guy — CaseGrinder6348 — has stopped posting. Something does not feel right...</p>' +
          '<p class="maren">He\'s not gone. He\'s preparing something. He wants the knife — and me with it.</p>' +
        '</div>' +
        '<button class="story-continue" onclick="showScene(\'dm\')">Continue</button>';

      var cs = document.createElement('div');
      cs.id = 'activeCutscene';
      cs.className = 'cutscene';
      cs.innerHTML =
        '<div class="cs-letterbox-top"></div>' +
        '<div class="cs-letterbox-bot"></div>' +
        '<div class="cs-vignette"></div>' +

        '<div class="cs-frame" style="animation-delay:0.3s;animation-duration:3s">' +
          '<div class="cs-narrator">Weeks pass.</div>' +
          '<div class="cs-narrator" style="margin-top:8px">Then months.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:3.3s;animation-duration:3.5s">' +
          '<div class="cs-narrator">You and Maren grow closer.</div>' +
        '</div>' +
        '<div class="cs-bg cs-violet-ambient" style="animation-delay:3.3s;animation-duration:3.5s"></div>' +

        '<div class="cs-frame" style="animation-delay:6.8s;animation-duration:3.2s">' +
          '<div class="cs-maren">&ldquo;Your world is so bright. So fragile. I want to protect it.&rdquo;</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:10s;animation-duration:3s">' +
          '<div class="cs-gold">1,000,000 subscribers</div>' +
        '</div>' +
        '<div class="cs-bg cs-gold-bg" style="animation-delay:10s;animation-duration:3s"></div>' +

        '<div class="cs-frame cs-hold" style="animation-delay:13s;animation-duration:3s">' +
          '<div class="cs-narrator">But CaseGrinder6348 has stopped posting.</div>' +
          '<div class="cs-small" style="color:#ef4444">Something doesn\'t feel right.</div>' +
          '<button class="cs-continue" style="animation-delay:15s" onclick="endCutscene()">Continue</button>' +
        '</div>' +
        '<div class="cs-bg cs-red" style="animation-delay:13s;animation-duration:3s"></div>' +

        '<button class="cs-skip" onclick="endCutscene()">Skip \u25B8</button>';

      document.body.appendChild(cs);
    }
  },

  // ─── DM (photo of front door) ──────────────────
  dm: {
    render() {
      flash('red');
      container.innerHTML =
        '<div class="story-text dramatic-moment">' +
          '<p class="narrator">You\'re on the computer when a DM comes in from his account.</p>' +
          '<p class="narrator">It\'s just a photo of <strong style="color:#ef4444">YOUR front door</strong>. No text.</p>' +
          '<p class="maren">He\'s here. I can sense him.</p>' +
          '<p class="narrator">What do you do?</p>' +
        '</div>' +
        '<div class="story-choices">' +
          '<button class="story-btn" onclick="showScene(\'blocknight\')">Block him</button>' +
          '<button class="story-btn" onclick="showScene(\'policenight\')">Call the police</button>' +
        '</div>';

      var cs = document.createElement('div');
      cs.id = 'activeCutscene';
      cs.className = 'cutscene';
      cs.innerHTML =
        '<div class="cs-letterbox-top"></div>' +
        '<div class="cs-letterbox-bot"></div>' +
        '<div class="cs-vignette"></div>' +

        '<div class="cs-frame" style="animation-delay:0.3s;animation-duration:2.8s">' +
          '<div class="cs-narrator">A new message.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:3.1s;animation-duration:3s">' +
          '<div class="cs-danger">CaseGrinder6348</div>' +
        '</div>' +
        '<div class="cs-bg cs-red" style="animation-delay:3.1s;animation-duration:3s"></div>' +

        '<div class="cs-frame" style="animation-delay:6.1s;animation-duration:3.5s">' +
          '<div class="cs-narrator">A photo of <strong style="color:#ef4444">your front door</strong>.</div>' +
          '<div class="cs-small">No text.</div>' +
        '</div>' +

        '<div class="cs-frame cs-hold" style="animation-delay:9.6s;animation-duration:3s">' +
          '<div class="cs-maren">&ldquo;He\'s here. I can sense him.&rdquo;</div>' +
          '<button class="cs-continue" style="animation-delay:11.5s" onclick="endCutscene()">Continue</button>' +
        '</div>' +

        '<button class="cs-skip" onclick="endCutscene()">Skip \u25B8</button>';

      document.body.appendChild(cs);
    }
  },

  // ─── BLOCK PATH: Night ─────────────────────────
  blocknight: {
    render() {
      container.innerHTML =
        '<div class="story-text">' +
          '<p class="narrator">You block him. Try to forget about it.</p>' +
          '<p class="narrator">Maren curls up beside you that night. You fall asleep feeling safe.</p>' +
          '<p class="dramatic">...</p>' +
          '<p class="narrator">You wake up in the middle of the night to a noise in your kitchen.</p>' +
          '<p class="narrator">Maren is gone from the bed.</p>' +
          '<p class="narrator">What do you do?</p>' +
        '</div>' +
        '<div class="story-choices">' +
          '<button class="story-btn" onclick="showScene(\'blockhide\')">Hide</button>' +
          '<button class="story-btn danger" onclick="showScene(\'blockcheck\')">Check it out</button>' +
        '</div>';

      var cs = document.createElement('div');
      cs.id = 'activeCutscene';
      cs.className = 'cutscene';
      cs.innerHTML =
        '<div class="cs-letterbox-top"></div>' +
        '<div class="cs-letterbox-bot"></div>' +
        '<div class="cs-vignette"></div>' +

        '<div class="cs-frame" style="animation-delay:0.3s;animation-duration:3s">' +
          '<div class="cs-narrator">You block him.</div>' +
          '<div class="cs-small">Try to forget about it.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:3.3s;animation-duration:3.2s">' +
          '<div class="cs-narrator">Maren curls up beside you.</div>' +
          '<div class="cs-narrator" style="margin-top:10px">You fall asleep feeling safe.</div>' +
        '</div>' +
        '<div class="cs-bg cs-violet-ambient" style="animation-delay:3.3s;animation-duration:3.2s"></div>' +

        '<div class="cs-frame" style="animation-delay:6.5s;animation-duration:2.5s">' +
          '<div class="cs-dramatic" style="color:#f472b6;font-size:3rem">. . .</div>' +
        '</div>' +
        '<div class="cs-bg cs-dark" style="animation-delay:6.5s;animation-duration:2.5s"></div>' +

        '<div class="cs-frame" style="animation-delay:9s;animation-duration:3s">' +
          '<div class="cs-narrator">You wake up to a noise in the kitchen.</div>' +
        '</div>' +

        '<div class="cs-frame cs-hold" style="animation-delay:12s;animation-duration:3s">' +
          '<div class="cs-narrator" style="color:#ef4444">Maren is gone.</div>' +
          '<button class="cs-continue" style="animation-delay:14s" onclick="endCutscene()">Continue</button>' +
        '</div>' +

        '<button class="cs-skip" onclick="endCutscene()">Skip \u25B8</button>';

      document.body.appendChild(cs);
    }
  },

  // ─── BLOCK: Hide under bed ─────────────────────
  blockhide: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You scramble under the bed. Your heart is pounding.</p>
          <p class="narrator">You see two legs walk into the room. He goes straight to your computer — and <strong style="color:#ef4444">smashes it</strong>.</p>
          <p class="narrator">You hear Maren hiss from the shadows above.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="startFight({noWeapon:true, marenHelp:true, source:'blockhide'})">Exit hiding spot and fight</button>
          <button class="story-btn romantic" onclick="showScene('puzzle')">Stay hidden — trust Maren</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── BLOCK: Check it out (staircase) ───────────
  blockcheck: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You sneak to the staircase.</p>
          <p class="narrator">Maren appears beside you in shadow form, pressing a clawed hand to your chest. You feel <em>stronger</em>.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('blockkitchen')">Keep going to the kitchen</button>
          <button class="story-btn" onclick="showScene('blockgoback')">Go back and hide</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── BLOCK: Kitchen encounter ──────────────────
  blockkitchen: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You make your way to the kitchen and peek in.</p>
          <p class="narrator">He spots you.</p>
          <p class="narrator">He's holding a <strong style="color:#ef4444">binding crystal</strong> — something forged from 6,000 days of failed case openings. It traps creatures like Maren.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('runend')">Run!</button>
          <button class="story-btn" onclick="startFight({marenHelp:true, source:'blockkitchen'})">Fight — with Maren</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── BLOCK: Go back / stub toe ─────────────────
  blockgoback: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You turn back toward the bedroom but <strong style="color:#ef4444">stub your toe</strong> on the doorframe!</p>
          <p class="narrator">The noise echoes. You hear heavy footsteps getting closer.</p>
          <p class="maren">I won't let him take me from you.</p>
          <p class="narrator">Maren appears between you and the hallway. You have no choice — you must fight.</p>
        </div>
        <button class="story-continue" onclick="startFight({stubToe:true, marenHelp:true, source:'blockgoback'})">Fight!</button>
      `;
      container.innerHTML = html;
    }
  },

  // ─── POLICE PATH: Night ────────────────────────
  policenight: {
    render() {
      container.innerHTML =
        '<div class="story-text">' +
          '<p class="narrator">You call the police. They say they can\'t do anything about an online threat.</p>' +
          '<p class="maren">Human laws can\'t protect us. But I can.</p>' +
          '<p class="dramatic">...</p>' +
          '<p class="narrator">You wake up in the middle of the night to a noise in your kitchen.</p>' +
          '<p class="narrator">Maren is gone from the bed.</p>' +
          '<p class="narrator">What do you do?</p>' +
        '</div>' +
        '<div class="story-choices">' +
          '<button class="story-btn" onclick="showScene(\'policehide\')">Hide</button>' +
          '<button class="story-btn danger" onclick="showScene(\'policecheck\')">Check it out</button>' +
        '</div>';

      var cs = document.createElement('div');
      cs.id = 'activeCutscene';
      cs.className = 'cutscene';
      cs.innerHTML =
        '<div class="cs-letterbox-top"></div>' +
        '<div class="cs-letterbox-bot"></div>' +
        '<div class="cs-vignette"></div>' +

        '<div class="cs-frame" style="animation-delay:0.3s;animation-duration:3s">' +
          '<div class="cs-narrator">You call the police.</div>' +
          '<div class="cs-small">They can\'t help.</div>' +
        '</div>' +

        '<div class="cs-frame" style="animation-delay:3.3s;animation-duration:3.2s">' +
          '<div class="cs-maren">&ldquo;Human laws can\'t protect us. But I can.&rdquo;</div>' +
        '</div>' +
        '<div class="cs-bg cs-violet-ambient" style="animation-delay:3.3s;animation-duration:3.2s"></div>' +

        '<div class="cs-frame" style="animation-delay:6.5s;animation-duration:2.5s">' +
          '<div class="cs-dramatic" style="color:#f472b6;font-size:3rem">. . .</div>' +
        '</div>' +
        '<div class="cs-bg cs-dark" style="animation-delay:6.5s;animation-duration:2.5s"></div>' +

        '<div class="cs-frame" style="animation-delay:9s;animation-duration:3s">' +
          '<div class="cs-narrator">You wake up to a noise in the kitchen.</div>' +
        '</div>' +

        '<div class="cs-frame cs-hold" style="animation-delay:12s;animation-duration:3s">' +
          '<div class="cs-narrator" style="color:#ef4444">Maren is gone.</div>' +
          '<button class="cs-continue" style="animation-delay:14s" onclick="endCutscene()">Continue</button>' +
        '</div>' +

        '<button class="cs-skip" onclick="endCutscene()">Skip \u25B8</button>';

      document.body.appendChild(cs);
    }
  },

  // ─── POLICE: Hide under bed ────────────────────
  policehide: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You scramble under the bed.</p>
          <p class="narrator">You see two legs walk into the room. He goes to your computer and <strong style="color:#ef4444">smashes it</strong>.</p>
          <p class="narrator">Then you see Maren's shadow form coil around the ceiling above him.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="startFight({noWeapon:true, marenHelp:true, source:'policehide'})">Exit hiding spot and fight</button>
          <button class="story-btn romantic" onclick="showScene('puzzle')">Stay hidden — trust Maren</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── POLICE: Check it out (staircase) ──────────
  policecheck: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You sneak to the staircase.</p>
          <p class="narrator">Maren appears beside you, claws extended, eyes blazing violet.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('policekitchen')">Keep going to the kitchen</button>
          <button class="story-btn" onclick="showScene('policegoback')">Go back and hide</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── POLICE: Kitchen encounter ─────────────────
  policekitchen: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You make your way to the kitchen and peek in. He spots you.</p>
          <p class="narrator">He's holding a <strong style="color:#ef4444">binding crystal</strong>.</p>
          <p class="narrator">What do you do?</p>
        </div>
        <div class="story-choices">
          <button class="story-btn danger" onclick="showScene('runend')">Run!</button>
          <button class="story-btn" onclick="startFight({marenHelp:true, source:'policekitchen'})">Fight — with Maren</button>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── POLICE: Go back / stub toe ────────────────
  policegoback: {
    render() {
      let html = `
        <div class="story-text">
          <p class="narrator">You turn back but <strong style="color:#ef4444">stub your toe</strong> on the doorframe! It echoes through the house.</p>
          <p class="narrator">Footsteps. Getting closer.</p>
          <p class="maren">Together.</p>
          <p class="narrator">You must fight.</p>
        </div>
        <button class="story-continue" onclick="startFight({stubToe:true, marenHelp:true, source:'policegoback'})">Fight!</button>
      `;
      container.innerHTML = html;
    }
  },

  // ─── RUN ENDING ────────────────────────────────
  runend: {
    render() {
      eyesBg.style.display = 'none';
      let html = `
        <div class="ending-screen">
          <div class="ending-type bad">ENDING</div>
          <div class="ending-title" style="color:#ef4444">The Crystal</div>
          <div class="ending-text">
            <p>You start running. You trip.</p>
            <p>He throws the binding crystal at Maren. A flash of red light — and Maren is trapped inside, their violet eyes frozen mid-scream.</p>
            <p>He takes the crystal and the knife. He's gone.</p>
            <p>You open cases every single day after that, trying to pull another gold, trying to open the door again. But they never come back.</p>
            <p style="color:#6b5580">On day 6,358... you finally understand what he felt.</p>
          </div>
          <div class="the-end tragic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── PEACE ENDING (win fight) ──────────────────
  peaceend: {
    render() {
      let html = `
        <div class="ending-screen">
          <div class="ending-type good">ENDING</div>
          <div class="ending-title" style="color:#8b5cf6">Safe Together</div>
          <div class="ending-text">
            <p>You shatter his binding crystal. It explodes in a burst of violet light.</p>
            <p>Maren wraps around you protectively as he flees into the night.</p>
            <p class="maren">You fought for me.</p>
            <p>You and Maren live together after that. You stop posting and just enjoy being with each other.</p>
            <p>No one knows what you've been through. And that's okay.</p>
          </div>
          <div class="the-end romantic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── TRAPPED ENDING (lose fight) ───────────────
  trappedend: {
    render() {
      eyesBg.style.display = 'none';
      let html = `
        <div class="ending-screen">
          <div class="ending-type bad">ENDING</div>
          <div class="ending-title" style="color:#ef4444">Day 6,358</div>
          <div class="ending-text">
            <p>He traps Maren in the binding crystal and vanishes into the night with your knife and your creature.</p>
            <p>You open cases every single day for years, trying to pull another gold. Trying to open the door again.</p>
            <p style="color:#6b5580">On day 6,358... you finally understand what he felt all along.</p>
          </div>
          <div class="the-end tragic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── LOVE ENDING (best — puzzle pass) ──────────
  loveend: {
    render() {
      flash('violet');
      let html = `
        <div class="ending-screen">
          <div class="ending-type best">★ BEST ENDING ★</div>
          <div class="ending-title" style="background:linear-gradient(90deg,#8b5cf6,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Love is the Strongest Magic</div>
          <div class="ending-text">
            <p>Maren glows brilliant violet — brighter than you've ever seen. The whole room fills with light.</p>
            <p>The man screams and flees into the night. The binding crystal shatters in his hand.</p>
            <p class="maren">Love is the only magic stronger than a binding crystal.</p>
            <p>You stay together forever. Safe in each other. The door between worlds stays open — just for you two.</p>
          </div>
          <div class="the-end romantic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },

  // ─── FADE ENDING (puzzle fail) ─────────────────
  fadeend: {
    render() {
      eyesBg.style.display = 'none';
      let html = `
        <div class="ending-screen">
          <div class="ending-type neutral">ENDING</div>
          <div class="ending-title" style="color:#6b5580">The Flicker</div>
          <div class="ending-text">
            <p>Maren's power fades. The violet light dims to nothing.</p>
            <p>He finds you both. He traps Maren in the crystal and leaves without a word.</p>
            <p>You open cases every single day after that.</p>
            <p style="color:#6b5580">On day 6,358, a pair of violet eyes flickers on your screen for just a moment — then nothing.</p>
          </div>
          <div class="the-end tragic">— THE END —</div>
          <br>
          <button class="btn-restart" onclick="showScene('intro')">Play Again</button>
          <a href="index.html" class="btn-restart" style="margin-left:10px">Open Cases</a>
        </div>
      `;
      container.innerHTML = html;
    }
  },
};

// ── Scene Navigation ─────────────────────────────
function showScene(id, variant) {
  var cs = document.getElementById('activeCutscene');
  if (cs) cs.remove();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  currentScene = id;
  if (SCENES[id]) {
    SCENES[id].render(variant);
  }
}

// ── Flash Effect ─────────────────────────────────
function flash(color) {
  const el = document.createElement('div');
  el.className = 'screen-flash ' + color;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

function endCutscene(nextScene, nextVariant) {
  var cs = document.getElementById('activeCutscene');
  if (cs) cs.remove();
  if (nextScene) showScene(nextScene, nextVariant);
}

// ── Intro Day Case Opening ───────────────────────
function openDayCase() {
  if (caseSpinning) return;
  if (introDay >= DAYS.length) {
    showScene('marenAppears');
    return;
  }

  caseSpinning = true;
  const d = DAYS[introDay];
  const isGold = d.result === 'gold';

  // Update day counter
  const dayNumEl = document.getElementById('dayNum');
  const dayCounter = dayNumEl ? dayNumEl.parentElement : null;
  if (dayNumEl) dayNumEl.textContent = d.day;
  if (dayCounter && isGold) dayCounter.classList.add('gold-day');
  else if (dayCounter) dayCounter.classList.remove('gold-day');

  // Clear previous result
  const resultEl = document.getElementById('dayResult');
  if (resultEl) resultEl.innerHTML = '';

  // Disable button during spin
  const btn = document.getElementById('openCaseBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Opening...';
  }

  // Pick the winning item
  const winItem = isGold
    ? CASE_ITEMS.find(i => i.rarity === 'gold')
    : storyPickNonGold();

  const stripEl = document.getElementById('storyStrip');
  if (!stripEl) return;

  spinCase(stripEl, winItem, function(item) {
    caseSpinning = false;

    const isViral = d.day === 6 || d.day === 8 || d.day === 9;

    // Show result text
    if (resultEl) {
      if (isGold) {
        flash('gold');
        resultEl.innerHTML =
          '<div class="day-result gold">★ GOLD — ' + item.name + '! ★</div>' +
          '<div class="video-stats"><span>📹 Post video — it <span class="viral">' + d.video + '</span></span></div>';
      } else {
        resultEl.innerHTML =
          '<div class="day-result nothing">' + item.name + ' — nothing special.</div>' +
          '<div class="video-stats"><span>📹 Post video — it ' +
          (isViral ? '<span class="viral">' : '') + d.video + (isViral ? '</span>' : '') +
          '</span></div>';
      }
    }

    // Update button for next day
    if (btn) {
      btn.disabled = false;
      introDay++;
      if (isGold) {
        btn.textContent = 'Something is happening...';
        btn.onclick = function() { showScene('marenAppears'); };
      } else if (introDay < DAYS.length) {
        btn.textContent = 'Open Day ' + (introDay + 1) + ' Case';
      } else {
        btn.textContent = 'Something is happening...';
        btn.onclick = function() { showScene('marenAppears'); };
      }
    }
  });
}

// ══════════════════════════════════════════════════
//  FIGHT MINIGAME
// ══════════════════════════════════════════════════
function startFight(cfg) {
  fightCfg = cfg || {};
  let playerMaxHP = 100;
  let enemyMaxHP = 100;

  if (fightCfg.marenHelp) playerMaxHP += 15;
  if (fightCfg.stubToe) playerMaxHP -= 15;

  let playerHP = playerMaxHP;
  let enemyHP = enemyMaxHP;
  let playerTurn = true;
  let fightOver = false;

  const playerMinDmg = fightCfg.noWeapon ? 8 : 15;
  const playerMaxDmg = fightCfg.noWeapon ? 18 : 28;
  const enemyMinDmg = 10;
  const enemyMaxDmg = 22;

  function randDmg(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function renderFight() {
    const pPct = Math.max(0, (playerHP / playerMaxHP) * 100);
    const ePct = Math.max(0, (enemyHP / enemyMaxHP) * 100);

    let html = `
      <div class="fight-arena">
        ${fightCfg.marenHelp ? '<div class="maren-boost">Maren fights alongside you! (+15 HP)</div>' : ''}
        ${fightCfg.stubToe ? '<div class="maren-boost" style="color:#ef4444">Stubbed toe! (-15 HP)</div>' : ''}
        ${fightCfg.noWeapon ? '<div class="maren-boost" style="color:#9580b0">No weapon — reduced damage</div>' : ''}
        <div class="fight-hud">
          <div class="fighter player">
            <div class="fighter-name">You ${fightCfg.marenHelp ? '& Maren' : ''}</div>
            <div class="hp-bar-container">
              <div class="hp-bar player-hp" style="width:${pPct}%"></div>
              <div class="hp-text">${Math.max(0, playerHP)} / ${playerMaxHP}</div>
            </div>
          </div>
          <div class="fighter enemy">
            <div class="fighter-name">CaseGrinder6348</div>
            <div class="hp-bar-container">
              <div class="hp-bar enemy-hp" style="width:${ePct}%"></div>
              <div class="hp-text">${Math.max(0, enemyHP)} / ${enemyMaxHP}</div>
            </div>
          </div>
        </div>
        <div class="fight-log" id="fightLog"></div>
        <div class="fight-actions">
          <button class="btn-attack" id="atkBtn" ${!playerTurn || fightOver ? 'disabled' : ''}>⚔️ ATTACK</button>
        </div>
      </div>
    `;
    container.innerHTML = html;

    if (!fightOver) {
      document.getElementById('atkBtn').addEventListener('click', doPlayerAttack);
    }
  }

  function addLog(msg) {
    const log = document.getElementById('fightLog');
    if (log) {
      log.innerHTML += msg + '<br>';
      log.scrollTop = log.scrollHeight;
    }
  }

  function doPlayerAttack() {
    if (fightOver || !playerTurn) return;
    playerTurn = false;

    const dmg = randDmg(playerMinDmg, playerMaxDmg);
    enemyHP -= dmg;
    addLog(`<span class="log-player">You strike for ${dmg} damage!</span>`);

    if (fightCfg.marenHelp && Math.random() > 0.5) {
      const mDmg = randDmg(5, 12);
      enemyHP -= mDmg;
      addLog(`<span class="log-maren">Maren slashes from the shadows for ${mDmg} damage!</span>`);
    }

    updateBars();

    if (enemyHP <= 0) {
      fightOver = true;
      addLog(`<span class="log-player" style="color:#4ade80">You win!</span>`);
      const btn = document.getElementById('atkBtn');
      btn.disabled = true;
      setTimeout(() => showScene('peaceend'), 1500);
      return;
    }

    const btn = document.getElementById('atkBtn');
    btn.disabled = true;

    setTimeout(() => {
      const eDmg = randDmg(enemyMinDmg, enemyMaxDmg);
      playerHP -= eDmg;
      addLog(`<span class="log-enemy">CaseGrinder6348 hits you for ${eDmg}!</span>`);
      updateBars();

      if (playerHP <= 0) {
        fightOver = true;
        addLog(`<span class="log-enemy">You've been defeated...</span>`);
        const btn2 = document.getElementById('atkBtn');
        if (btn2) btn2.disabled = true;
        setTimeout(() => showScene('trappedend'), 1500);
        return;
      }

      playerTurn = true;
      const btn2 = document.getElementById('atkBtn');
      if (btn2) btn2.disabled = false;
    }, 800);
  }

  function updateBars() {
    const pBar = document.querySelector('.hp-bar.player-hp');
    const eBar = document.querySelector('.hp-bar.enemy-hp');
    const pText = document.querySelector('.fighter.player .hp-text');
    const eText = document.querySelector('.fighter.enemy .hp-text');

    if (pBar) pBar.style.width = Math.max(0, (playerHP / playerMaxHP) * 100) + '%';
    if (eBar) eBar.style.width = Math.max(0, (enemyHP / enemyMaxHP) * 100) + '%';
    if (pText) pText.textContent = Math.max(0, playerHP) + ' / ' + playerMaxHP;
    if (eText) eText.textContent = Math.max(0, enemyHP) + ' / ' + enemyMaxHP;
  }

  renderFight();
}

// ══════════════════════════════════════════════════
//  PUZZLE MINIGAME
// ══════════════════════════════════════════════════
SCENES.puzzle = {
  render() {
    let count = 0;
    let timeLeft = 60;

    let html = `
      <div class="story-text">
        <p class="maren">Type what you feel for me. Say it and I'll have the power to protect us.</p>
      </div>
      <div class="puzzle-container">
        <div class="puzzle-prompt">Hint: What I feel for Maren</div>
        <div class="puzzle-timer normal" id="pzTimer">60</div>
        <div class="puzzle-counter"><span class="count" id="pzCount">0</span> / 10</div>
        <input type="text" class="puzzle-input" id="pzInput" maxlength="4" autocomplete="off" autofocus placeholder="????">
        <div class="puzzle-hint">Type the 4-letter word and press Enter — 10 times in 60 seconds</div>
      </div>
    `;
    container.innerHTML = html;

    const input = document.getElementById('pzInput');
    const countEl = document.getElementById('pzCount');
    const timerEl = document.getElementById('pzTimer');

    input.focus();

    if (puzzleTimer) clearInterval(puzzleTimer);
    puzzleTimer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 10) {
        timerEl.className = 'puzzle-timer urgent';
      }
      if (timeLeft <= 0) {
        clearInterval(puzzleTimer);
        puzzleTimer = null;
        showScene('fadeend');
      }
    }, 1000);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toUpperCase();
        if (val === 'LOVE') {
          count++;
          countEl.textContent = count;
          input.value = '';
          input.className = 'puzzle-input correct';
          setTimeout(() => { input.className = 'puzzle-input'; }, 300);

          if (count >= 10) {
            clearInterval(puzzleTimer);
            puzzleTimer = null;
            setTimeout(() => showScene('loveend'), 500);
          }
        } else {
          input.value = '';
          input.className = 'puzzle-input wrong';
          setTimeout(() => { input.className = 'puzzle-input'; }, 300);
        }
      }
    });
  }
};

// ── Start ────────────────────────────────────────
eyesBg.style.display = 'none';
showScene('intro');
