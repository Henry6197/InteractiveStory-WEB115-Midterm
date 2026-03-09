// CS:GO Case Opening - Simplified

const S = 'https://community.akamai.steamstatic.com/economy/image/';

const RARITIES = {
  milspec:    { label: 'Mil-Spec',  color: '#4b69ff', weight: 79.92 },
  restricted: { label: 'Restricted', color: '#8847ff', weight: 15.98 },
  classified: { label: 'Classified', color: '#d32ce6', weight: 3.20 },
  covert:     { label: 'Covert', color: '#eb4b4b', weight: 0.64 },
  gold:       { label: '★ Rare Special', color: '#ffd700', weight: 0.26 },
};

const CASE = {
  name: 'CS:GO Weapon Case',
  price: 2.50,
  image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bji61XxRCKg0MSz_nUDvPb-OPFvdKTFDzbAkbp16bY5Gn6wkx9ysj7Xntf9IC6WZgA-Sswnnj45WXo',
  items: [
    { name: 'MP7 | Skulls', rarity: 'milspec', price: 22.18, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY' },
    { name: 'AUG | Wings', rarity: 'milspec', price: 14.25, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc' },
    { name: 'SG 553 | Ultraviolet', rarity: 'milspec', price: 21.52, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA' },
    { name: 'Glock-18 | Dragon Tattoo', rarity: 'restricted', price: 112.45, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg' },
    { name: 'USP-S | Dark Water', rarity: 'restricted', price: 91.82, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj' },
    { name: 'M4A1-S | Dark Water', rarity: 'restricted', price: 92.92, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A' },
    { name: 'AK-47 | Case Hardened', rarity: 'classified', price: 325.37, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q' },
    { name: 'Desert Eagle | Hypnotic', rarity: 'classified', price: 221.29, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J' },
    { name: 'AWP | Lightning Strike', rarity: 'covert', price: 378.21, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN' },
    { name: '★ Bayonet', rarity: 'gold', price: 330.73, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA' },
    { name: '★ Flip Knife', rarity: 'gold', price: 270.33, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2oZK19bqjKVjbDkbtwtbU4S3jhwElw4DvVzomhd3_CblV1CZd2TO5f4RG4lID5d7S15Y9TpQQ' },
    { name: '★ Gut Knife', rarity: 'gold', price: 94.01, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pfbAjd6TAXDSSkeh3trdtTCy1zUV2t2vTyoyrIHzDalAgCsN1ROcO40O6wMqnab0rKy1qHw' },
    { name: '★ Karambit', rarity: 'gold', price: 1466.37, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2labZsLfKaGinEx-0u5LhqGHrjlElz52jRmN2sd3yfb1NzWZVwRbNeu0S5k9WxMuvh-UWA3ObnwJvj' },
    { name: '★ M9 Bayonet', rarity: 'gold', price: 1090.15, image: S+'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2jMZtvIemcAGKEj7ojtOIwSnrrkEt25WiEw438cXuUaQB0WcBxFrUItxa6lNezMOKzsVPAy9USYWigJ8Q' },
  ]
};

let balance = 1000;
let isSpinning = false;

const balanceEl = document.getElementById('balance');
const rouletteStrip = document.getElementById('rouletteStrip');
const openBtn = document.getElementById('openBtn');
const wonItemEl = document.getElementById('wonItem');
const wonItemCard = document.getElementById('wonItemCard');
const casePriceEl = document.getElementById('casePrice');

function updateBalance() {
  balanceEl.textContent = balance.toFixed(2);
}

function pickItem() {
  const totalWeight = CASE.items.reduce((sum, item) => sum + RARITIES[item.rarity].weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of CASE.items) {
    rand -= RARITIES[item.rarity].weight;
    if (rand <= 0) return item;
  }
  return CASE.items[0];
}

function buildStrip(winItem) {
  const ITEM_WIDTH = 140;
  const TOTAL_ITEMS = 70;
  const WIN_INDEX = 55;

  rouletteStrip.innerHTML = '';
  rouletteStrip.style.transform = 'translateX(0)';
  rouletteStrip.style.transition = 'none';

  for (let i = 0; i < TOTAL_ITEMS; i++) {
    const item = (i === WIN_INDEX) ? winItem : pickItem();
    const el = document.createElement('div');
    el.className = `roulette-item rarity-${item.rarity}`;
    
    if (item.rarity === 'gold') {
      el.innerHTML = `
        <img class="item-icon" src="gold.jpg" alt="★ Rare Special ★">
        <div class="item-name" style="color:#ffd700">★ Rare Special ★</div>
      `;
      el.dataset.goldImage = item.image;
      el.dataset.goldName = item.name;
    } else {
      el.innerHTML = `
        <img class="item-icon" src="${item.image}" alt="${item.name}">
        <div class="item-name">${item.name}</div>
      `;
    }
    
    rouletteStrip.appendChild(el);
  }

  return { ITEM_WIDTH, WIN_INDEX };
}

openBtn.addEventListener('click', () => {
  if (isSpinning) return;
  if (balance < CASE.price) {
    alert('not enough balance!');
    return;
  }

  isSpinning = true;
  openBtn.disabled = true;
  wonItemEl.style.display = 'none';
  balance -= CASE.price;
  updateBalance();

  const winItem = pickItem();
  const { ITEM_WIDTH, WIN_INDEX } = buildStrip(winItem);

  const containerWidth = document.querySelector('.roulette-container').offsetWidth;
  const centerOffset = containerWidth / 2 - ITEM_WIDTH / 2;
  const randomNudge = (Math.random() - 0.5) * (ITEM_WIDTH * 0.6);
  const targetX = -(WIN_INDEX * ITEM_WIDTH) + centerOffset + randomNudge;
  const duration = 5000 + Math.random() * 1500;

  setTimeout(() => {
    rouletteStrip.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    rouletteStrip.style.transform = `translateX(${targetX}px)`;
  }, 50);

  setTimeout(() => {
    isSpinning = false;
    openBtn.disabled = false;
    
    // Reveal real gold item in roulette strip after spin
    if (winItem.rarity === 'gold') {
      const winEl = rouletteStrip.children[55];
      if (winEl && winEl.dataset.goldImage) {
        winEl.innerHTML = `
          <img class="item-icon" src="${winEl.dataset.goldImage}" alt="${winEl.dataset.goldName}">
          <div class="item-name">${winEl.dataset.goldName}</div>
        `;
      }
    }
    
    wonItemEl.style.display = 'block';
    wonItemCard.className = `won-item-card rarity-${winItem.rarity}`;
    wonItemCard.innerHTML = `
      <img class="item-icon" src="${winItem.image}" alt="${winItem.name}">
      <div class="item-name" style="color:${RARITIES[winItem.rarity].color}">${winItem.name}</div>
      <div class="item-price" style="color:${RARITIES[winItem.rarity].color}">$${winItem.price.toFixed(2)}</div>
      <div style="color:#64748b;font-size:0.8rem">${RARITIES[winItem.rarity].label}</div>
    `;
  }, duration + 200);
});

// add balance popup
const balDiv = document.querySelector('.balance');
balDiv.style.cursor = 'pointer';
balDiv.addEventListener('click', (e) => {
  e.stopPropagation();
  const popup = document.createElement('div');
  popup.className = 'balance-popup';
  [100, 500, 1000].forEach(amt => {
    const btn = document.createElement('button');
    btn.className = 'bal-add-btn';
    btn.textContent = '+$' + amt;
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      balance += amt;
      updateBalance();
      popup.remove();
    });
    popup.appendChild(btn);
  });
  balDiv.appendChild(popup);
  
  const close = () => popup.remove();
  setTimeout(() => document.addEventListener('click', close, { once: true }), 10);
});

// init
casePriceEl.textContent = CASE.price.toFixed(2);
updateBalance();
