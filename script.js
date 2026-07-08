/* EcoSmet — script.js (Customer) */
console.log("SCRIPT TERBARU LOADED");
const LS = {
  CUSTOMERS: 'ecosmet_customers',
  ADMIN: 'ecosmet_admin',
  SESSION: 'ecosmet_session',
  CATEGORIES: 'ecosmet_categories',
  PRODUCTS: 'ecosmet_products',
  CART: 'ecosmet_cart',
  ORDERS: 'ecosmet_orders',
  REVIEWS: 'ecosmet_reviews',
  LAST_SUCCESS: 'ecosmet_last_success',

  // Pengaturan & Privasi
  PAYMENT_METHODS: 'ecosmet_payment_methods',
  ADDRESSES: 'ecosmet_addresses',
  // catatan: info akun (photo/name/phone) disimpan di CUSTOMERS agar navbar & profile otomatis update
};

const DEFAULT_PRODUCTS = (() => {
  const now = Date.now();
  return [
    { id:'p1', name:"Johnson's Baby Oil 100ml", categoryId:'cat_bath', categoryName:'Bath & Hygiene', ageGroup:'0–6 bulan', price:42000, stock:80, rating:4.8, sales:320, createdAt: now-1000*60*60*24*6, img:'images/produk/baby-oil.png', desc:'Minyak pijat lembut untuk menjaga kelembapan kulit bayi.' },
    { id:'p2', name:'Zwitsal Baby Shampoo 200ml', categoryId:'cat_bath', categoryName:'Bath & Hygiene', ageGroup:'0–12 bulan', price:38000, stock:64, rating:4.7, sales:280, createdAt: now-1000*60*60*24*15, img:'images/produk/baby-shampoo.png', desc:'Sampo lembut, tidak pedih di mata, untuk kulit kepala sensitif.' },
    { id:'p3', name:'MamyPoko Pants S (24)', categoryId:'cat_diapers', categoryName:'Diapers', ageGroup:'6–12 bulan', price:85000, stock:120, rating:4.6, sales:540, createdAt: now-1000*60*60*24*2, img:'images/produk/diapers.png', desc:'Popok celana nyaman dengan daya serap tinggi.' },
    { id:'p4', name:'Cussons Baby Lotion 200ml', categoryId:'cat_body', categoryName:'Body Care', ageGroup:'0–12 bulan', price:49000, stock:2, rating:4.5, sales:210, createdAt: now-1000*60*60*24*10, img:'images/produk/baby-lotion.png', desc:'Lotion bayi yang melembapkan dan melindungi kulit halus bayi.' },
    { id:'p5', name:'Pure Baby Wet Wipes 80pcs', categoryId:'cat_hygiene', categoryName:'Wipes & Care', ageGroup:'0–3 tahun', price:32000, stock:200, rating:4.7, sales:430, createdAt: now-1000*60*60*24*20, img:'images/produk/wet-wipes.png', desc:'Tisu basah lembut untuk membersihkan kulit bayi kapan saja.' },
    { id:'p6', name:'Kodomo Baby Soap Gentle', categoryId:'cat_bath', categoryName:'Bath & Hygiene', ageGroup:'0–12 bulan', price:29000, stock:90, rating:4.6, sales:310, createdAt: now-1000*60*60*24*4, img:'images/produk/baby-soap.png', desc:'Sabun mandi bayi dengan formula ekstra lembut.' },
    { id:'p7', name:'Sweety Premium M (30)', categoryId:'cat_diapers', categoryName:'Diapers', ageGroup:'1–3 tahun', price:98000, stock:56, rating:4.5, sales:200, createdAt: now-1000*60*60*24*12, img:'images/produk/diapers2.png', desc:'Popok premium untuk kenyamanan si kecil sepanjang hari.' },
    { id:'p8', name:'Merries Baby Pants L (20)', categoryId:'cat_diapers', categoryName:'Diapers', ageGroup:'6–12 bulan', price:139000, stock:48, rating:4.8, sales:330, createdAt: now-1000*60*60*24*7, img:'images/produk/diapers3.png', desc:'Popok merk Merries, lembut dan bernapas untuk kulit bayi.' },
    { id:'p9', name:'My Baby Powder 100gr', categoryId:'cat_body', categoryName:'Body Care', ageGroup:'0–3 tahun', price:24000, stock:140, rating:4.4, sales:150, createdAt: now-1000*60*60*24*3, img:'images/produk/baby-powder.png', desc:'Bedak bayi ringan untuk menjaga kulit tetap kering dan nyaman.' },
    { id:'p10', name:'Pigeon Baby Bottle 150ml', categoryId:'cat_hygiene', categoryName:'Wipes & Care', ageGroup:'0–12 bulan', price:75000, stock:75, rating:4.6, sales:220, createdAt: now-1000*60*60*24*8, img:'images/produk/baby-bottle.png', desc:'Botol susu bayi dengan desain anti-colic untuk kenyamanan minum.' },
    { id:'p11', name:'Chicco Baby Nail Clipper', categoryId:'cat_hygiene', categoryName:'Wipes & Care', ageGroup:'0–3 tahun', price:55000, stock:30, rating:4.7, sales:180, createdAt: now-1000*60*60*24*14, img:'images/produk/baby-nail-clipper.png', desc:'Gunting kuku bayi dengan desain aman dan nyaman digunakan.' },
    { id:'p12', name:'Mustela Baby Cream 50ml', categoryId:'cat_body', categoryName:'Body Care', ageGroup:'0–12 bulan', price:89000, stock:65, rating:4.8, sales:260, createdAt: now-1000*60*60*24*5, img:'images/produk/baby-cream.png', desc:'Krim bayi untuk melindungi dan menenangkan kulit sensitif.' },
    { id:'p13', name:'Bepanthen Baby Ointment 30gr', categoryId:'cat_body', categoryName:'Body Care', ageGroup:'0–12 bulan', price:67000, stock:50, rating:4.5, sales:190, createdAt: now-1000*60*60*24*9, img:'images/produk/baby-ointment.png', desc:'Salep bayi untuk mencegah dan merawat ruam popok.' },
    { id:'p14', name:'Himalaya Baby Massage Oil 100ml', categoryId:'cat_body', categoryName:'Body Care', ageGroup:'0–12 bulan', price:48000, stock:85, rating:4.6, sales:240, createdAt: now-1000*60*60*24*11, img:'images/produk/baby-massage-oil.png', desc:'Minyak pijat bayi dengan bahan alami untuk relaksasi dan kelembapan kulit.' },
    { id:'p15', name:'Moell Body Wash 185 Gr', categoryId:'cat_bath', categoryName:'Bath & Hygiene', ageGroup:'0–12 bulan', price:60000, stock:30, rating:4.8, sales:100, createdAt: now-1000*60*60*24*18, img:'images/produk/baby-moell.png', desc:'Moell Body Wash membantu membersihkan dengan lembut, menutrisi kulit, serta memperkuat Skin Barrier sejak newborn.' },
    { id:'p16', name:'MamyPoko Extra Dry Pants M (30)', categoryId:'cat_diapers', categoryName:'Diapers', ageGroup:'6–12 bulan', price:95000, stock:70, rating:4.7, sales:300, createdAt: now-1000*60*60*24*13, img:'images/produk/diapers4.png', desc:'Popok celana ekstra kering untuk kenyamanan si kecil sepanjang hari.' },
    { id:'p17', name:'Pigeon Baby Wipes 80pcs', categoryId:'cat_hygiene', categoryName:'Wipes & Care', ageGroup:'0–3 tahun', price:35000, stock:90, rating:4.6, sales:210, createdAt: now-1000*60*60*24*16, img:'images/produk/baby-wipes.png', desc:'Tisu basah bayi dengan formula lembut untuk membersihkan kulit sensitif.' }
  ];
})();

const DEFAULT_REVIEWS = [
  { productId:'p1', author:'Anisa', rating:5, comment:'Serum ini membuat kulit saya lebih lembap dan glowing.', createdAt: Date.now() - 1000*60*60*24*2 },
  { productId:'p4', author:'Mira', rating:4, comment:'Warna lip tint tahan lama, nyaman dipakai seharian.', createdAt: Date.now() - 1000*60*60*24*5 },
  { productId:'p9', author:'Rafa', rating:5, comment:'Paletnya super cantik, cocok untuk makeup harian dan pesta.', createdAt: Date.now() - 1000*60*60*24*1 }
];

function uid(prefix='id'){
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

const SHIPPING_OPTIONS = [
  { id:'reguler', label:'Reguler', price:10000, eta:'2-3 hari' },
  { id:'express', label:'Express', price:20000, eta:'1-2 hari' },
  { id:'same_day', label:'Same Day', price:35000, eta:'Hari ini' }
];

const VOUCHERS = [
  { code:'WELCOME10', type:'percent', value:10, min:150000, label:'Diskon 10% untuk belanja minimal Rp150.000' },
  { code:'SHIPFREE', type:'shipping', value:100, min:200000, label:'Gratis ongkir untuk belanja minimal Rp200.000' },
  { code:'GLOW25', type:'fixed', value:25000, min:300000, label:'Potongan Rp25.000 untuk belanja minimal Rp300.000' }
];

function safeJSONParse(str, fallback){
  try{ return JSON.parse(str); }catch{ return fallback; }
}

function getShippingOption(id){
  return SHIPPING_OPTIONS.find(opt => opt.id === id) || SHIPPING_OPTIONS[0];
}

function getVoucher(code){
  if(!code) return null;
  return VOUCHERS.find(v => v.code === String(code).trim().toUpperCase()) || null;
}

function formatRupiah(n){
  const num = Number(n || 0);
  return 'Rp ' + num.toLocaleString('id-ID');
}

function getSession(){
  return safeJSONParse(localStorage.getItem(LS.SESSION), null);
}
function setSession(session){
  if(!session) localStorage.removeItem(LS.SESSION);
  else localStorage.setItem(LS.SESSION, JSON.stringify(session));
}

function isLoggedIn(){
  const s = getSession();
  return !!(s && s.role === 'customer');
}

function roleGuard(required){
  const s = getSession();
  if(required === 'customer'){
    if(!s || s.role !== 'customer') window.location.href = 'login.html';
  }
  if(required === 'admin'){
    if(!s || s.role !== 'admin') window.location.href = 'admin/login_admin.html';
  }
}

function seedIfNeeded(){
  if(!localStorage.getItem(LS.CATEGORIES)){
    const categories = [
      { id:'cat_bath', name:'Bath & Hygiene', icon:'fa-bath', img:'images/kategori/kategori-bath.png' },
      { id:'cat_diapers', name:'Diapers', icon:'fa-pants', img:'images/kategori/kategori-diapers.png' },
      { id:'cat_body', name:'Body Care', icon:'fa-heart', img:'images/kategori/kategori-body.png' },
      { id:'cat_hygiene', name:'Wipes & Care', icon:'fa-tshirt', img:'images/kategori/kategori-wipes.png' }
    ];
    localStorage.setItem(LS.CATEGORIES, JSON.stringify(categories));
  }

  const existingProducts = safeJSONParse(localStorage.getItem(LS.PRODUCTS), []);
  if(!Array.isArray(existingProducts) || !existingProducts.length){
    localStorage.setItem(LS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
  } else {
    const existingIds = new Set(existingProducts.map(p => p.id));
    const missing = DEFAULT_PRODUCTS.filter(p => !existingIds.has(p.id));
    if(missing.length){
      localStorage.setItem(LS.PRODUCTS, JSON.stringify([...existingProducts, ...missing]));
    }
  }

  if(!localStorage.getItem(LS.ADMIN)){
    // default admin account (editable via admin pages)
    const admin = { email:'nuradmin@gmail.com', password:'nura12345', name:'Admin Nura Baby Care' };
    localStorage.setItem(LS.ADMIN, JSON.stringify(admin));
  }

  if(!localStorage.getItem(LS.REVIEWS)){
    localStorage.setItem(LS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
  }

  if(!localStorage.getItem(LS.CUSTOMERS)){
    localStorage.setItem(LS.CUSTOMERS, JSON.stringify([]));
  }

  if(!localStorage.getItem(LS.CART)){
    localStorage.setItem(LS.CART, JSON.stringify([]));
  }

  if(!localStorage.getItem(LS.ORDERS)){
    localStorage.setItem(LS.ORDERS, JSON.stringify([]));
  }
}

function getCategories(){ return safeJSONParse(localStorage.getItem(LS.CATEGORIES), []); }
function getProducts(){ return safeJSONParse(localStorage.getItem(LS.PRODUCTS), []); }
function getReviews(){ return safeJSONParse(localStorage.getItem(LS.REVIEWS), []); }
function setReviews(items){ localStorage.setItem(LS.REVIEWS, JSON.stringify(items)); }

function getCart(){ return safeJSONParse(localStorage.getItem(LS.CART), []); }
function setCart(items){ localStorage.setItem(LS.CART, JSON.stringify(items)); }

function getCustomers(){ return safeJSONParse(localStorage.getItem(LS.CUSTOMERS), []); }
function setCustomers(list){ localStorage.setItem(LS.CUSTOMERS, JSON.stringify(list)); }

function getOrders(){ return safeJSONParse(localStorage.getItem(LS.ORDERS), []); }
function setOrders(list){ localStorage.setItem(LS.ORDERS, JSON.stringify(list)); }

function getProductById(id){
  return getProducts().find(p => p.id === id);
}

function addToCart(productId, qty){
  const product = getProductById(productId);
  if(!product) return { ok:false, message:'Produk tidak ditemukan.' };

  const cart = getCart();
  const existing = cart.find(i => i.productId === productId);
  const wanted = Number(qty || 1);
  if(wanted <= 0) return { ok:false, message:'Qty tidak valid.' };
  if(wanted > product.stock) return { ok:false, message:`Stok tidak cukup. Stok tersedia: ${product.stock}` };

  if(existing){
    const newQty = existing.qty + wanted;
    if(newQty > product.stock) return { ok:false, message:`Stok tidak cukup. Stok tersedia: ${product.stock}` };
    existing.qty = newQty;
  } else {
    cart.push({ productId, qty: wanted, addedAt: Date.now() });
  }

  setCart(cart);
  return { ok:true };
}

function updateCartQty(productId, qty){
  const product = getProductById(productId);
  if(!product) return;
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if(!item) return;
  const q = Number(qty);
  if(q <= 0){
    setCart(cart.filter(i => i.productId !== productId));
    return;
  }
  if(q > product.stock) {
    item.qty = product.stock;
  } else {
    item.qty = q;
  }
  setCart(cart);
}

function removeFromCart(productId){
  setCart(getCart().filter(i => i.productId !== productId));
}

function cartCount(){
  return getCart().reduce((acc, it) => acc + (Number(it.qty)||0), 0);
}

function cartTypeCount(){
  return getCart().length;
}

function calcCartTotals(options = {}){
  const { shippingId = 'reguler', voucherCode = '' } = options;
  const items = getCart();
  const products = getProducts();
  const sub = items.reduce((acc, it) => {
    const p = products.find(x => x.id === it.productId);
    if(!p) return acc;
    return acc + p.price * it.qty;
  }, 0);

  const distinctItems = items.length;
  const totalQty = items.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
  const shippingInfo = getShippingOption(shippingId);
  const shipping = distinctItems ? shippingInfo.price : 0;
  const autoDiscount = sub >= 250000 ? Math.round(sub * 0.1) : 0;
  const voucher = getVoucher(voucherCode);
  let voucherDiscount = 0;

  if(voucher && distinctItems){
    if(sub >= voucher.min){
      if(voucher.type === 'percent') voucherDiscount = Math.round(sub * (voucher.value / 100));
      if(voucher.type === 'fixed') voucherDiscount = voucher.value;
      if(voucher.type === 'shipping') voucherDiscount = shipping;
    }
  }

  const discount = Math.min(sub + shipping, autoDiscount + voucherDiscount);
  const total = Math.max(0, sub + shipping - discount);
  return { items: totalQty, distinctItems, sub, discount, shipping, total, shippingInfo, voucher };
}

function renderCartBadge(){
  const el = document.getElementById('cartBadge');
  if(el) el.textContent = String(cartCount());
  renderFloatingCart();
}

function createFloatingCart(){
  if(document.getElementById('floatingCart')) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'floatingCart';
  wrapper.className = 'floating-cart';
  wrapper.innerHTML = `
    <div class="floating-cart-inner">
      <i class="fa-solid fa-cart-shopping"></i>
      <span class="floating-cart-badge" id="floatingCartCount">0</span>
    </div>
  `;
  wrapper.addEventListener('click', () => window.location.href = 'keranjang.html');
  document.body.appendChild(wrapper);
}

function renderFloatingCart(){
  if(!location.pathname.endsWith('produk.html')){
    const wrapper = document.getElementById('floatingCart');
    if(wrapper) wrapper.style.display = 'none';
    return;
  }

  createFloatingCart();
  const wrapper = document.getElementById('floatingCart');
  if(!wrapper) return;
  const count = cartTypeCount();
  const badge = wrapper.querySelector('#floatingCartCount');
  wrapper.style.display = count ? 'flex' : 'none';
  if(badge) badge.textContent = String(count);
}

function animateFloatingCart(){
  const wrapper = document.getElementById('floatingCart');
  if(!wrapper) return;
  wrapper.classList.add('floating-cart-pulse');
  window.setTimeout(() => wrapper.classList.remove('floating-cart-pulse'), 500);
}

function animateFlyToCart(source){
  const target = document.getElementById('cartBadge') || document.getElementById('floatingCart');
  if(!source || !target) return;
  const sourceImg = source.querySelector('img') || source;
  const rect = sourceImg.getBoundingClientRect();
  const clone = sourceImg.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.borderRadius = '18px';
  clone.style.opacity = '1';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  clone.style.transition = 'transform .65s ease, opacity .45s ease';
  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    const targetRect = target.getBoundingClientRect();
    const dx = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.18)`;
    clone.style.opacity = '0.25';
  });
  window.setTimeout(() => clone.remove(), 700);
}

function initFloatingCart(){
  createFloatingCart();
  renderFloatingCart();
}

function setYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

function initUserMenu(){
  const btn = document.getElementById('userMenuBtn');
  const menu = document.getElementById('userMenu');
  const logoutBtn = document.getElementById('btnLogout');
  const linkLogin = document.getElementById('linkLogin');
  const linkProfile = document.getElementById('linkProfile');
  const linkAdmin = document.getElementById('linkAdmin');

  if(btn && menu){
    btn.addEventListener('click', () => {
      const isHidden = menu.hasAttribute('hidden');
      menu.toggleAttribute('hidden', !isHidden);
    });
    document.addEventListener('click', (e) => {
      if(!menu || menu.hasAttribute('hidden')) return;
      const t = e.target;
      if(t && (btn.contains(t) || menu.contains(t))) return;
      menu.setAttribute('hidden','');
    });
  }

  const s = getSession();
  const customer = (s && s.role==='customer') ? getCustomers().find(c => c.id === s.userId) : null;
  const isCustomerLoggedIn = !!customer;

  if(linkLogin) linkLogin.style.display = isCustomerLoggedIn ? 'none' : 'inline-flex';
  if(btn) btn.style.display = isCustomerLoggedIn ? 'inline-flex' : 'none';
  if(menu && !isCustomerLoggedIn){menu.setAttribute('hidden', '');}

  if(linkProfile) linkProfile.style.display = isCustomerLoggedIn ? 'flex' : 'none';
  if(linkAdmin) linkAdmin.style.display = 'none';

  // Orders menu visibility (desktop + mobile)
  const linkOrders = document.getElementById('linkOrders');
  const mobileLinkOrders = document.getElementById('mobileLinkOrders');
  if(linkOrders){
    linkOrders.hidden = !isCustomerLoggedIn;
  }
  if(mobileLinkOrders){
    mobileLinkOrders.hidden = !isCustomerLoggedIn;
  }

  if(isCustomerLoggedIn){
    const nameEl = document.getElementById('userMenuName');
    const roleEl = document.getElementById('userMenuRole');
    if(nameEl) nameEl.textContent = customer.name;
    if(roleEl) roleEl.textContent = 'Customer';

    // Avatar (foto profil dari LocalStorage: customer.photoDataUrl)
    const avatarWrap = document.querySelector('#userMenu .avatar');
    if(avatarWrap){
      const photoDataUrl = customer.photoDataUrl;
      if(photoDataUrl){
        avatarWrap.innerHTML = `<img class="user-menu-avatar-img" src="${photoDataUrl}" alt="Foto Profil" onerror="this.style.display='none'" />`;
      } else {
        avatarWrap.innerHTML = `<i class="fa-solid fa-sparkles"></i>`;
      }
    }
  }

  if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
      setSession(null);
      window.location.href = 'index.html';
    });
  }
}


function initAuthGuards(){
  seedIfNeeded();
  setYear();
  initFloatingCart();
  renderCartBadge();

  // protect profile
  if(location.pathname.endsWith('profile.html')) roleGuard('customer');

  // For checkout success, customer may or may not be logged in; allow.
  // For simplicity, no redirect.

  // If customer logged in, hide login/register forms by redirecting.
  const s = getSession();
  if(s && s.role==='customer'){
    if(location.pathname.endsWith('login.html') || location.pathname.endsWith('register.html')){
      window.location.href = 'profile.html';
    }
  }

  // Bind global search (available in floating navbar)
  const globalSearch = document.getElementById('globalSearch');
  if(globalSearch){
    globalSearch.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        const q = globalSearch.value.trim();
        window.location.href = q ? `produk.html?search=${encodeURIComponent(q)}` : 'produk.html';
      }
    });
  }
}

function initCustomerRegister(){
  const form = document.getElementById('registerForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim().toLowerCase();
    const phone = String(fd.get('phone') || '').trim();
    const password = String(fd.get('password') || '');

    const alert = document.getElementById('registerAlert');

    if(name.length < 2){
      alert.textContent = 'Nama minimal 2 karakter.';
      alert.className = 'alert alert--danger';
      alert.hidden = false;
      return;
    }
    if(!email.includes('@')){
      alert.textContent = 'Email tidak valid.';
      alert.className = 'alert alert--danger';
      alert.hidden = false;
      return;
    }
    if(password.length < 6){
      alert.textContent = 'Password minimal 6 karakter.';
      alert.className = 'alert alert--danger';
      alert.hidden = false;
      return;
    }

    const customers = getCustomers();
    if(customers.some(c => c.email === email)){
      alert.textContent = 'Email sudah terdaftar.';
      alert.className = 'alert alert--danger';
      alert.hidden = false;
      return;
    }

    const customer = { id: uid('cus'), name, email, phone, password };
    customers.push(customer);
    setCustomers(customers);

    setSession({ role:'customer', userId: customer.id, email: customer.email, name: customer.name });
    window.location.href = 'profile.html';
  });
}

function initCustomerLogin(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = String(fd.get('email') || '').trim().toLowerCase();
    const password = String(fd.get('password') || '');
    const remember = document.getElementById('rememberMe')?.checked;

    const alert = document.getElementById('loginAlert');

    const customers = getCustomers();
    const found = customers.find(c => c.email === email && c.password === password);
    if(!found){
      alert.textContent = 'Email atau password salah.';
      alert.className = 'alert alert--danger';
      alert.hidden = false;
      return;
    }

    setSession({ role:'customer', userId: found.id, email: found.email, name: found.name, remember: !!remember });
    window.location.href = 'index.html';
  });
}

function initApp(){
  seedIfNeeded();
  setYear();
  renderCartBadge();
  initUserMenu();
  renderHome();
  initAboutSlider();
  // Global search bindings
  const globalSearch = document.getElementById('globalSearch');
  const welcomeSearch = document.getElementById('welcomeSearch');
  const shopNowBtn = document.getElementById('shopNowBtn');
  function goToProducts(q){
    const url = q ? `produk.html?search=${encodeURIComponent(q)}` : 'produk.html';
    window.location.href = url;
  }
  if(globalSearch){ globalSearch.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ goToProducts(globalSearch.value.trim()); } }); }
  if(welcomeSearch){ welcomeSearch.addEventListener('keydown', (e) => { if(e.key === 'Enter'){ goToProducts(welcomeSearch.value.trim()); } }); }
  if(shopNowBtn){ shopNowBtn.addEventListener('click', () => goToProducts(welcomeSearch?.value?.trim() || '')); }
}

function initAboutSlider(){
  const slider = document.getElementById('aboutSlider');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('.about-slide'));
  const nav = document.getElementById('aboutSliderNav');
  const buttons = Array.from(document.querySelectorAll('.slide-btn'));
  let currentIndex = 0;
  let timer = null;

  function updateDots(index){
    if(!nav) return;
    nav.querySelectorAll('.slide-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  function setSlide(index){
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });
    updateDots(currentIndex);
  }

  function restartTimer(){
    clearInterval(timer);
    timer = setInterval(() => setSlide(currentIndex + 1), 6000);
  }

  if(nav){
    nav.innerHTML = slides.map((_, idx) => `<button class="slide-dot${idx===0 ? ' active' : ''}" type="button" aria-label="Slide ${idx + 1}" data-index="${idx}"></button>`).join('');
    nav.querySelectorAll('.slide-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        setSlide(Number(dot.dataset.index));
        restartTimer();
      });
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if(action === 'next') setSlide(currentIndex + 1);
      if(action === 'prev') setSlide(currentIndex - 1);
      restartTimer();
    });
  });

  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restartTimer);

  setSlide(0);
  restartTimer();
}

function renderHome(){
  const flashEl = document.getElementById('homeFlash');
  const bestEl = document.getElementById('homeBestSeller');
  const newEl = document.getElementById('homeNewArrival');
  const catEl = document.getElementById('homeCategories');
  if(!flashEl && !bestEl && !newEl) return;

  const products = getProducts().slice();
  const flashSale = products.slice().sort((a,b)=> (b.sales||0)-(a.sales||0)).slice(0,4);
  const bestSeller = products.slice().sort((a,b)=> (b.sales||0)-(a.sales||0)).slice(0,4);
  const newArrival = products.slice().sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)).slice(0,4);

  if(flashEl){
    flashEl.innerHTML = '';
    flashSale.forEach(p => flashEl.appendChild(renderProductCard(p, true)));
  }
  if(bestEl){
    bestEl.innerHTML = '';
    bestSeller.forEach(p => bestEl.appendChild(renderProductCard(p, true)));
  }
  if(newEl){
    newEl.innerHTML = '';
    newArrival.forEach(p => newEl.appendChild(renderProductCard(p, true)));
  }

  if(catEl){
    catEl.innerHTML = '';
    getCategories().forEach(c => catEl.appendChild(renderCategoryCard(c)));
  }
}

function getStockStatus(p){
  const stock = Number(p.stock || 0);
  if(stock === 0) return { text:'🔴 Stok Habis', type:'out', badge:'status-out', icon:'fa-circle-xmark' };
  if(stock <= 5) return { text:`🟡 Stok Menipis • Sisa ${stock}`, type:'low', badge:'status-low', icon:'fa-triangle-exclamation' };
  return { text:`🟢 Tersedia • Stok ${stock}`, type:'ok', badge:'status-available', icon:'fa-circle-check' };
}

function renderProductCard(p, compact=false){
  const cart = getCart();
  const cartItem = cart.find(i => i.productId === p.id);
  const qty = cartItem ? Number(cartItem.qty) : 0;
  const stock = Number(p.stock || 0);
  const status = getStockStatus(p);
  const outOfStock = status.type === 'out';
  const el = document.createElement('div');
  el.className = `product-card ${compact ? 'compact' : ''} ${outOfStock ? 'out-of-stock' : ''}`;
  el.dataset.productId = p.id;

  el.addEventListener('click', (event) => {
    if (event.target.closest('.btn-add, .btn-disabled, .btn-outofstock, .qty-btn, .card-qty, .btn-detail')) return;
    window.location.href = `detail_produk.html?id=${encodeURIComponent(p.id)}`;
  });

  const actionHtml = outOfStock
    ? `<button class="btn btn-soft btn-disabled btn-outofstock" disabled title="Produk ini sedang habis dan belum dapat dipesan.">Habis</button>`
    : qty > 0
      ? `<div class="card-qty" data-product-id="${p.id}">
           <button class="qty-btn" type="button" data-action="minus" data-pid="${p.id}"><i class="fa-solid fa-minus"></i></button>
           <span class="qty-value">${qty}</span>
           <button class="qty-btn" type="button" data-action="plus" data-pid="${p.id}"><i class="fa-solid fa-plus"></i></button>
         </div>`
      : `<button class="btn btn-primary btn-add" type="button" data-product-id="${p.id}" title="Tambah ke keranjang"><i class="fa-solid fa-plus"></i></button>`;

  el.innerHTML = `
    <div class="product-media">
      <img class="product-img" src="${p.img}" alt="${escapeHtml(p.name)}" onerror="this.style.display='none'" />
      ${outOfStock ? '<div class="product-overlay"></div>' : ''}
      <span class="stock-badge ${status.badge}"><i class="fa-solid ${status.icon}"></i>${status.text}</span>
      ${p.ageGroup ? `<span class="p-badge age-badge">${escapeHtml(p.ageGroup)}</span>` : ''}
    </div>
    <div class="product-body">
      <div class="product-top">
        <span class="product-cat"><i class="fa-solid fa-tag"></i> ${escapeHtml(p.categoryName || '')}</span>
        <span class="rating"><i class="fa-solid fa-star"></i> ${Number(p.rating || 0).toFixed(1)}</span>
      </div>
      <h3 class="product-title">${escapeHtml(p.name)}</h3>
      <div class="product-price">${formatRupiah(p.price)}</div>
      ${compact ? '' : `<p class="product-desc">${escapeHtml(p.desc || '')}</p>`}
      <div class="product-actions">
        <a class="btn btn-soft btn-detail" href="detail_produk.html?id=${encodeURIComponent(p.id)}">Detail</a>
        ${actionHtml}
      </div>
    </div>
  `;

  return el;
}

function renderCategoryCard(c){
  const el = document.createElement('a');
  el.className = 'category-link';
  el.href = `produk.html?category=${encodeURIComponent(c.id)}`;
  el.innerHTML = `
    <div class="category-card">
      <div class="cat-icon"><img src="${c.img || ''}" alt="${escapeHtml(c.name)}" onerror="this.style.display='none'" /></div>
      <div>
        <h3>${escapeHtml(c.name)}</h3>
      </div>
    </div>
  `;
  return el;
}

function renderProductsPage(){
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('productEmpty');
  const catDropdown = document.getElementById('categoryDropdown');
  const sortDropdown = document.getElementById('sortDropdown');
  const searchInput = document.getElementById('searchInput');
  if(!grid) return;

  const categories = getCategories();
  const sortOptions = [
    { value:'new', label:'Terbaru' },
    { value:'price_asc', label:'Harga Terendah' },
    { value:'price_desc', label:'Harga Tertinggi' },
    { value:'name_asc', label:'Nama A-Z' },
    { value:'name_desc', label:'Nama Z-A' },
    { value:'stock_desc', label:'Stok Terbanyak' }
  ];

  function renderDropdown(dropdown, items, selectedValue){
    if(!dropdown) return;
    const labelEl = dropdown.querySelector('.dropdown-value');
    const menu = dropdown.querySelector('.dropdown-menu');
    menu.innerHTML = '';
    const selected = selectedValue || dropdown.dataset.value || items[0]?.value;

    items.forEach(item => {
      const option = document.createElement('div');
      option.className = `dropdown-item${item.value === selected ? ' selected' : ''}`;
      option.dataset.value = item.value;
      option.textContent = item.label;
      option.addEventListener('click', () => {
        dropdown.dataset.value = item.value;
        if(labelEl) labelEl.textContent = item.label;
        menu.querySelectorAll('.dropdown-item').forEach(n => n.classList.remove('selected'));
        option.classList.add('selected');
        dropdown.classList.remove('open');
        apply();
      });
      menu.appendChild(option);
    });

    if(labelEl){
      const selectedItem = items.find(i => i.value === selected);
      labelEl.textContent = selectedItem ? selectedItem.label : items[0]?.label || '';
    }
    dropdown.dataset.value = selected;
  }

  const params = new URLSearchParams(location.search);
  const presetCategory = params.get('category');
  const presetSearch = params.get('search');
  if(catDropdown){
    const categoryOptions = [{ value:'all', label:'Semua kategori' }, ...categories.map(c => ({ value:c.id, label:c.name }))];
    if(presetCategory) catDropdown.dataset.value = presetCategory;
    renderDropdown(catDropdown, categoryOptions, catDropdown.dataset.value);
  }

  if(sortDropdown){
    renderDropdown(sortDropdown, sortOptions, sortDropdown.dataset.value || 'new');
  }

  if(presetSearch && searchInput){ searchInput.value = presetSearch; }

  function closeDropdowns(){
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  }

  document.addEventListener('click', (event) => {
    if(!event.target.closest('.dropdown')){
      closeDropdowns();
    }
  });

  [catDropdown, sortDropdown].forEach(dropdown => {
    if(!dropdown) return;
    const trigger = dropdown.querySelector('.dropdown-trigger');
    trigger?.addEventListener('click', (event) => {
      event.stopPropagation();
      closeDropdowns();
      dropdown.classList.toggle('open');
    });
  });

  function apply(){
    const q = (searchInput?.value || '').trim().toLowerCase();
    const cat = catDropdown?.dataset.value || 'all';
    const sort = sortDropdown?.dataset.value || 'new';

    let list = getProducts().slice();
    if(cat && cat !== 'all') list = list.filter(p => p.categoryId === cat);
    if(q) list = list.filter(p => {
      return p.name.toLowerCase().includes(q) ||
             (p.categoryName || '').toLowerCase().includes(q) ||
             (p.desc || '').toLowerCase().includes(q);
    });

    if(sort === 'popular') list.sort((a,b)=>(b.sales||0)-(a.sales||0));
    if(sort === 'new') list.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
    if(sort === 'price_asc') list.sort((a,b)=>(a.price||0)-(b.price||0));
    if(sort === 'price_desc') list.sort((a,b)=>(b.price||0)-(a.price||0));
    if(sort === 'name_asc') list.sort((a,b)=> a.name.localeCompare(b.name));
    if(sort === 'name_desc') list.sort((a,b)=> b.name.localeCompare(a.name));
    if(sort === 'stock_desc') list.sort((a,b)=> (b.stock||0)-(a.stock||0));

    grid.innerHTML = '';
    if(!list.length){ empty.hidden = false; return; }

    empty.hidden = true;
    list.forEach(p => grid.appendChild(renderProductCard(p)));
    attachProductCardEvents();
  }

  function attachProductCardEvents(){
    grid.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const res = addToCart(productId, 1);
        if(res.ok){
          renderCartBadge();
          animateProductCard(productId);
          animateFlyToCart(btn.closest('.product-card') || btn);
          animateFloatingCart();
          apply();
        }
      });
    });

    grid.querySelectorAll('.card-qty button').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.pid;
        const action = btn.dataset.action;
        const cart = getCart();
        const item = cart.find(i => i.productId === pid);
        if(!item) return;
        const nextQty = action === 'plus' ? item.qty + 1 : item.qty - 1;
        updateCartQty(pid, nextQty);
        renderCartBadge();
        apply();
      });
    });
  }

  searchInput?.addEventListener('input', apply);
  apply();
}

function animateProductCard(productId){
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if(!card) return;
  card.classList.add('product-added');
  window.setTimeout(()=> card.classList.remove('product-added'), 500);
}

function renderCategoriesPage(){
  const grid = document.getElementById('categoryGrid');
  if(!grid) return;
  grid.innerHTML='';
  getCategories().forEach(c => grid.appendChild(renderCategoryCard(c)));
}

function escapeHtml(s){
  return String(s ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

function renderProductDetail(){
  const id = new URLSearchParams(location.search).get('id');
  const alert = document.getElementById('detailAlert');
  const qtyInput = document.getElementById('qtyInput');
  const minus = document.getElementById('qtyMinus');
  const plus = document.getElementById('qtyPlus');

  if(!id) return;
  const p = getProductById(id);
  if(!p){
    if(alert){ alert.textContent='Produk tidak ditemukan.'; alert.className='alert alert--danger'; alert.hidden=false; }
    return;
  }

  const title = document.getElementById('detailTitle');
  const img = document.getElementById('detailImg');
  const imgPh = document.getElementById('detailImgPlaceholder');
  const cat = document.getElementById('detailCategory');
  const price = document.getElementById('detailPrice');
  const stock = document.getElementById('detailStock');
  const stockStatus = document.getElementById('detailStockStatus');
  const rating = document.getElementById('detailRating');
  const desc = document.getElementById('detailDesc');
  const reviewList = document.getElementById('reviewList');
  const reviewCount = document.getElementById('reviewCount');
  const reviewForm = document.getElementById('reviewForm');
  const reviewRating = document.getElementById('reviewRating');
  const reviewComment = document.getElementById('reviewComment');
  const reviewFormAlert = document.getElementById('reviewFormAlert');
  let latestReviewId = null;

  if(title) title.textContent = p.name;
  if(img){
    const src = p.img || `images/produk/${p.id}.png`;
    img.alt = p.name;
    img.src = src;
    img.style.display = '';
    img.hidden = false;
    img.onload = () => {
      if(imgPh) imgPh.hidden = true;
    };
    img.onerror = () => {
      img.style.display = 'none';
      img.hidden = true;
      if(imgPh) imgPh.hidden = false;
    };
  }
  if(imgPh) imgPh.hidden = !!p.img;
  if(cat) cat.innerHTML = `<i class="fa-solid fa-tag"></i> ${escapeHtml(p.categoryName||'')}`;
  if(price) price.textContent = formatRupiah(p.price);
  if(stock) stock.textContent = p.stock;
  if(stockStatus){
    const status = getStockStatus(p);
    stockStatus.innerHTML = `<i class="fa-solid ${status.icon}"></i> ${status.text}`;
    stockStatus.className = `stock-badge ${status.badge}`;
  }
  const detailAge = document.getElementById('detailAge');
  if(detailAge){
    if(p.ageGroup){ detailAge.textContent = p.ageGroup; detailAge.style.display = ''; } else { detailAge.style.display = 'none'; }
  }
  if(rating) rating.innerHTML = `<i class="fa-solid fa-star"></i> ${Number(p.rating||0).toFixed(1)}`;
  if(desc) desc.textContent = p.desc;

  function setQty(v){
    const q = Math.max(1, Math.min(Number(v)||1, p.stock));
    qtyInput.value = String(q);
  }
  if(minus) minus.addEventListener('click', ()=> setQty((Number(qtyInput.value)||1)-1));
  if(plus) plus.addEventListener('click', ()=> setQty((Number(qtyInput.value)||1)+1));

  if(qtyInput) qtyInput.addEventListener('change', ()=> setQty(qtyInput.value));

  const addBtn = document.getElementById('addToCartBtn');
  if(addBtn){
    addBtn.addEventListener('click', () => {
      const qty = Number(qtyInput?.value || 1);
      const res = addToCart(p.id, qty);
      if(res.ok){
        if(alert){ alert.textContent='Pesanan telah dimasukkan ke keranjang.'; alert.className='alert alert--success'; alert.hidden=false; }
        renderCartBadge();
        animateFlyToCart(img || addBtn);
        animateFloatingCart();
        window.setTimeout(() => { if(alert) alert.hidden = true; }, 3500);
      } else {
        if(alert){ alert.textContent=res.message; alert.className='alert alert--danger'; alert.hidden=false; }
      }
    });
  }

  function renderReviewCards(){
    if(!reviewList || !reviewCount) return;
    const reviews = getReviews().filter(r => r.productId === p.id).sort((a,b)=> b.createdAt - a.createdAt);
    const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length : Number(p.rating || 0);
    if(rating) rating.innerHTML = `<i class="fa-solid fa-star"></i> ${averageRating.toFixed(1)}`;
    reviewCount.textContent = String(reviews.length);
    reviewList.innerHTML = reviews.length ? reviews.map(r => {
      const stars = Array.from({length:5}, (_, idx) => idx < r.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>').join('');
      const date = new Date(r.createdAt).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
      const avatar = escapeHtml((r.author || 'P').slice(0,1).toUpperCase());
      const newClass = r.id === latestReviewId ? ' new-review' : '';
      return `
        <div class="review-card${newClass}">
          <div class="review-card-header">
            <div class="review-avatar">${avatar}</div>
            <div class="review-author">
              <strong>${escapeHtml(r.author)}</strong>
              <time>${date}</time>
            </div>
            <div class="review-stars">${stars}</div>
          </div>
          <p>${escapeHtml(r.comment)}</p>
        </div>
      `;
    }).join('') : '<div class="review-empty">Belum ada ulasan. Jadilah yang pertama!</div>';
  }

  if(reviewRating){
    let currentRating = 0;
    const stars = Array.from(reviewRating.querySelectorAll('.star'));

    const updateActive = (value) => {
      stars.forEach(st => {
        const starValue = Number(st.dataset.value) || 0;
        st.classList.toggle('active', starValue <= value);
      });
    };

    stars.forEach(star => {
      star.addEventListener('click', () => {
        currentRating = Number(star.dataset.value) || 0;
        updateActive(currentRating);
      });
      star.addEventListener('mouseenter', () => {
        const hoverValue = Number(star.dataset.value) || 0;
        updateActive(hoverValue);
      });
      star.addEventListener('mouseleave', () => {
        updateActive(currentRating);
      });
    });

    updateActive(currentRating);

    if(reviewForm){
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = currentRating;
        const comment = String(reviewComment?.value || '').trim();
        if(!comment){
          if(reviewFormAlert){ reviewFormAlert.textContent='Tulis komentar sebelum mengirim.'; reviewFormAlert.className='alert alert--danger'; reviewFormAlert.hidden=false; }
          return;
        }
        const session = getSession();
        const author = session && session.role==='customer' ? (getCustomers().find(c => c.id === session.userId)?.name || 'Pembeli') : 'Pembeli';
        const reviews = getReviews();
        const reviewId = uid('rev');
        reviews.push({ id: reviewId, productId: p.id, author, rating, comment, createdAt: Date.now() });
        setReviews(reviews);
        if(reviewForm) reviewForm.reset();
        latestReviewId = reviewId;
        currentRating = 0;
        updateActive(currentRating);
        if(reviewFormAlert){ reviewFormAlert.textContent='Ulasanmu berhasil dikirim.'; reviewFormAlert.className='alert alert--success'; reviewFormAlert.hidden=false; }
        renderReviewCards();
        window.setTimeout(() => { if(reviewFormAlert) reviewFormAlert.hidden = true; }, 3600);
      });
    }
  }

  renderReviewCards();
}

function renderCheckoutProducts(){
  const container = document.getElementById('checkoutProducts');
  if(!container) return;
  const cart = getCart();
  if(!cart.length){
    container.innerHTML = '<p class="muted">Keranjang kosong.</p>';
    return;
  }
  container.innerHTML = cart.map(it => {
    const p = getProductById(it.productId);
    if(!p) return '';
    return `
      <article class="checkout-item">
        <img class="checkout-item-img" src="${p.img}" alt="${escapeHtml(p.name)}" onerror="this.style.display='none'" />
        <div class="checkout-item-body">
          <div class="checkout-item-title">${escapeHtml(p.name)}</div>
          <div class="checkout-item-category">${escapeHtml(p.categoryName || '')}</div>
          <div class="checkout-item-price">${formatRupiah(p.price)} x ${it.qty}</div>
        </div>
        <div class="checkout-item-total">${formatRupiah(p.price * it.qty)}</div>
      </article>
    `;
  }).join('');
}

function renderCartPage(){
  const itemsEl = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearBtn = document.getElementById('clearCartBtn');

  const { items, sub, discount, shipping, total } = calcCartTotals();
  const sumItems = document.getElementById('sumItems');
  const sumSubtotal = document.getElementById('sumSubtotal');
  const sumShipping = document.getElementById('sumShipping');
  const sumDiscount = document.getElementById('sumDiscount');
  const sumTotal = document.getElementById('sumTotal');
  if(sumItems) sumItems.textContent = String(items);
  if(sumSubtotal) sumSubtotal.textContent = formatRupiah(sub);
  if(sumShipping) sumShipping.textContent = formatRupiah(shipping);
  if(sumDiscount) sumDiscount.textContent = discount ? ('-' + formatRupiah(discount).replace('Rp ','Rp ')) : formatRupiah(0);
  if(sumTotal) sumTotal.textContent = formatRupiah(total);

  const cart = getCart();
  if(!itemsEl) return;

  itemsEl.innerHTML='';
  if(!cart.length){
    empty.hidden = false;
    if(checkoutBtn) checkoutBtn.removeAttribute('href');
    if(checkoutBtn) checkoutBtn.classList.add('btn-ghost');
    return;
  }
  empty.hidden = true;
  if(checkoutBtn) checkoutBtn.href = 'checkout.html';

  cart.forEach(it => {
    const p = getProductById(it.productId);
    if(!p) return;

    const row = document.createElement('div');
    row.className = 'table-row';
    row.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" style="width:56px; height:56px; object-fit:contain; border-radius:16px; background:var(--soft); border:1px solid rgba(43,27,34,.08)" onerror="this.style.display='none'" />
        <div>
          <div style="font-weight:1000">${escapeHtml(p.name)}</div>
          <div class="muted" style="font-weight:900; font-size:13px">${escapeHtml(p.categoryName||'')}</div>
        </div>
      </div>
      <div style="font-weight:1000">${formatRupiah(p.price)}</div>
      <div>
        <div class="qty">
          <button class="qty-btn" type="button" data-action="minus" data-pid="${p.id}"><i class="fa-solid fa-minus"></i></button>
          <input class="qty-input" type="number" min="1" value="${it.qty}" data-pid="${p.id}" />
          <button class="qty-btn" type="button" data-action="plus" data-pid="${p.id}"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <div style="font-weight:1000">${formatRupiah(p.price * it.qty)}</div>
      <div>
        <button class="btn btn-ghost" style="padding:10px 12px; border-radius:16px" type="button" data-remove="${p.id}"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    itemsEl.appendChild(row);
  });

  function rerender(){
    renderCartPage();
    renderCartBadge();
  }

  itemsEl.querySelectorAll('button[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.getAttribute('data-remove'));
      rerender();
    });
  });

  itemsEl.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-pid');
      const cart = getCart();
      const item = cart.find(i => i.productId===pid);
      if(!item) return;
      const delta = btn.getAttribute('data-action') === 'plus' ? 1 : -1;
      updateCartQty(pid, item.qty + delta);
      rerender();
    });
  });

  itemsEl.querySelectorAll('input.qty-input').forEach(inp => {
    inp.addEventListener('change', ()=>{
      const pid = inp.getAttribute('data-pid');
      updateCartQty(pid, inp.value);
      rerender();
    });
  });

  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      setCart([]);
      rerender();
    });
  }
}

function renderCheckoutPage(){
  const form = document.getElementById('checkoutForm');
  if(!form) return;

  const cart = getCart();
  if(!cart.length){
    window.location.href = 'produk.html';
    return;
  }

  const voucherCodeInput = document.getElementById('voucherCode');
  const applyVoucherBtn = document.getElementById('applyVoucherBtn');
  const voucherHint = document.getElementById('voucherHint');
  const voucherCurrent = document.getElementById('voucherCurrent');
  const openVoucherModal = document.getElementById('openVoucherModal');
  const voucherList = document.getElementById('voucherList');
  const shippingGrid = document.getElementById('shippingGrid');
  const paymentInfo = document.getElementById('paymentInfo');
  const sumItems = document.getElementById('sumItems');
  const sumSubtotal = document.getElementById('sumSubtotal');
  const sumDiscount = document.getElementById('sumDiscount');
  const sumShipping = document.getElementById('sumShipping');
  const sumEta = document.getElementById('sumEta');
  const sumTotal = document.getElementById('sumTotal');

  let currentShipping = 'reguler';
  let currentVoucher = '';
  let currentPayment = 'qris';

  const session = getSession();
  const customer = (session && session.role==='customer') ? getCustomers().find(c => c.id === session.userId) : null;
  const paymentMethodSelect = document.getElementById('paymentMethodSelect');

  // --- Data Penerima (alamat tersimpan untuk login / form manual non-login) ---
  const receiverManualArea = document.getElementById('receiverManualArea');

  const receiverLoginCardArea = document.getElementById('receiverLoginCardArea');
  const receiverAddressCard = document.getElementById('receiverAddressCard');
  const receiverCardChevron = document.getElementById('receiverCardChevron');
  const receiverPrimaryBadge = document.getElementById('receiverPrimaryBadge');

  const rcRecipientName = document.getElementById('rcRecipientName');
  const rcRecipientPhone = document.getElementById('rcRecipientPhone');
  const rcFullAddress = document.getElementById('rcFullAddress');
  const rcVillageDistrict = document.getElementById('rcVillageDistrict');
  const rcCityPostal = document.getElementById('rcCityPostal');

  const rcTagWrap = document.getElementById('rcTagWrap');
  const rcTag = document.getElementById('rcTag');

  const savedAddressesModal = document.getElementById('savedAddressesModal');
  const savedAddressesList = document.getElementById('savedAddressesList');
  const savedAddressesEmpty = document.getElementById('savedAddressesEmpty');
  const closeSavedAddressesModalBtn = document.getElementById('closeSavedAddressesModal');

  // hidden snapshot fields for submit (keep existing checkout logic)
  if(!document.getElementById('selectedAddressId')){
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = 'selectedAddressId';
    inp.id = 'selectedAddressId';
    form.appendChild(inp);
  }

  if(!document.getElementById('addressSnapshotJson')){
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = 'addressSnapshotJson';
    inp.id = 'addressSnapshotJson';
    form.appendChild(inp);
  }

  function parseAddressComposed(fullAddress){
    // format simpan di profile.js: `${fullAddress}, ${district}, ${village}, ${city} (${postalCode})`
    if(!fullAddress) return null;
    const s = String(fullAddress);
    const cityMatch = s.match(/,\s*([^,]+)\s*\(([^)]+)\)\s*$/);
    if(!cityMatch) return null;
    const city = cityMatch[1].trim();
    const postalCode = cityMatch[2].trim();
    const prefix = s.slice(0, cityMatch.index).trim(); // `${fullAddress}, ${district}, ${village}`
    const parts = prefix.split(',').map(x => x.trim());
    if(parts.length < 3) return null;
    const village = parts.pop();
    const district = parts.pop();
    const baseAddress = parts.join(', ');
    return { baseAddress, district, village, city, postalCode };
  }

  function setManualFieldValuesFromSnapshot(addr){
    // ini tetap dipakai untuk submit validation (form manual area sekarang selalu ada input yang required)
    const parsed = parseAddressComposed(addr.fullAddress);

    // Requirement: saat pilih alamat di modal, Nama Penerima diisi dengan Nama Alamat (namaAlamat).
    // fallback ke recipientName/akun jika data namaAlamat kosong.
    const recipientName = addr.namaAlamat || addr.recipientName || (customer ? customer.name : '');
    const recipientPhone = addr.recipientPhone || (customer ? customer.phone || '' : '');

    const fullNameHidden = document.getElementById('fullName');
    const phoneHidden = document.getElementById('phone');
    const addressHidden = document.getElementById('address');
    const cityHidden = document.getElementById('city');
    const districtHidden = document.getElementById('district');
    const villageHidden = document.getElementById('village');
    const postalHidden = document.getElementById('postalCode');
    const tagHidden = document.getElementById('tag');

    if(fullNameHidden) fullNameHidden.value = recipientName;
    if(phoneHidden) phoneHidden.value = recipientPhone;
    if(addressHidden) addressHidden.value = parsed ? parsed.baseAddress : (addr.fullAddress || '');
    if(cityHidden) cityHidden.value = parsed?.city || '';
    if(districtHidden) districtHidden.value = parsed?.district || '';
    if(villageHidden) villageHidden.value = parsed?.village || '';
    if(postalHidden) postalHidden.value = parsed?.postalCode || '';
    if(tagHidden) tagHidden.value = addr.tag || '';
  }

  function setReceiverCard(addr, isPrimary){
    const parsed = parseAddressComposed(addr.fullAddress);
    const recipientName = addr.namaPenerima || addr.recipientName || (customer ? customer.name : '');
    const recipientPhone = addr.recipientPhone || (customer ? customer.phone || '' : '');

    // Tampilan sesuai permintaan:
    // - Nama Penerima : "Moi Moi Amoi" (tanpa tanda apapun)
    // - Nomor Telepon : tetap
    // - Alamat : 1 baris gabungan baseAddress + optional tag, lalu village/district/city/etc
    if(rcRecipientName) rcRecipientName.textContent = recipientName || '';
    if(rcRecipientPhone) rcRecipientPhone.textContent = recipientPhone || '-';

    const fullBase = parsed?.baseAddress || addr.fullAddress || '';
    const tagVal = addr.tag ? String(addr.tag).trim() : '';
    const parts = [];

    // baseAddress berisi: alamat lengkap, dll (sesuai parseAddressComposed)
    if(fullBase) parts.push(fullBase);

    // tag/patokan dimasukkan sebagai elemen kedua setelah baseAddress jika terisi
    if(tagVal) parts.push(tagVal);

    // Data wilayah (ikuti urutan contoh: Abusan, Jol, Kakarek, Manokwari, Indonesia, 1233455)
    // baseAddress sudah memuat district/village secara long line, jadi gunakan properti terpisah jika ada.
    if(parsed?.village) parts.push(parsed.village);
    if(parsed?.district) parts.push(parsed.district);
    const province = addr.province ? String(addr.province).trim() : '';
    if(province) parts.push(province);
    if(parsed?.city) parts.push(parsed.city);

    const country = addr.country ? String(addr.country).trim() : '';
    if(country) parts.push(country);

    const postal = parsed?.postalCode ? String(parsed.postalCode).trim() : '';
    if(postal) parts.push(postal);


    const composedLine = parts.filter(Boolean).join(', ');
    if(rcFullAddress) rcFullAddress.textContent = composedLine;

    // baris hidden yang tidak dipakai tampilan dimodernisasi tetap update
    if(rcVillageDistrict) rcVillageDistrict.textContent = [parsed?.village, parsed?.district].filter(Boolean).join(', ');
    if(rcCityPostal) rcCityPostal.textContent = [parsed?.city, parsed?.postalCode ? `(${parsed.postalCode})` : ''].filter(Boolean).join(', ');

    // Patokan: jika tidak terisi, biarkan kosong (jangan beri tanda '-')
    if(rcTagWrap && rcTag) {
      if(tagVal){
        rcTagWrap.hidden = false;
        rcTag.textContent = tagVal;
      } else {
        rcTagWrap.hidden = true;
        rcTag.textContent = '';
      }
    }

    if(receiverPrimaryBadge){
      receiverPrimaryBadge.hidden = !isPrimary;
    }

    // snapshot untuk historis order
    const selectedAddressIdEl = document.getElementById('selectedAddressId');
    if(selectedAddressIdEl) selectedAddressIdEl.value = addr.id;

    const snapshotEl = document.getElementById('addressSnapshotJson');
    if(snapshotEl){
      snapshotEl.value = JSON.stringify({
        id: addr.id,
        recipientName,
        recipientPhone,
        fullAddress: addr.fullAddress,
        tag: addr.tag || '',
        city: parsed?.city || '',
        district: parsed?.district || '',
        village: parsed?.village || '',
        postalCode: parsed?.postalCode || '',
        namaAlamat: addr.namaAlamat || ''
      });
    }

    // isi hidden/manual inputs agar submit bisa lolos
    setManualFieldValuesFromSnapshot(addr);

    // pastikan area manual tetap tersembunyi untuk login
    if(receiverManualArea) receiverManualArea.hidden = true;
    if(receiverLoginCardArea) receiverLoginCardArea.hidden = false;
  }

  function openSavedAddressesModal(){
    if(!savedAddressesModal) return;
    populateSavedAddressesList();
    savedAddressesModal.hidden = false;
    savedAddressesModal.classList.add('modal-open');
  }

  function closeSavedAddressesModal(){
    if(!savedAddressesModal) return;
    savedAddressesModal.hidden = true;
    savedAddressesModal.classList.remove('modal-open');
  }

  let __bbAddressesCache = [];

  function populateSavedAddressesList(){
    const addresses = getAddresses().filter(a => session && session.role === 'customer' && a.userId === session.userId);
    __bbAddressesCache = addresses;

    if(!savedAddressesList) return;

    if(!addresses.length){
      if(savedAddressesEmpty) savedAddressesEmpty.hidden = false;
      savedAddressesList.innerHTML = '';
      return;
    }

    if(savedAddressesEmpty) savedAddressesEmpty.hidden = true;

    savedAddressesList.innerHTML = addresses.map(a => {
      const parsed = parseAddressComposed(a.fullAddress) || {};
      const village = parsed?.village || '';
      const district = parsed?.district || '';
      const city = parsed?.city || '';
      const postal = parsed?.postalCode ? `(${parsed.postalCode})` : '';
      const shortAddr = parsed?.baseAddress ? String(parsed.baseAddress).split(',')[0] : String(a.fullAddress || '').split(',')[0];
      const isPrimary = !!a.primary;
      const primaryLabel = isPrimary ? ' <span class="receiver-modal-primary">Alamat Utama</span>' : '';
      return `
        <div class="saved-address-item" role="button" tabindex="0" data-addr-id="${escapeHtml(a.id)}">
          <div class="saved-address-item-top">
            <div class="saved-address-item-name">${escapeHtml(a.recipientName || '')}${primaryLabel}</div>
            <div class="muted saved-address-item-phone">${escapeHtml(a.recipientPhone || '-')}</div>
          </div>
          <div class="saved-address-item-body">
            <div class="saved-address-item-line">${escapeHtml(shortAddr)}</div>
            <div class="muted saved-address-item-meta">${escapeHtml(village)}${village && district ? ', ' : ''}${escapeHtml(district)} • ${escapeHtml(city)} ${escapeHtml(postal)}</div>
          </div>
          <div class="saved-address-item-action"><i class="fa-solid fa-circle-check"></i></div>
        </div>
      `;
    }).join('');

    savedAddressesList.querySelectorAll('.saved-address-item').forEach(item => {
      const handler = () => {
        const id = item.getAttribute('data-addr-id');
        const addr = addresses.find(x => x.id === id);
        if(!addr) return;
        setReceiverCard(addr, !!addr.primary);
        closeSavedAddressesModal();
      };
      item.addEventListener('click', handler);
      item.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); handler(); }
      });
    });
  }

  function setupReceiverForCurrentSession(){
    const s = session;
    if(!s || s.role !== 'customer'){
      // non-login: manual visible
      if(receiverLoginCardArea) receiverLoginCardArea.hidden = true;
      if(receiverManualArea) receiverManualArea.hidden = false;
      return;
    }

    const addresses = getAddresses().filter(a => a.userId === s.userId);
    if(!addresses.length){
      if(receiverLoginCardArea) receiverLoginCardArea.hidden = true;
      if(receiverManualArea) receiverManualArea.hidden = false;
      // prefill basic fields from customer
      if(customer){
        const fullNameHidden = document.getElementById('fullName');
        const phoneHidden = document.getElementById('phone');
        if(fullNameHidden) fullNameHidden.value = customer.name || '';
        if(phoneHidden) phoneHidden.value = customer.phone || '';
      }
      return;
    }

    const primary = addresses.find(a => a.primary) || addresses[0];
    setReceiverCard(primary, !!primary.primary);

    if(addresses.length > 1){
      if(receiverCardChevron) receiverCardChevron.hidden = false;
      if(receiverAddressCard){
        const onClick = () => openSavedAddressesModal();
        receiverAddressCard.addEventListener('click', onClick);
        receiverAddressCard.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onClick(); }
        });
      }
    } else {
      if(receiverCardChevron) receiverCardChevron.hidden = true;
    }
  }

  // bind modal close
  if(closeSavedAddressesModalBtn && !closeSavedAddressesModalBtn.dataset.bound){
    closeSavedAddressesModalBtn.dataset.bound = '1';
    closeSavedAddressesModalBtn.addEventListener('click', closeSavedAddressesModal);
  }

  // backdrop close for saved addresses modal
  const modalBackdrop = document.getElementById('modalBackdrop');
  if(modalBackdrop && !modalBackdrop.dataset.savedAddrBackdropBound){
    modalBackdrop.dataset.savedAddrBackdropBound = '1';
    modalBackdrop.addEventListener('click', () => {
      if(savedAddressesModal && !savedAddressesModal.hidden) closeSavedAddressesModal();
    });
  }


  // Use existing session var already defined
  setupReceiverForCurrentSession();


  const PAYMENT_METHOD_DEFINITIONS = {
    qris: {
      title: 'QRIS',
      subtitle: 'Scan QR Code dengan aplikasi dompet digital Anda.',
      icon: '<i class="fa-solid fa-qrcode"></i>',
      type: 'qris',
      note: 'Tampilkan kode ini di aplikasi pembayaran untuk menyelesaikan transaksi.'
    },
    va_bca: {
      title: 'Virtual Account (BCA)',
      subtitle: 'Transfer via BCA Virtual Account.',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      type: 'va',
      bankName: 'BCA',
      account: '700123456789',
      note: 'Salin nomor VA dan gunakan pada menu transfer Virtual Account di aplikasi BCA.'
    },
    va_mandiri: {
      title: 'Virtual Account (Mandiri)',
      subtitle: 'Transfer via Mandiri Virtual Account.',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      type: 'va',
      bankName: 'Mandiri',
      account: '700987654321',
      note: 'Salin nomor VA dan gunakan pada menu transfer Virtual Account di aplikasi Mandiri.'
    },
    va_bri: {
      title: 'Virtual Account (BRI)',
      subtitle: 'Transfer via BRI Virtual Account.',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      type: 'va',
      bankName: 'BRI',
      account: '700321654987',
      note: 'Salin nomor VA dan gunakan pada menu transfer Virtual Account di aplikasi BRI.'
    },
    va_bni: {
      title: 'Virtual Account (BNI)',
      subtitle: 'Transfer via BNI Virtual Account.',
      icon: '<i class="fa-solid fa-building-columns"></i>',
      type: 'va',
      bankName: 'BNI',
      account: '700456789123',
      note: 'Salin nomor VA dan gunakan pada menu transfer Virtual Account di aplikasi BNI.'
    },
    seabank: {
      title: 'Bank Digital (SeaBank)',
      subtitle: 'Pembayaran ke rekening SeaBank.',
      icon: '<i class="fa-solid fa-piggy-bank"></i>',
      type: 'seabank',
      account: '1234567890123456',
      note: 'Gunakan nomor rekening ini saat melakukan transfer ke SeaBank.'
    },
    e_gopay: {
      title: 'E-Wallet (GoPay)',
      subtitle: 'Bayar melalui GoPay.',
      icon: '<i class="fa-solid fa-wallet"></i>',
      type: 'e_wallet',
      walletName: 'GoPay',
      account: '0812-3456-7890',
      note: 'Salin nomor tujuan pembayaran untuk digunakan pada aplikasi GoPay.'
    },
    e_dana: {
      title: 'E-Wallet (DANA)',
      subtitle: 'Bayar melalui DANA.',
      icon: '<i class="fa-solid fa-wallet"></i>',
      type: 'e_wallet',
      walletName: 'DANA',
      account: '0812-3456-7890',
      note: 'Salin nomor tujuan pembayaran untuk digunakan pada aplikasi DANA.'
    },
    e_ovo: {
      title: 'E-Wallet (OVO)',
      subtitle: 'Bayar melalui OVO.',
      icon: '<i class="fa-solid fa-wallet"></i>',
      type: 'e_wallet',
      walletName: 'OVO',
      account: '0812-3456-7890',
      note: 'Salin nomor tujuan pembayaran untuk digunakan pada aplikasi OVO.'
    }
  };

  function renderPaymentDetailCard(method){
    const payment = PAYMENT_METHOD_DEFINITIONS[method] || PAYMENT_METHOD_DEFINITIONS.qris;
    const buildRow = (label, value) => `
      <div class="payment-info-row">
        <div class="payment-info-label">${label}</div>
        <div class="payment-info-value">${value}</div>
      </div>
    `;

    let bodyHtml = '';
    if(payment.type === 'qris'){
      bodyHtml = `
        <div class="payment-qr"></div>
        ${buildRow('Instruksi', payment.note)}
      `;
    } else if(payment.type === 'va'){
      bodyHtml = `
        ${buildRow('Bank', payment.bankName)}
        ${buildRow('Nomor VA', payment.account)}
        <div class="form-actions" style="justify-content:flex-end; margin-top: 12px;">
          <button class="btn btn-ghost copy-btn" type="button" data-copy-text="${payment.account}">Salin Nomor</button>
        </div>
        <div class="payment-copy-note">${payment.note}</div>
      `;
    } else if(payment.type === 'seabank'){
      bodyHtml = `
        ${buildRow('Nama Bank', 'SeaBank')}
        ${buildRow('Nomor Rekening', payment.account)}
        <div class="form-actions" style="justify-content:flex-end; margin-top: 12px;">
          <button class="btn btn-ghost copy-btn" type="button" data-copy-text="${payment.account}">Salin Rekening</button>
        </div>
        <div class="payment-copy-note">${payment.note}</div>
      `;
    } else {
      bodyHtml = `
        ${buildRow('Dompet Digital', payment.walletName)}
        ${buildRow('Nomor Tujuan', payment.account)}
        <div class="form-actions" style="justify-content:flex-end; margin-top: 12px;">
          <button class="btn btn-ghost copy-btn" type="button" data-copy-text="${payment.account}">Salin Nomor</button>
        </div>
        <div class="payment-copy-note">${payment.note}</div>
      `;
    }

    return `
      <article class="payment-info-card">
        <div class="payment-info-header">
          <div class="payment-info-icon">${payment.icon}</div>
          <div>
            <div class="payment-info-title">${payment.title}</div>
            <div class="muted">${payment.subtitle}</div>
          </div>
        </div>
        ${bodyHtml}
      </article>
    `;
  }

  function updatePaymentDetails(method){
    currentPayment = method;
    const paymentDetails = document.getElementById('paymentDetails');
    if(!paymentDetails) return;
    paymentDetails.innerHTML = renderPaymentDetailCard(method);
    const card = paymentDetails.querySelector('.payment-info-card');
    if(card){
      requestAnimationFrame(() => card.classList.add('active'));
    }
    paymentDetails.querySelectorAll('[data-copy-text]').forEach(button => {
      button.addEventListener('click', () => {
        const text = button.getAttribute('data-copy-text') || '';
        if(!text) return;
        navigator.clipboard?.writeText(text).then(() => {
          button.textContent = 'Tersalin';
          window.setTimeout(() => { button.textContent = button.getAttribute('data-copy-text') ? button.textContent = 'Salin Nomor' : button.textContent; }, 1400);
        }).catch(() => {
          window.prompt('Salin secara manual:', text);
        });
      });
    });
  }

  function updateSummary(){
    const { items, sub, discount, shipping, total, shippingInfo, voucher } = calcCartTotals({ shippingId: currentShipping, voucherCode: currentVoucher });
    if(sumItems) sumItems.textContent = String(items);
    if(sumSubtotal) sumSubtotal.textContent = formatRupiah(sub);
    if(sumDiscount) sumDiscount.textContent = discount ? ('-' + formatRupiah(discount).replace('Rp ','Rp ')) : formatRupiah(0);
    if(sumShipping) sumShipping.textContent = formatRupiah(shipping);
    if(sumEta) sumEta.textContent = shippingInfo ? shippingInfo.eta : '-';
    if(sumTotal) sumTotal.textContent = formatRupiah(total);
    if(voucherCurrent){
      voucherCurrent.textContent = voucher ? `Voucher aktif: ${voucher.code} — ${voucher.label}` : 'Belum ada voucher aktif. Masukkan kode atau pilih voucher di daftar.';
    }
    if(voucherHint){
      voucherHint.textContent = voucher ? `Voucher ${voucher.code} berhasil diterapkan.` : 'Voucher akan berlaku ketika syarat terpenuhi.';
      voucherHint.style.color = voucher ? '#1F7A4D' : '';
    }
  }

  function applyVoucher(code){
    const voucher = getVoucher(code);
    currentVoucher = '';
    if(!voucher){
      if(voucherHint){ voucherHint.textContent = 'Kode voucher tidak valid atau tidak tersedia.'; voucherHint.style.color = '#BE123C'; }
      updateSummary();
      return;
    }
    const { sub } = calcCartTotals({ shippingId: currentShipping, voucherCode: '' });
    if(sub < voucher.min){
      if(voucherHint){ voucherHint.textContent = `Syarat belum terpenuhi. Minimal belanja ${formatRupiah(voucher.min)}.`; voucherHint.style.color = '#BE123C'; }
      updateSummary();
      return;
    }
    currentVoucher = voucher.code;
    if(voucherHint){ voucherHint.textContent = `Voucher ${voucher.code} diterapkan.`; voucherHint.style.color = '#1F7A4D'; }
    updateSummary();
  }

  function populateVoucherModal(){
    if(!voucherList) return;
    voucherList.innerHTML = VOUCHERS.map(v => `
      <div class="voucher-card">
        <div>
          <strong>${escapeHtml(v.code)}</strong>
          <div class="muted">${escapeHtml(v.label)}</div>
        </div>
        <button class="btn btn-primary btn-mini" type="button" data-voucher="${escapeHtml(v.code)}">Pilih</button>
      </div>
    `).join('');
    voucherList.querySelectorAll('button[data-voucher]').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-voucher');
        if(voucherCodeInput) voucherCodeInput.value = code;
        applyVoucher(code);
        closeVoucherModal();
      });
    });
  }

  function openVoucherModalFn(){
    const modal = document.getElementById('voucherModal');
    if(!modal) return;
    modal.hidden = false;
    modal.classList.add('modal-open');
    populateVoucherModal();
  }

  function closeVoucherModal(){
    const modal = document.getElementById('voucherModal');
    if(!modal) return;
    modal.hidden = true;
    modal.classList.remove('modal-open');
  }

  let nuraPayInterval = null;
  let isNuraPayFinalizing = false;

  function formatCountdown(seconds){
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function mapToOrderPaymentMethod(value){
    if(value === 'qris') return 'qris';
    if(value === 'seabank') return 'bank_transfer';
    if(value && value.startsWith('va_')) return 'bank_transfer';
    if(value && value.startsWith('e_')) return 'e_wallet';
    return 'bank_transfer';
  }

  function renderNuraPayMethodDetail(method){
    const payment = PAYMENT_METHOD_DEFINITIONS[method] || { title: method, type: 'va', account: '-', note: '' };
    if(payment.type === 'qris'){
      return `
        <div class="gateway-qr"></div>
        <div class="nura-pay-note">Scan kode QRIS dengan aplikasi dompet digital Anda untuk menyelesaikan pembayaran.</div>
      `;
    }
    if(payment.type === 'va' || payment.type === 'seabank'){
      const bankLabel = payment.type === 'seabank' ? 'SeaBank' : payment.bankName;
      const numberLabel = payment.type === 'seabank' ? 'Nomor Rekening' : 'Nomor VA';
      return `
        <div class="gateway-row"><div class="gateway-label">Bank / Metode</div><div class="gateway-value">${bankLabel}</div></div>
        <div class="gateway-row"><div class="gateway-label">${numberLabel}</div><div class="gateway-value">${payment.account}</div></div>
        <div class="nura-pay-note">${payment.note}</div>
      `;
    }
    return `
      <div class="gateway-row"><div class="gateway-label">Dompet Digital</div><div class="gateway-value">${payment.walletName || payment.title}</div></div>
      <div class="gateway-row"><div class="gateway-label">Nomor Tujuan</div><div class="gateway-value">${payment.account}</div></div>
      <div class="nura-pay-note">${payment.note}</div>
    `;
  }

  function openNuraPayModal(context){
    pendingCheckoutContext = context;
    const backdrop = document.getElementById('nuraPayModalBackdrop');
    const modal = document.getElementById('nuraPayModal');
    const detail = document.getElementById('nuraPaymentDetail');
    const invoiceId = modal?.querySelector('.nura-invoice-id');
    const totalEl = modal?.querySelector('.nura-total');
    const methodEl = modal?.querySelector('.nura-method');
    const countdownEl = modal?.querySelector('.nura-countdown');
    const statusEl = modal?.querySelector('.nura-pay-status-pill');
    const noticeEl = document.getElementById('nuraPayNotice');
    if(!modal || !backdrop || !detail || !invoiceId || !totalEl || !methodEl || !countdownEl || !statusEl || !noticeEl) return;

    invoiceId.textContent = context.invoice;
    totalEl.textContent = formatRupiah(context.total);
    methodEl.textContent = context.paymentTitle;
    countdownEl.textContent = formatCountdown(context.countdownSeconds);
    statusEl.textContent = 'Menunggu Pembayaran';
    statusEl.style.color = '#0d4b80';
    detail.innerHTML = renderNuraPayMethodDetail(context.paymentKey);
    noticeEl.textContent = 'Silakan selesaikan pembayaran melalui instruksi di atas.';
    noticeEl.classList.remove('nura-pay-notice--success');

    if(backdrop) backdrop.hidden = false;
    modal.hidden = false;
    modal.classList.add('modal-open');

    if(nuraPayInterval) clearInterval(nuraPayInterval);
    nuraPayInterval = window.setInterval(() => {
      context.countdownSeconds -= 1;
      countdownEl.textContent = formatCountdown(Math.max(0, context.countdownSeconds));
      if(context.countdownSeconds <= 0){
        clearInterval(nuraPayInterval);
        statusEl.textContent = 'Waktu Pembayaran Habis';
        statusEl.style.color = '#be123c';
        noticeEl.textContent = 'Pembayaran tidak terselesaikan. Silakan coba lagi.';
      }
    }, 1000);
  }

  function closeNuraPayModal(){
    const backdrop = document.getElementById('nuraPayModalBackdrop');
    const modal = document.getElementById('nuraPayModal');
    if(nuraPayInterval){ clearInterval(nuraPayInterval); nuraPayInterval = null; }
    if(backdrop) backdrop.hidden = true;
    if(modal){ modal.hidden = true; modal.classList.remove('modal-open'); }
  }

  if(openVoucherModal){
    openVoucherModal.addEventListener('click', openVoucherModalFn);
  }

  const nuraPayCancelBtn = document.getElementById('nuraPayCancelBtn');
  const nuraPayConfirmBtn = document.getElementById('nuraPayConfirmBtn');
  const nuraPayCloseBtn = document.getElementById('closeNuraPayModal');
  const nuraPayNotice = document.getElementById('nuraPayNotice');

  if(nuraPayCancelBtn && !nuraPayCancelBtn.dataset.bound){
    nuraPayCancelBtn.dataset.bound = '1';
    nuraPayCancelBtn.addEventListener('click', () => {
      closeNuraPayModal();
    });
  }

  if(nuraPayCloseBtn && !nuraPayCloseBtn.dataset.bound){
    nuraPayCloseBtn.dataset.bound = '1';
    nuraPayCloseBtn.addEventListener('click', closeNuraPayModal);
  }

  if(nuraPayConfirmBtn && !nuraPayConfirmBtn.dataset.bound){
    nuraPayConfirmBtn.dataset.bound = '1';
    nuraPayConfirmBtn.addEventListener('click', () => {
      const button = nuraPayConfirmBtn;
      const cancelBtn = nuraPayCancelBtn;
      button.disabled = true;
      cancelBtn && (cancelBtn.disabled = true);
      button.textContent = 'Memproses...';
      if(nuraPayNotice){ nuraPayNotice.textContent = 'Memverifikasi pembayaran...'; nuraPayNotice.classList.remove('nura-pay-notice--success'); }
      window.setTimeout(() => {
        if(nuraPayNotice){ nuraPayNotice.textContent = 'Pembayaran Berhasil'; nuraPayNotice.classList.add('nura-pay-notice--success'); }
        button.textContent = 'Berhasil';
        isNuraPayFinalizing = true;
        window.setTimeout(() => {
          closeNuraPayModal();
          form.requestSubmit();
        }, 1000);
      }, 2300);
    });
  }

  if(shippingGrid){
    shippingGrid.querySelectorAll('input[name="shippingOption"]').forEach(input => {
      input.addEventListener('change', () => {
        currentShipping = input.value;
        updateSummary();
      });
    });
  }

  if(applyVoucherBtn){
    applyVoucherBtn.addEventListener('click', () => {
      applyVoucher(voucherCodeInput?.value || '');
    });
  }

  if(voucherCodeInput){
    voucherCodeInput.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
        e.preventDefault();
        applyVoucher(voucherCodeInput.value);
      }
    });
  }

  if(openVoucherModal){
    openVoucherModal.addEventListener('click', openVoucherModalFn);
  }

  const modalClose = document.getElementById('closeVoucherModal');
  const modalBackdrop2 = document.getElementById('voucherModalBackdrop');


  if(modalClose){ modalClose.addEventListener('click', closeVoucherModal); }
  if(modalBackdrop){ modalBackdrop.addEventListener('click', closeVoucherModal); }

  if(paymentMethodSelect){
    paymentMethodSelect.addEventListener('change', () => {
      updatePaymentDetails(paymentMethodSelect.value);
    });
  }

  updatePaymentDetails(currentPayment);
  updateSummary();

  if(typeof renderCheckoutProducts === 'function') renderCheckoutProducts();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const alert = document.getElementById('checkoutAlert');
    alert?.classList.remove('alert--success','alert--danger');

    if(!isLoggedIn()){
      if(alert){ alert.textContent='Silakan login sebagai customer untuk membuat pesanan.'; alert.className='alert alert--danger'; alert.hidden=false; }
      return;
    }

    const fd = new FormData(form);
    const fullName = String(fd.get('fullName')||'').trim();
    const phone = String(fd.get('phone')||'').trim();
    const address = String(fd.get('address')||'').trim();
    const city = String(fd.get('city')||'').trim();
    const postalCode = String(fd.get('postalCode')||'').trim();
    const selectedAddressId = String(fd.get('selectedAddressId')||'').trim();
    const snapshotRaw = String(fd.get('addressSnapshotJson')||'');
    const addressSnapshot = snapshotRaw ? safeJSONParse(snapshotRaw, null) : null;

    const paymentMethodRaw = form.querySelector('select[name="paymentMethod"]')?.value || currentPayment;
    const shippingOption = form.querySelector('input[name="shippingOption"]:checked')?.value || currentShipping;
    const voucherCode = currentVoucher;

    if(!fullName || !phone || !address || !city || !postalCode){
      if(alert){ alert.textContent='Mohon lengkapi data pengiriman.'; alert.className='alert alert--danger'; alert.hidden=false; }
      return;
    }

    const { sub, discount, shipping, total } = calcCartTotals({ shippingId: shippingOption, voucherCode });
    const orderId = 'ECOS-' + Math.random().toString(16).slice(2,6).toUpperCase();

    if(!isNuraPayFinalizing){
      const paymentDef = PAYMENT_METHOD_DEFINITIONS[paymentMethodRaw] || { title: paymentMethodRaw };
      openNuraPayModal({
        invoice: orderId,
        total,
        paymentTitle: paymentDef.title || paymentMethodRaw,
        paymentKey: paymentMethodRaw,
        countdownSeconds: 15 * 60
      });
      return;
    }

    // proceed with real checkout after NuraPay confirmation
    const items = getCart().map(it => {
      const p = getProductById(it.productId);
      return { productId: it.productId, name: p?.name, price: p?.price, qty: it.qty };
    });

    const composedAddress = address && city ? `${address}, ${city} (${postalCode})` : `${address}, ${city} (${postalCode})`;
    const orderAddressSnapshot = addressSnapshot || {
      id: selectedAddressId || '',
      recipientName: fullName,
      recipientPhone: phone,
      fullAddress: address,
      tag: '',
      city,
      district: '',
      village: '',
      postalCode
    };

    const products = getProducts();
    items.forEach(line => {
      const p = products.find(x => x.id === line.productId);
      if(p){ p.stock = Math.max(0, (p.stock||0) - line.qty); }
    });
    localStorage.setItem(LS.PRODUCTS, JSON.stringify(products));

    const session = getSession();
    const orders = getOrders();
    const now = new Date();
    orders.push({
      id: orderId,
      userId: session.userId,
      userEmail: session.email,
      createdAt: now.toISOString(),
      items,
      sub, discount, shipping, total,
      status: 'Diproses',
      address: composedAddress,
      addressSnapshot: orderAddressSnapshot,
      selectedAddressId,
      paymentMethod: mapToOrderPaymentMethod(paymentMethodRaw)
    });

    setOrders(orders);
    localStorage.setItem(LS.LAST_SUCCESS, JSON.stringify(orders[orders.length-1]));
    setCart([]);
    setSession(session); // keep session
    isNuraPayFinalizing = false;

    window.location.href = 'checkout_success.html';
  });
}

function paymentLabel(method){
  switch(method){
    case 'bank_transfer': return 'Transfer Bank';
    case 'e_wallet': return 'E-Wallet';
    case 'qris': return 'QRIS';
    case 'cod': return 'COD';
    default: return method;
  }
}

function renderSuccessPage(){
  const order = safeJSONParse(localStorage.getItem(LS.LAST_SUCCESS), null);
  if(!order){
    // nothing
    return;
  }
  const orderId = document.getElementById('orderId');
  const orderDate = document.getElementById('orderDate');
  const orderTotal = document.getElementById('orderTotal');
  const orderAddress = document.getElementById('orderAddress');
  const orderPayment = document.getElementById('orderPayment');

  if(orderId) orderId.textContent = order.id;
  if(orderDate) orderDate.textContent = new Date(order.createdAt).toLocaleString('id-ID');
  if(orderTotal) orderTotal.textContent = formatRupiah(order.total);
  if(orderAddress){
    // gunakan snapshot jika tersedia
    if(order.addressSnapshot && order.addressSnapshot.fullAddress){
      // fullAddress sudah dalam bentuk lengkap; fallback ke address string
      orderAddress.textContent = order.addressSnapshot.fullAddress || order.address;
    } else {
      orderAddress.textContent = order.address;
    }
  }
  if(orderPayment) orderPayment.textContent = paymentLabel(order.paymentMethod);
}

// Invoice / struk modern untuk checkout_success.html
function renderSuccessInvoicePage(){
  const order = safeJSONParse(localStorage.getItem(LS.LAST_SUCCESS), null);
  if(!order) return;

  // guard: elemen utama harus ada
  const orderIdEl = document.getElementById('orderId');
  const invoiceProductsWrap = document.getElementById('invoiceProducts');
  if(!orderIdEl || !invoiceProductsWrap) return;

  // isi nomor pesanan & total di ringkasan (agar tetap konsisten meski renderSuccessPage() tidak jalan)
  if(orderIdEl) orderIdEl.textContent = order.id || '-';
  const orderTotalEl = document.getElementById('orderTotal');
  if(orderTotalEl) orderTotalEl.textContent = formatRupiah(order.total || 0);

  // status (jika order.status tidak ada, fallback Diproses)
  const statusText = (order.status && String(order.status).trim()) ? String(order.status) : 'Diproses';

  // mapping timeline (buat tampilan marketplace)
  const createdAt = order.createdAt ? new Date(order.createdAt) : null;
  const timelineSteps = [
    { key:'created', label:'Dibuat', icon:'fa-solid fa-file-invoice', timeEl:'tCreated', time: createdAt ? createdAt.toLocaleString('id-ID') : '-' },
    { key:'processing', label:'Diproses', icon:'fa-solid fa-hourglass-start', timeEl:'tProcessing', time:'-' },
    { key:'shipped', label:'Dikirim', icon:'fa-solid fa-truck', timeEl:'tShipped', time:'-' },
    { key:'completed', label:'Selesai', icon:'fa-solid fa-circle-check', timeEl:'tCompleted', time: createdAt ? new Date(createdAt.getTime() + 1000*60*10).toLocaleString('id-ID') : '-' }
  ];

  const mapStatusToActive = (st) => {
    const s = String(st).toLowerCase();
    if(s.includes('dikirim')) return 'shipped';
    if(s.includes('diproses') || s.includes('proses')) return 'processing';
    if(s.includes('selesai') || s.includes('selesa')) return 'completed';
    return 'completed';
  };

  const activeKey = mapStatusToActive(statusText);

  // aktifkan langkah timeline
  const stepsEls = document.querySelectorAll('.timeline-step[data-step]');
  stepsEls.forEach(el => {
    const k = el.getAttribute('data-step');
    el.classList.toggle('active', k === activeKey);
    el.classList.toggle('done', ['created','processing','shipped','completed'].indexOf(k) >= ['created','processing','shipped','completed'].indexOf(activeKey));
  });

  // isi waktu per step
  timelineSteps.forEach(st => {
    const timeEl = document.getElementById(st.timeEl);
    if(timeEl) timeEl.textContent = st.time;
  });

  const orderStatusTextEl = document.getElementById('orderStatusText');
  if(orderStatusTextEl) orderStatusTextEl.textContent = statusText;

  // order meta utama
  const orderDateEl = document.getElementById('orderDate');
  if(orderDateEl) orderDateEl.textContent = createdAt ? createdAt.toLocaleString('id-ID') : '-';

  // alamat snapshot
  const rcvNameEl = document.getElementById('rcvName');
  const rcvPhoneEl = document.getElementById('rcvPhone');
  const rcvAddressEl = document.getElementById('rcvAddress');

  const addrSnap = order.addressSnapshot || null;
  const addrFull = addrSnap && addrSnap.fullAddress ? addrSnap.fullAddress : order.address;
  if(rcvNameEl) rcvNameEl.textContent = (addrSnap && (addrSnap.recipientName || addrSnap.namaPenerima)) ? (addrSnap.recipientName || addrSnap.namaPenerima) : '-';
  if(rcvPhoneEl) rcvPhoneEl.textContent = (addrSnap && addrSnap.recipientPhone) ? addrSnap.recipientPhone : '-';
  if(rcvAddressEl) rcvAddressEl.textContent = addrFull || '-';

  // produk
  const items = Array.isArray(order.items) ? order.items : [];
  const countEl = document.getElementById('productsCount');
  if(countEl) countEl.textContent = `${items.reduce((acc, it) => acc + (Number(it.qty)||0), 0)} item`;

  const productsHTML = items.map(it => {
    const p = getProductById(it.productId);
    const img = p?.img || '';
    const name = it.name || p?.name || '-';
    const price = Number(it.price || p?.price || 0);
    const qty = Number(it.qty || 0);
    const subtotal = price * qty;

    return `
      <div class="invoice-product" data-product-id="${escapeHtml(it.productId || '')}">
        <div class="invoice-product-img-wrap">
          <img class="invoice-product-img" src="${img}" alt="${escapeHtml(name)}" onerror="this.style.display='none'" />
        </div>
        <div class="invoice-product-body">
          <div class="invoice-product-top">
            <div class="invoice-product-name">${escapeHtml(name)}</div>
            <div class="invoice-product-qty">x ${qty}</div>
          </div>
          <div class="invoice-product-price">${formatRupiah(price)} • <span class="muted">Subtotal</span> <b>${formatRupiah(subtotal)}</b></div>
        </div>
      </div>
    `;
  }).join('');

  invoiceProductsWrap.innerHTML = productsHTML || '<div class="muted">Tidak ada produk.</div>';

  // ringkasan biaya (lebih lengkap dari order langsung)
  const sumSubEl = document.getElementById('sumSub');
  const sumDiscEl = document.getElementById('sumDiscount');
  const sumShipEl = document.getElementById('sumShipping');
  const sumTotalEl = document.getElementById('sumTotal');

  if(sumSubEl) sumSubEl.textContent = formatRupiah(order.sub || 0);
  if(sumDiscEl) sumDiscEl.textContent = order.discount ? '-' + formatRupiah(order.discount).replace('Rp ','Rp ') : formatRupiah(0);
  if(sumShipEl) sumShipEl.textContent = formatRupiah(order.shipping || 0);
  if(sumTotalEl) sumTotalEl.textContent = formatRupiah(order.total || 0);

  // metode pembayaran
  const payMethodEl = document.getElementById('metaPaymentMethod');
  const metaPay = document.getElementById('payMethod');
  const payTxt = paymentLabel(order.paymentMethod);
  if(payMethodEl) payMethodEl.textContent = payTxt;
  if(metaPay) metaPay.textContent = payTxt;

  // metode pengiriman (gunakan order.shipping sebagai biaya, eta jika ada di order.addressSnapshot? tidak ada, jadi fallback)
  const shipMethodEl = document.getElementById('shipMethod');
  const shipEtaEl = document.getElementById('shipEta');
  if(shipMethodEl) shipMethodEl.textContent = order.shipping ? 'Pengiriman' : '-';
  if(shipEtaEl) shipEtaEl.textContent = '-';

  // meta tambahan
  const metaOrderIdEl = document.getElementById('metaOrderId');
  const metaOrderDateEl = document.getElementById('metaOrderDate');
  const metaOrderStatusEl = document.getElementById('metaOrderStatus');

  if(metaOrderIdEl) metaOrderIdEl.textContent = `#${order.id}`;
  if(metaOrderDateEl) metaOrderDateEl.textContent = createdAt ? createdAt.toLocaleDateString('id-ID') : '-';
  if(metaOrderStatusEl) metaOrderStatusEl.textContent = statusText;
}




function renderProfile(){
  const s = getSession();
  const customer = (s && s.role==='customer') ? getCustomers().find(c => c.id===s.userId) : null;
  if(!customer) return;

  document.getElementById('profileEmail') && (document.getElementById('profileEmail').textContent = customer.email);
  document.getElementById('profileName') && (document.getElementById('profileName').textContent = customer.name);
  document.getElementById('profilePhone') && (document.getElementById('profilePhone').textContent = customer.phone || '-');

  const orders = getOrders().filter(o => o.userId === customer.id);
  const wrap = document.getElementById('orderHistory');
  const empty = document.getElementById('historyEmpty');

  if(!wrap) return;

  wrap.innerHTML='';
  if(!orders.length){
    if(empty) empty.hidden = false;
    return;
  }
  if(empty) empty.hidden = true;

  // simple latest 5
  orders.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5).forEach((o, idx) => {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.style.gridTemplateColumns = '1fr 1.1fr .9fr .8fr';
    row.innerHTML = `
      <div style="font-weight:1000">${idx+1}</div>
      <div class="muted" style="font-weight:900">${new Date(o.createdAt).toLocaleDateString('id-ID')}</div>
      <div style="font-weight:1000">${formatRupiah(o.total)}</div>
      <div><span class="chip" style="background: rgba(245,158,11,.12); border-color: rgba(245,158,11,.30); color:#92400E"><i class="fa-solid fa-hourglass-start"></i> Diproses</span></div>
    `;
    wrap.appendChild(row);
  });
}

function initCustomerProfile(){
  // Backward compatible stub
}

// ------------------------------
// Pengaturan & Privasi (profile.html)
// ------------------------------

const PAYMENT_PROVIDERS = [
  { key:'gopay', label:'GoPay', icon:'fa-brands fa-gofore', fallbackIcon:'fa-wallet' },
  { key:'dana', label:'DANA', icon:'fa-solid fa-bolt', fallbackIcon:'fa-wallet' },
  { key:'ovo', label:'OVO', icon:'fa-solid fa-circle-nodes', fallbackIcon:'fa-wallet' },
  { key:'seabank', label:'SeaBank', icon:'fa-solid fa-building-columns', fallbackIcon:'fa-bank' },
  { key:'mandiri', label:'Bank Mandiri', icon:'fa-solid fa-landmark', fallbackIcon:'fa-bank' },
  { key:'bca', label:'Bank BCA', icon:'fa-solid fa-fingerprint', fallbackIcon:'fa-bank' },
  { key:'bri', label:'Bank BRI', icon:'fa-solid fa-briefcase', fallbackIcon:'fa-bank' },
  { key:'bni', label:'Bank BNI', icon:'fa-solid fa-building', fallbackIcon:'fa-bank' }
];

const DEFAULT_PAYMENT_STATE = () => {
  const map = {};
  PAYMENT_PROVIDERS.forEach(p => map[p.key] = { connected:false, accountName:'', accountNumber:'' });
  return map;
};

function getPaymentState(){
  const raw = localStorage.getItem(LS.PAYMENT_METHODS);
  const parsed = safeJSONParse(raw, null);
  if(!parsed || typeof parsed !== 'object') return DEFAULT_PAYMENT_STATE();
  const merged = DEFAULT_PAYMENT_STATE();
  Object.keys(merged).forEach(k => {
    if(parsed[k] && typeof parsed[k] === 'object') merged[k] = { ...merged[k], ...parsed[k] };
  });
  return merged;
}
function setPaymentState(state){
  localStorage.setItem(LS.PAYMENT_METHODS, JSON.stringify(state));
}

function getAddresses(){
  const raw = localStorage.getItem(LS.ADDRESSES);
  const parsed = safeJSONParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}
function setAddresses(list){
  localStorage.setItem(LS.ADDRESSES, JSON.stringify(Array.isArray(list)?list:[]));
}

function getAddressById(id){
  const list = getAddresses();
  return list.find(a => a.id === id) || null;
}

function renderSettingsTab(tab){
  document.querySelectorAll('.settings-tab').forEach(sec => {
    const t = sec.getAttribute('data-tab');
    if(!t) return;
    sec.hidden = t !== tab;
    if(t === tab) sec.removeAttribute('hidden');
  });
}

function setSidebarActive(tab){
  document.querySelectorAll('.sidebar-item').forEach(btn => {
    const t = btn.getAttribute('data-tab');
    btn.classList.toggle('active', t === tab);
  });
}

function openModal(modalEl){
  const backdrop = document.getElementById('modalBackdrop');
  if(backdrop) backdrop.hidden = false;
  if(modalEl){ modalEl.hidden = false; modalEl.classList.add('modal-open'); }
}

function closeModal(modalEl){
  const backdrop = document.getElementById('modalBackdrop');
  if(backdrop) backdrop.hidden = true;
  if(modalEl){ modalEl.hidden = true; modalEl.classList.remove('modal-open'); }
}

function initSettingsPage(){
  if(!location.pathname.endsWith('profile.html')) return;
  const session = getSession();
  if(!session || session.role !== 'customer') return;

  // connect tabs
  const sidebar = document.querySelector('.sidebar-nav');
  if(sidebar){
    sidebar.addEventListener('click', (e) => {
      const btn = e.target.closest('.sidebar-item');
      if(!btn) return;
      const tab = btn.getAttribute('data-tab');
      if(!tab) return;
      setSidebarActive(tab);
      document.querySelectorAll('.settings-tab').forEach(sec => {
        const t = sec.getAttribute('data-tab');
        sec.hidden = t !== tab;
      });
      // lazy init tab-specific content
      if(tab === 'payment') renderPaymentTab();
      if(tab === 'addresses') renderAddressesTab();
      if(tab === 'orders') renderOrdersTab();
      if(tab === 'account') renderAccountTab();
      if(tab === 'security') renderSecurityTab();
    });
  }

  // backdrop click closes any open modal
  const backdrop = document.getElementById('modalBackdrop');
  if(backdrop){
    backdrop.addEventListener('click', () => {
      ['emailModal','passwordModal','paymentModal','addressModal','orderModal'].forEach(id => {
        const el = document.getElementById(id);
        if(el && !el.hidden) closeModal(el);
      });
    });
  }

  // default render for active tab (Akun)
  renderAccountTab();
  renderSecurityTab();
}

function getCurrentCustomer(){
  const s = getSession();
  if(!s || s.role !== 'customer') return null;
  return getCustomers().find(c => c.id === s.userId) || null;
}

function renderAccountTab(){
  const customer = getCurrentCustomer();
  if(!customer) return;

  const photoInput = document.getElementById('profilePhotoInput');
  const previewImg = document.getElementById('profilePhotoPreview');
  const placeholder = previewImg ? previewImg.parentElement.querySelector('.avatar-placeholder') : null;

  // hydrate form fields
  const nameInput = document.getElementById('profileNameInput');
  const phoneInput = document.getElementById('profilePhoneInput');
  if(nameInput) nameInput.value = customer.name || '';
  if(phoneInput) phoneInput.value = customer.phone || '';

  // photo preview via data url (optional)
  if(previewImg){
    if(customer.photoDataUrl){
      previewImg.hidden = false;
      previewImg.src = customer.photoDataUrl;
      if(placeholder) placeholder.hidden = true;
    } else {
      previewImg.hidden = true;
      if(previewImg) previewImg.removeAttribute('src');
      if(placeholder) placeholder.hidden = false;
    }
  }

  const changePhotoBtn = document.getElementById('changePhotoBtn');
  if(changePhotoBtn && photoInput && !changePhotoBtn.dataset.bound){
    changePhotoBtn.dataset.bound = '1';
    changePhotoBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files && photoInput.files[0];
      if(!file) return;
      if(previewImg) previewImg.hidden = false;
      if(placeholder) placeholder.hidden = true;

      const reader = new FileReader();
      reader.onload = () => {
        if(previewImg) previewImg.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  const saveBtn = document.getElementById('saveAccountBtn');
  if(saveBtn && !saveBtn.dataset.bound){
    saveBtn.dataset.bound = '1';
    saveBtn.addEventListener('click', async () => {
      const current = getCurrentCustomer();
      if(!current) return;

      const nameInput = document.getElementById('profileNameInput');
      const phoneInput = document.getElementById('profilePhoneInput');
      const photoInput = document.getElementById('profilePhotoInput');
      const previewImg = document.getElementById('profilePhotoPreview');
      const feedback = document.getElementById('accountSaveFeedback');

      const name = String(nameInput?.value || '').trim();
      const phone = String(phoneInput?.value || '').trim();

      if(name.length < 2){
        if(feedback){ feedback.textContent = 'Nama minimal 2 karakter.'; feedback.style.color = '#BE123C'; }
        return;
      }
      if(phone && phone.replace(/[^0-9]/g,'').length < 8){
        if(feedback){ feedback.textContent = 'Nomor HP tidak valid.'; feedback.style.color = '#BE123C'; }
        return;
      }

      const customers = getCustomers();
      const idx = customers.findIndex(c => c.id === current.id);
      if(idx < 0) return;

      customers[idx] = { ...customers[idx], name, phone: phone || '' };

      // photo
      if(photoInput && photoInput.files && photoInput.files[0]){
        const file = photoInput.files[0];
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        });
        customers[idx].photoDataUrl = dataUrl;
      } else if(previewImg && !previewImg.hidden && previewImg.src && previewImg.src.startsWith('data:')){
        customers[idx].photoDataUrl = previewImg.src;
      }

      setCustomers(customers);

      // update session + navbar/profile without refresh
      const session = getSession();
      setSession({ ...session, name: name, email: session.email });

      if(feedback){ feedback.textContent = 'Perubahan tersimpan.'; feedback.style.color = '#1F7A4D'; }

      // re-render navbar + profile
      initUserMenu();
      renderProfile();
      renderAccountTab();
    });
  }
}

function renderSecurityTab(){
  const customer = getCurrentCustomer();
  if(!customer) return;

  const emailEl = document.getElementById('securityEmail');
  if(emailEl) emailEl.textContent = customer.email || '-';

  const openEmailBtn = document.getElementById('openEmailModal');
  const emailModal = document.getElementById('emailModal');
  const closeEmailBtn = document.getElementById('closeEmailModal');
  const cancelEmailBtn = document.getElementById('cancelEmailModal');
  const saveEmailBtn = document.getElementById('saveEmailBtn');
  const newEmailInput = document.getElementById('newEmailInput');
  const feedback = document.getElementById('emailFeedback');

  if(openEmailBtn && !openEmailBtn.dataset.bound){
    openEmailBtn.dataset.bound = '1';
    openEmailBtn.addEventListener('click', () => {
      if(newEmailInput) newEmailInput.value = '';
      if(feedback){ feedback.textContent=''; feedback.style.color=''; }
      openModal(emailModal);
    });
  }

  [closeEmailBtn, cancelEmailBtn].filter(Boolean).forEach(btn => {
    if(btn && !btn.dataset.bound){
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => closeModal(emailModal));
    }
  });

  if(saveEmailBtn && !saveEmailBtn.dataset.bound){
    saveEmailBtn.dataset.bound = '1';
    saveEmailBtn.addEventListener('click', () => {
      const val = String(newEmailInput?.value || '').trim().toLowerCase();
      if(!val || !val.includes('@')){
        if(feedback){ feedback.textContent='Email tidak valid.'; feedback.style.color='#BE123C'; }
        return;
      }
      const customers = getCustomers();
      if(customers.some(c => c.email === val && c.id !== customer.id)){
        if(feedback){ feedback.textContent='Email sudah digunakan.'; feedback.style.color='#BE123C'; }
        return;
      }
      const idx = customers.findIndex(c => c.id === customer.id);
      if(idx < 0) return;
      customers[idx].email = val;
      setCustomers(customers);

      const session = getSession();
      setSession({ ...session, email: val });

      if(feedback){ feedback.textContent='Email tersimpan.'; feedback.style.color='#1F7A4D'; }
      initUserMenu();
      renderProfile();
      closeModal(emailModal);
    });
  }

  // password
  const openPasswordBtn = document.getElementById('openPasswordModal');
  const passwordModal = document.getElementById('passwordModal');
  const closePasswordBtn = document.getElementById('closePasswordModal');
  const cancelPasswordBtn = document.getElementById('cancelPasswordModal');
  const savePasswordBtn = document.getElementById('savePasswordBtn');
  const currentPasswordInput = document.getElementById('currentPasswordInput');
  const newPasswordInput = document.getElementById('newPasswordInput');
  const confirmPasswordInput = document.getElementById('confirmPasswordInput');
  const passFeedback = document.getElementById('passwordFeedback');

  if(openPasswordBtn && !openPasswordBtn.dataset.bound){
    openPasswordBtn.dataset.bound = '1';
    openPasswordBtn.addEventListener('click', () => {
      if(currentPasswordInput) currentPasswordInput.value='';
      if(newPasswordInput) newPasswordInput.value='';
      if(confirmPasswordInput) confirmPasswordInput.value='';
      if(passFeedback){ passFeedback.textContent=''; passFeedback.style.color=''; }
      openModal(passwordModal);
    });
  }

  [closePasswordBtn, cancelPasswordBtn].filter(Boolean).forEach(btn => {
    if(btn && !btn.dataset.bound){
      btn.dataset.bound='1';
      btn.addEventListener('click', () => closeModal(passwordModal));
    }
  });

  if(savePasswordBtn && !savePasswordBtn.dataset.bound){
    savePasswordBtn.dataset.bound='1';
    savePasswordBtn.addEventListener('click', () => {
      const cur = String(currentPasswordInput?.value || '');
      const next = String(newPasswordInput?.value || '');
      const conf = String(confirmPasswordInput?.value || '');

      if(!cur){ if(passFeedback){passFeedback.textContent='Password saat ini wajib diisi.'; passFeedback.style.color='#BE123C';} return; }
      if(next.length < 6){ if(passFeedback){passFeedback.textContent='Password baru minimal 6 karakter.'; passFeedback.style.color='#BE123C';} return; }
      if(next !== conf){ if(passFeedback){passFeedback.textContent='Konfirmasi password tidak sama.'; passFeedback.style.color='#BE123C';} return; }

      const customers = getCustomers();
      const idx = customers.findIndex(c => c.id === customer.id);
      if(idx < 0) return;
      if(customers[idx].password !== cur){
        if(passFeedback){passFeedback.textContent='Password saat ini salah.'; passFeedback.style.color='#BE123C';}
        return;
      }

      customers[idx].password = next;
      setCustomers(customers);
      if(passFeedback){passFeedback.textContent='Password tersimpan.'; passFeedback.style.color='#1F7A4D';}
      closeModal(passwordModal);
    });
  }
}

function renderPaymentTab(){
  const wrap = document.getElementById('paymentMethodsList');
  if(!wrap) return;

  const state = getPaymentState();

  const methodsHTML = PAYMENT_PROVIDERS.map(p => {
    const s = state[p.key] || { connected:false };
    const connected = !!s.connected;
    return `
      <div class="payment-method-card" data-key="${p.key}">
        <div class="payment-method-left">
          <div class="payment-method-icon">
            <i class="fa-solid ${p.icon || p.fallbackIcon}"></i>
          </div>
          <div>
            <div class="payment-method-title">${p.label}</div>
            <div class="muted payment-method-status">${connected ? 'Terhubung' : 'Belum Terhubung'}</div>
          </div>
        </div>
        <button class="btn ${connected ? 'btn-soft' : 'btn-primary'} payment-toggle" type="button" data-action="${connected ? 'disconnect' : 'connect'}">
          ${connected ? 'Putuskan' : 'Hubungkan'}
        </button>
      </div>
    `;
  }).join('');

  wrap.innerHTML = `<div class="payment-methods-grid">${methodsHTML}</div>`;

  wrap.querySelectorAll('.payment-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-key]');
      if(!card) return;
      const key = card.getAttribute('data-key');
      if(!key) return;

      const current = getPaymentState();
      const connected = !!(current[key] && current[key].connected);

      if(connected){
        current[key] = { ...current[key], connected:false, accountName:'', accountNumber:'' };
      } else {
        // open modal
        const paymentModal = document.getElementById('paymentModal');
        const paymentAccountName = document.getElementById('paymentAccountName');
        const paymentAccountNumber = document.getElementById('paymentAccountNumber');
        const paymentFeedback = document.getElementById('paymentFeedback');
        const savePaymentBtn = document.getElementById('savePaymentBtn');

        if(paymentAccountName) paymentAccountName.value='';
        if(paymentAccountNumber) paymentAccountNumber.value='';
        if(paymentFeedback){ paymentFeedback.textContent=''; paymentFeedback.style.color=''; }

        // bind save for this key only once
        if(savePaymentBtn && !savePaymentBtn.dataset.bound){
          savePaymentBtn.dataset.bound='1';
          savePaymentBtn.addEventListener('click', () => {
            const name = String(paymentAccountName?.value || '').trim();
            const num = String(paymentAccountNumber?.value || '').trim();
            if(!name){ if(paymentFeedback){paymentFeedback.textContent='Nama akun wajib diisi.'; paymentFeedback.style.color='#BE123C';} return; }
            if(!num || num.replace(/[^0-9]/g,'').length < 6){ if(paymentFeedback){paymentFeedback.textContent='Nomor akun/telepon tidak valid.'; paymentFeedback.style.color='#BE123C';} return; }

            const state2 = getPaymentState();
            const targetKey = savePaymentBtn.dataset.targetKey;
            if(!targetKey) return;
            state2[targetKey] = { ...(state2[targetKey] || { connected:false }), connected:true, accountName:name, accountNumber:num };
            setPaymentState(state2);
            closeModal(paymentModal);
            renderPaymentTab();
          });
        }
        if(savePaymentBtn) savePaymentBtn.dataset.targetKey = key;

        openModal(paymentModal);
      }

      if(connected){
        setPaymentState(current);
        renderPaymentTab();
      }
    });
  });

  // payment modal close/bind
  const closePaymentBtn = document.getElementById('closePaymentModal');
  const cancelPaymentBtn = document.getElementById('cancelPaymentModal');
  const paymentModal = document.getElementById('paymentModal');
  [closePaymentBtn, cancelPaymentBtn].filter(Boolean).forEach(btn => {
    if(btn && !btn.dataset.bound){
      btn.dataset.bound='1';
      btn.addEventListener('click', () => closeModal(paymentModal));
    }
  });
}

function renderAddressesTab(){
  const listWrap = document.getElementById('addressList');
  const addBtn = document.getElementById('addAddressBtn');
  if(!listWrap) return;

  const customer = getCurrentCustomer();
  if(!customer) return;

  // Always recompute to reflect latest localStorage state
  const all = getAddresses().filter(a => a.userId === customer.id);

  const modal = document.getElementById('addressModal');
  const editModal = document.getElementById('editAddressModal');
  const confirmDeleteModal = document.getElementById('confirmDeleteAddressModal');

  function renderList(){
    if(!all.length){
      listWrap.innerHTML = `<div class="muted">Belum ada alamat tersimpan.</div>`;
      return;
    }

    const html = all.map(a => {
      const isPrimary = !!a.primary;
      const namaPenerima = String(a.recipientName || '').trim();

      // a.fullAddress is stored by CRUD as:
      // `${alamat lengkap}, ${district}, ${village}, ${city} (${postalCode})`
      // We'll keep it, but render it as ONE line and with parts in order requested.
      const full = String(a.fullAddress || '').trim();
      const parsed = parseAddressComposed(full) || {};

      const recipientPhone = String(a.recipientPhone || '-');
      const patokan = String(a.tag || '').trim();

      const alamatLengkapSatuKalimat = (() => {
        const base = parsed.baseAddress || '';
        const district = parsed.district || '';
        const village = parsed.village || '';
        const city = parsed.city || '';
        const province = String(a.province || '').trim();
        const country = String(a.country || '').trim();
        const postal = parsed.postalCode || '';

        const parts = [];
        // Format sesuai requirement:
        // Alamat Lengkap, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi, Negara, Kode Pos
        if(base) parts.push(base);
        if(village) parts.push(village);
        if(district) parts.push(district);
        if(city) parts.push(city);
        if(province) parts.push(province);
        if(country) parts.push(country);
        if(postal) parts.push(postal);

        return parts.filter(Boolean).join(', ');
      })();

      const patokanValue = patokan ? patokan : '-';
      const badgeUtama = isPrimary ? `<span class="address-badge-primary">Utama</span>` : '';

      return `
        <div class="address-card" data-id="${a.id}">
          <div class="address-card-header">
            <div class="address-card-header-left">
              <div class="address-card-recipient-row">
                <span class="address-card-recipient-name">${escapeHtml(namaPenerima || '-') }</span>
                ${badgeUtama}
              </div>
            </div>
            <div class="address-card-actions">
              <button class="icon-btn icon-btn--edit" type="button" title="Edit" data-action="edit" data-id="${a.id}">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="icon-btn icon-btn--delete" type="button" title="Hapus" data-action="delete" data-id="${a.id}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>

          <div class="address-card-phone">${escapeHtml(recipientPhone)}</div>

          <div class="address-card-body">
            <div class="address-card-address">${escapeHtml(alamatLengkapSatuKalimat || '-')}</div>

            <div class="address-card-tag">
              <div class="address-card-tag-label">Patokan</div>
              <div class="address-card-tag-value">${escapeHtml(patokanValue)}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    listWrap.innerHTML = html;
    return;


    listWrap.innerHTML = html;
  }

  function parseAddressComposed(fullAddress){
    if(!fullAddress) return null;
    const s = String(fullAddress);
    const cityMatch = s.match(/,\s*([^,]+)\s*\(([^)]+)\)\s*$/);
    if(!cityMatch) return null;
    const city = cityMatch[1].trim();
    const postalCode = cityMatch[2].trim();
    const prefix = s.slice(0, cityMatch.index).trim();
    const parts = prefix.split(',').map(x => x.trim());
    if(parts.length < 3) return null;
    const village = parts.pop();
    const district = parts.pop();
    const baseAddress = parts.join(', ');
    return { baseAddress, district, village, city, postalCode };
  }

  function parseForModal(fullAddress){
    // stored as `${alamat lengkap}, ${district}, ${village}, ${city} (${postalCode})`
    const parsed = parseAddressComposed(fullAddress);
    return parsed || { baseAddress: fullAddress || '', district:'', village:'', city:'', postalCode:'' };
  }

  function resetAddressForm(){
    const fullAddressInput = document.getElementById('fullAddressInput');
    const cityInput = document.getElementById('cityInput');
    const districtInput = document.getElementById('districtInput');
    const villageInput = document.getElementById('villageInput');
    const postalCodeInput = document.getElementById('postalCodeInput');
    const tagInput = document.getElementById('addressTagInput');
    const primaryCheckbox = document.getElementById('primaryAddressInput');

    const feedback = document.getElementById('addressFeedback');

    fullAddressInput && (fullAddressInput.value = '');
    cityInput && (cityInput.value = '');
    districtInput && (districtInput.value = '');
    villageInput && (villageInput.value = '');
    postalCodeInput && (postalCodeInput.value = '');
    tagInput && (tagInput.value = '');
    primaryCheckbox && (primaryCheckbox.checked = false);

    if(feedback){ feedback.textContent=''; feedback.style.color=''; }
  }

  function setFeedback(msg, type='danger'){
    const feedback = document.getElementById('addressFeedback');
    if(!feedback) return;
    feedback.textContent = msg;
    feedback.style.color = type === 'success' ? '#1F7A4D' : '#BE123C';
  }

  function setFeedbackEdit(msg, type='danger'){
    const fb = document.getElementById('editAddressFeedback');
    if(!fb) return;
    fb.textContent = msg;
    fb.style.color = type === 'success' ? '#1F7A4D' : '#BE123C';
  }

  function resetEditForm(){
    const ids = [
      'editAddressNameInput','editRecipientNameInput','editRecipientPhoneInput','editFullAddressInput',
      'editCityInput','editDistrictInput','editVillageInput','editPostalCodeInput','editPatokanInput',
      'editPrimaryAddressInput'
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      if(el.type === 'checkbox') el.checked = false;
      else el.value = '';
    });
    setFeedbackEdit('', 'danger');
  }

  // Base render
  renderList();

  // ---------- ADD modal bindings (existing) ----------
  const saveBtn = document.getElementById('saveAddressBtn');
  const cancelBtn = document.getElementById('cancelAddressModal');
  const closeBtnX = document.getElementById('closeAddressModal');

  if(modal && !modal.dataset.addressModalBound){
    modal.dataset.addressModalBound = '1';

    closeBtnX?.addEventListener('click', () => {
      closeModal(modal);
      resetAddressForm();
    });

    cancelBtn?.addEventListener('click', () => {
      closeModal(modal);
      resetAddressForm();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      if(modal.hidden) return;
      closeModal(modal);
      resetAddressForm();
    });

    const backdrop = document.getElementById('modalBackdrop');
    backdrop?.addEventListener('click', () => {
      if(modal.hidden) return;
      closeModal(modal);
      resetAddressForm();
    });
  }

  if(addBtn && !addBtn.dataset.bound){
    addBtn.dataset.bound='1';
    addBtn.addEventListener('click', () => {
      resetAddressForm();
      openModal(modal);
    });
  }

  if(saveBtn && !saveBtn.dataset.bound){
    saveBtn.dataset.bound='1';
    saveBtn.addEventListener('click', () => {
      const fullAddress = String(document.getElementById('fullAddressInput')?.value || '').trim();
      const city = String(document.getElementById('cityInput')?.value || '').trim();
      const district = String(document.getElementById('districtInput')?.value || '').trim();
      const village = String(document.getElementById('villageInput')?.value || '').trim();
      const postalCode = String(document.getElementById('postalCodeInput')?.value || '').trim();
      const addressName = String(document.getElementById('addressNameInput')?.value || '').trim();
      const tag = String(document.getElementById('addressTagInput')?.value || '').trim();
      const primary = !!document.getElementById('primaryAddressInput')?.checked;

      const recipientName = String(document.getElementById('addressRecipientNameInput')?.value || '').trim();
      const recipientPhone = String(document.getElementById('addressRecipientPhoneInput')?.value || '').trim();
      const province = String(document.getElementById('provinceInput')?.value || '').trim();
      const country = String(document.getElementById('countryInput')?.value || '').trim();

      const phoneDigits = recipientPhone.replace(/[^0-9]/g,'');
      const postalDigits = postalCode.replace(/[^0-9]/g,'');

      if(!addressName){ setFeedback('Nama Alamat wajib diisi.', 'danger'); return; }
      if(!recipientName){ setFeedback('Nama Lengkap Penerima wajib diisi.', 'danger'); return; }
      if(!recipientPhone || phoneDigits.length < 8){ setFeedback('Nomor Telepon penerima tidak valid.', 'danger'); return; }
      if(!fullAddress){ setFeedback('Alamat lengkap wajib diisi.', 'danger'); return; }
      if(!district){ setFeedback('Kecamatan wajib diisi.', 'danger'); return; }
      if(!village){ setFeedback('Kelurahan wajib diisi.', 'danger'); return; }
      if(!city){ setFeedback('Kota/Kabupaten wajib diisi.', 'danger'); return; }
      if(!province){ setFeedback('Provinsi wajib diisi.', 'danger'); return; }
      if(!country){ setFeedback('Negara wajib diisi.', 'danger'); return; }
      if(!postalDigits || postalDigits.length < 4){ setFeedback('Kode pos tidak valid.', 'danger'); return; }

      const composedFullAddress = `${fullAddress}, ${district}, ${village}, ${city} (${postalDigits})`;


      let addresses = getAddresses().filter(a => a.userId !== customer.id);
      const existingUser = getAddresses().filter(a => a.userId === customer.id);

      const newAddr = {
        id: uid('addr'),
        userId: customer.id,
        namaAlamat: addressName,
        recipientName,
        recipientPhone,
        fullAddress: composedFullAddress,
        province,
        country,
        tag,
        primary,
        createdAt: Date.now()
      };

      if(primary){
        existingUser.forEach(a => a.primary = false);
      } else if(!existingUser.length){
        newAddr.primary = true;
      }

      const finalList = [...existingUser, newAddr];
      addresses = [...addresses, ...finalList];
      setAddresses(addresses);

      setFeedback('Alamat berhasil ditambahkan', 'success');
      closeModal(modal);
      resetAddressForm();
      renderAddressesTab();
    });
  }

  // ---------- Edit modal bindings ----------
  if(editModal && !editModal.dataset.editModalBound){
    editModal.dataset.editModalBound = '1';

    const closeBtn = document.getElementById('closeEditAddressModal');
    const cancelBtn = document.getElementById('cancelEditAddressModal');

    closeBtn?.addEventListener('click', () => {
      closeModal(editModal);
      resetEditForm();
    });
    cancelBtn?.addEventListener('click', () => {
      closeModal(editModal);
      resetEditForm();
    });

    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      if(editModal.hidden) return;
      closeModal(editModal);
      resetEditForm();
    });

    const backdrop = document.getElementById('modalBackdrop');
    backdrop?.addEventListener('click', () => {
      if(editModal.hidden) return;
      closeModal(editModal);
      resetEditForm();
    });

    const saveEditBtn = document.getElementById('saveEditAddressBtn');
    saveEditBtn?.addEventListener('click', () => {
      const targetId = editModal.dataset.targetAddressId;
      if(!targetId) return;

      const editAddressName = String(document.getElementById('editAddressNameInput')?.value || '').trim();
      const editRecipientName = String(document.getElementById('editRecipientNameInput')?.value || '').trim();
      const editRecipientPhone = String(document.getElementById('editRecipientPhoneInput')?.value || '').trim();
      const editFullAddress = String(document.getElementById('editFullAddressInput')?.value || '').trim();
      const editCity = String(document.getElementById('editCityInput')?.value || '').trim();
      const editDistrict = String(document.getElementById('editDistrictInput')?.value || '').trim();
      const editVillage = String(document.getElementById('editVillageInput')?.value || '').trim();
      const editPostalCode = String(document.getElementById('editPostalCodeInput')?.value || '').trim();
      const editTag = String(document.getElementById('editPatokanInput')?.value || '').trim();
      const editProvince = String(document.getElementById('editProvinceInput')?.value || '').trim();
      const editCountry = String(document.getElementById('editCountryInput')?.value || '').trim();
      const editPrimary = !!document.getElementById('editPrimaryAddressInput')?.checked;

      if(!editAddressName){ setFeedbackEdit('Nama Alamat wajib diisi.', 'danger'); return; }
      if(!editRecipientName){ setFeedbackEdit('Nama Penerima wajib diisi.', 'danger'); return; }
      if(!editRecipientPhone){ setFeedbackEdit('Nomor HP wajib diisi.', 'danger'); return; }
      if(!editFullAddress){ setFeedbackEdit('Alamat Lengkap wajib diisi.', 'danger'); return; }
      if(!editCity){ setFeedbackEdit('Kota/Kabupaten wajib diisi.', 'danger'); return; }
      if(!editDistrict){ setFeedbackEdit('Kecamatan wajib diisi.', 'danger'); return; }
      if(!editVillage){ setFeedbackEdit('Kelurahan/Desa wajib diisi.', 'danger'); return; }
      if(!editPostalCode || editPostalCode.replace(/[^0-9]/g,'').length < 4){ setFeedbackEdit('Kode pos tidak valid.', 'danger'); return; }

      const composedFullAddress = `${editFullAddress}, ${editDistrict}, ${editVillage}, ${editCity} (${editPostalCode})`;

      const allNow = getAddresses();
      const target = allNow.find(a => a.id === targetId && a.userId === customer.id);
      if(!target){ setFeedbackEdit('Alamat tidak ditemukan.', 'danger'); return; }

      // Update fields
      target.namaAlamat = editAddressName;
      target.recipientName = editRecipientName;
      target.recipientPhone = editRecipientPhone;
      target.fullAddress = composedFullAddress;
      target.tag = editTag;
      target.province = editProvince;
      target.country = editCountry;

      if(editPrimary){
        // primary move: others become false
        allNow.filter(a => a.userId === customer.id).forEach(a => { a.primary = false; });
        target.primary = true;
      } else {
        target.primary = false;
        // If after update no primary exists, ensure first becomes primary
        const userAddrs = allNow.filter(a => a.userId === customer.id);
        if(!userAddrs.some(a => a.primary)){
          const first = userAddrs[0];
          if(first) first.primary = true;
        }
      }

      setAddresses(allNow);
      closeModal(editModal);
      resetEditForm();
      renderAddressesTab();
    });
  }

  // ---------- Delete confirm bindings ----------
  if(confirmDeleteModal && !confirmDeleteModal.dataset.deleteModalBound){
    confirmDeleteModal.dataset.deleteModalBound = '1';

    const closeBtn = document.getElementById('closeConfirmDeleteAddressModal');
    const cancelBtn = document.getElementById('cancelDeleteAddressBtn');
    const confirmBtn = document.getElementById('confirmDeleteAddressBtn');

    const closeFn = () => {
      closeModal(confirmDeleteModal);
      confirmDeleteModal.dataset.targetAddressId = '';
    };

    closeBtn?.addEventListener('click', closeFn);
    cancelBtn?.addEventListener('click', closeFn);

    document.addEventListener('keydown', (e) => {
      if(e.key !== 'Escape') return;
      if(confirmDeleteModal.hidden) return;
      closeFn();
    });

    const backdrop = document.getElementById('modalBackdrop');
    backdrop?.addEventListener('click', () => {
      if(confirmDeleteModal.hidden) return;
      closeFn();
    });

    confirmBtn?.addEventListener('click', () => {
      const targetId = confirmDeleteModal.dataset.targetAddressId;
      if(!targetId) return;

      const before = getAddresses();
      const deletedAddr = before.find(a => a.id === targetId && a.userId === customer.id);

      let after = before.filter(a => !(a.id === targetId && a.userId === customer.id));

      // If deleted was primary, promote first remaining
      if(deletedAddr && deletedAddr.primary){
        const userAddrs = after.filter(a => a.userId === customer.id);
        if(userAddrs.length){
          userAddrs.forEach(a => a.primary = false);
          userAddrs[0].primary = true;
        }
      }

      setAddresses(after);
      closeFn();
      renderAddressesTab();
    });
  }

  // ---------- Action handlers (event delegation) ----------
  listWrap.onclick = (e) => {
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;

    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if(!id || !action) return;

    if(action === 'edit'){
      const addr = getAddressById(id);
      if(!addr) return;

      const parsed = parseForModal(addr.fullAddress);

      editModal.dataset.targetAddressId = id;

      document.getElementById('editAddressNameInput').value = addr.namaAlamat || '';
      document.getElementById('editRecipientNameInput').value = addr.recipientName || '';
      document.getElementById('editRecipientPhoneInput').value = addr.recipientPhone || '';
      document.getElementById('editFullAddressInput').value = parsed.baseAddress || '';
      document.getElementById('editCityInput').value = parsed.city || '';
      document.getElementById('editDistrictInput').value = parsed.district || '';
      document.getElementById('editVillageInput').value = parsed.village || '';
      document.getElementById('editPostalCodeInput').value = parsed.postalCode || '';
      document.getElementById('editPatokanInput').value = addr.tag || '';
      document.getElementById('editProvinceInput').value = addr.province || '';
      document.getElementById('editCountryInput').value = addr.country || '';
      document.getElementById('editPrimaryAddressInput').checked = !!addr.primary;

      setFeedbackEdit('', 'danger');
      openModal(editModal);
      return;
    }

    if(action === 'delete'){
      confirmDeleteModal.dataset.targetAddressId = id;
      openModal(confirmDeleteModal);
      return;
    }
  };

}





function renderOrdersTab(){
  const listWrap = document.getElementById('ordersList');
  const empty = document.getElementById('ordersEmpty');
  if(!listWrap) return;

  const customer = getCurrentCustomer();
  if(!customer) return;

  const orders = getOrders().filter(o => o.userId === customer.id);
  listWrap.innerHTML='';

  const sorted = orders.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  if(!sorted.length){ if(empty) empty.hidden=false; return; }
  if(empty) empty.hidden=true;

  const cards = sorted.map(o => {
    const itemsText = (o.items||[]).slice(0,3).map(i=> `${i.name} × ${i.qty}`).join('<br/>');
    const more = (o.items||[]).length > 3 ? `<div class="muted">+${(o.items||[]).length-3} produk</div>` : '';
    return `
      <div class="order-card" role="button" tabindex="0" data-order-id="${o.id}">
        <div class="order-card-top">
          <div>
            <div class="muted">${new Date(o.createdAt).toLocaleDateString('id-ID')}</div>
            <div style="font-weight:1000">#${escapeHtml(o.id)}</div>
          </div>
          <div style="text-align:right">
            <div class="order-total">${formatRupiah(o.total)}</div>
      <div class="muted">${o.status ? escapeHtml(o.status) : 'Diproses'}</div>
          </div>
        </div>
        <div class="order-card-items">
          ${itemsText}
          ${more}
        </div>
      </div>
    `;
  }).join('');

  listWrap.innerHTML = cards;

  listWrap.querySelectorAll('.order-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-order-id');
      const order = sorted.find(x=>x.id===id);
      if(!order) return;
      renderOrderDetailModal(order);
      const modal = document.getElementById('orderModal');
      openModal(modal);
    });
    card.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); card.click(); }
    });
  });

  // download invoice
  const downloadBtn = document.getElementById('downloadInvoiceBtn');
  if(downloadBtn && !downloadBtn.dataset.bound){
    downloadBtn.dataset.bound='1';
    downloadBtn.addEventListener('click', () => {
      const order = window.__activeOrderForInvoice;
      if(!order) return;
      downloadInvoicePDF(order);
    });
  }

  // bind close
  const closeBtn = document.getElementById('closeOrderModal');
  const orderModal = document.getElementById('orderModal');
  if(closeBtn && !closeBtn.dataset.bound){
    closeBtn.dataset.bound='1';
    closeBtn.addEventListener('click', () => closeModal(orderModal));
  }
}


function renderOrderDetailModal(order){
  const wrap = document.getElementById('orderDetailContent');
  if(!wrap) return;

  const items = order.items || [];
  const productsHTML = items.map(i => {
    const price = Number(i.price||0);
    const subtotal = price * Number(i.qty||0);
    return `
      <div class="invoice-line">
        <div>
          <div style="font-weight:1000">${escapeHtml(i.name || '-') }</div>
          <div class="muted">Jumlah: ${Number(i.qty||0)}</div>
        </div>
        <div style="text-align:right">
          <div>${formatRupiah(subtotal)}</div>
          <div class="muted">${formatRupiah(price)} / item</div>
        </div>
      </div>
    `;
  }).join('');

  const statusText = escapeHtml(order.status || 'Selesai');
  const totalPayment = formatRupiah(order.total || 0);
  const addressFull = escapeHtml((order.addressSnapshot && (order.addressSnapshot.fullAddress || order.addressSnapshot.fullAddress===0)) ? (order.addressSnapshot.fullAddress || order.address) : (order.address || '-'));

  wrap.innerHTML = `
    <div class="order-detail-wrap">
      <div class="order-detail-sections">
        <section class="od-section od-card" data-od-section="status">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-clock-rotate-left"></i> Status Pesanan</div>
          </header>
          <div class="od-field">
            <div class="od-field-value">
              <span class="od-status-pill">${statusText}</span>
            </div>
          </div>
        </section>

        <section class="od-section od-card" data-od-section="nomor">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-hashtag"></i> Nomor Pesanan</div>
          </header>
          <div class="od-field">
            <div class="od-field-value">#${escapeHtml(order.id)}</div>
            <div class="od-field-muted">${new Date(order.createdAt).toLocaleString('id-ID')}</div>
          </div>
        </section>

        <section class="od-section od-card" data-od-section="penerima">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-user"></i> Data Penerima</div>
          </header>
          <div class="od-receiver-grid">
            <div class="od-receiver-item">
              <div class="od-receiver-label">Nama Penerima</div>
              <div class="od-receiver-value">
                ${escapeHtml((order.addressSnapshot && (order.addressSnapshot.recipientName || order.addressSnapshot.namaPenerima)) ? (order.addressSnapshot.recipientName || order.addressSnapshot.namaPenerima) : '-')} 
              </div>
            </div>
            <div class="od-receiver-item">
              <div class="od-receiver-label">Nomor Telepon</div>
              <div class="od-receiver-value">${escapeHtml((order.addressSnapshot && order.addressSnapshot.recipientPhone) ? order.addressSnapshot.recipientPhone : '-')}</div>
            </div>
            <div class="od-receiver-item od-receiver-item--full">
              <div class="od-receiver-label">Alamat</div>
              <div class="od-receiver-value od-receiver-address">${addressFull}</div>
            </div>
          </div>
        </section>

        <section class="od-section od-card" data-od-section="produk">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-boxes-stacked"></i> Daftar Produk</div>
          </header>
          <div class="od-products">
            ${productsHTML || '<div class="muted">-</div>'}
          </div>
        </section>

        <section class="od-section od-card" data-od-section="pembayaran">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-credit-card"></i> Metode Pembayaran</div>
          </header>
          <div class="od-field">
            <div class="od-field-value">${escapeHtml(paymentLabel(order.paymentMethod))}</div>
          </div>
        </section>

        <section class="od-section od-card" data-od-section="pengiriman">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-truck-fast"></i> Pengiriman</div>
          </header>
          <div class="od-field">
            <div class="od-field-value">${formatRupiah(order.shipping || 0)}</div>
            <div class="od-field-muted">${escapeHtml((order.addressSnapshot && order.addressSnapshot.eta) ? order.addressSnapshot.eta : 'Dikirim via kurir') }</div>
          </div>
        </section>

        <section class="od-section od-card od-summary" data-od-section="ringkasan">
          <header class="od-section-head">
            <div class="od-section-title"><i class="fa-solid fa-receipt"></i> Ringkasan Pembayaran</div>
          </header>
          <div class="od-summary-rows">
            <div class="od-summary-row"><span>Subtotal</span><b>${formatRupiah(order.sub || 0)}</b></div>
            <div class="od-summary-row"><span>Ongkir</span><b>${formatRupiah(order.shipping || 0)}</b></div>
            <div class="od-summary-row"><span>Diskon</span><b>${order.discount ? '-'+formatRupiah(order.discount).replace('Rp ','Rp ') : formatRupiah(0)}</b></div>
            <div class="od-summary-row"><span>Voucher</span><b>${order.voucherCode ? escapeHtml(order.voucherCode) : '-'}</b></div>
            <div class="od-summary-row od-summary-total"><span>Total Pembayaran</span><b>${totalPayment}</b></div>
          </div>
        </section>
      </div>

      <div class="od-mobile-actions" aria-hidden="true"></div>
    </div>
  `;

  window.__activeOrderForInvoice = order;
}

function downloadInvoicePDF(order){
  const { jsPDF } = window.jspdf || {};
  if(!jsPDF){
    alert('jsPDF tidak tersedia.');
    return;
  }

  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const margin = 40;
  let y = 50;

  const title = 'Invoice Pesanan';
  doc.setFont('helvetica','bold');
  doc.setFontSize(18);
  doc.text(title, margin, y);

  y += 20;
  doc.setFontSize(10);
  doc.setTextColor(80);
  const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID') : '-';
  doc.text(`Nomor Pesanan: ${order.id}`, margin, y);
  y += 14;
  doc.text(`Tanggal: ${dateStr}`, margin, y);
  y += 18;

  // Table header
  doc.setTextColor(0);
  doc.setFont('helvetica','bold');
  doc.text('Produk', margin, y);
  doc.text('Qty', margin + 280, y);
  doc.text('Subtotal', margin + 360, y);
  y += 12;
  doc.setDrawColor(220);
  doc.line(margin, y, margin + 520, y);
  y += 12;

  const items = order.items || [];
  doc.setFont('helvetica','normal');
  items.forEach((it) => {
    const lineSubtotal = (Number(it.price||0) * Number(it.qty||0));
    const name = String(it.name||'-');
    doc.text(name.length > 50 ? name.slice(0,50) + '…' : name, margin, y);
    doc.text(String(it.qty||0), margin + 300, y);
    doc.text(formatRupiah(lineSubtotal), margin + 380, y);
    y += 14;
  });

  y += 10;
  doc.setDrawColor(220);
  doc.line(margin, y, margin + 520, y);
  y += 14;

  doc.setFont('helvetica','bold');
  doc.text('Subtotal', margin, y);
  doc.text(formatRupiah(order.sub||0), margin + 360, y, { align:'right' });
  y += 14;
  doc.setFont('helvetica','bold');
  doc.text('Ongkir', margin, y);
  doc.text(formatRupiah(order.shipping||0), margin + 360, y, { align:'right' });
  y += 14;

  doc.text('Diskon', margin, y);
  doc.text(order.discount ? '-'+formatRupiah(order.discount).replace('Rp ','Rp ') : formatRupiah(0), margin + 360, y, { align:'right' });
  y += 18;
  doc.setFont('helvetica','bold');
  doc.text('Total Pembayaran', margin, y);
  doc.setFontSize(14);
  doc.text(formatRupiah(order.total||0), margin + 380, y, { align:'right' });
  doc.setFontSize(10);

  y += 20;
  doc.setFont('helvetica','bold');
  doc.text('Metode Pembayaran', margin, y);
  doc.setFont('helvetica','normal');
  y += 12;
  doc.text(paymentLabel(order.paymentMethod), margin, y);

  y += 22;
  doc.setFont('helvetica','bold');
  doc.text('Alamat Pengiriman', margin, y);
  doc.setFont('helvetica','normal');
  y += 12;
  const addr = String(order.address||'-');
  const split = doc.splitTextToSize(addr, 500);
  doc.text(split, margin, y);

  doc.save(`invoice_${order.id}.pdf`);
}

function attachSettingsLifecycle(){
  if(typeof window.__settingsInitBound !== 'undefined' && window.__settingsInitBound) return;
  window.__settingsInitBound = true;

  window.addEventListener('DOMContentLoaded', () => {
    initSettingsPage();
  });
}

attachSettingsLifecycle();


// Home init is executed in inline script in index.html
window.addEventListener('DOMContentLoaded', () => {
  seedIfNeeded();
  setYear();
});

// ------------------------------
// Floating Help Buttons (FAQ & Chat CS)
// ------------------------------
function initFloatingHelpButtons(){
  const openBtn = document.getElementById('bbFabFaqBtn');
  const backdrop = document.getElementById('bbFaqBackdrop');
  const modal = document.getElementById('bbFaqModal');
  const closeBtn = document.getElementById('bbFaqCloseBtn');
  if(!openBtn || !backdrop || !modal || !closeBtn) return;

  const setOpen = (isOpen) => {
    backdrop.classList.toggle('open', isOpen);
    modal.classList.toggle('open', isOpen);
    modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if(!openBtn.dataset.bound){
    openBtn.dataset.bound = '1';
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if(!closeBtn.dataset.bound){
    closeBtn.dataset.bound = '1';
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  if(!backdrop.dataset.bound){
    backdrop.dataset.bound = '1';
    backdrop.addEventListener('click', () => closeModal());
  }

  document.addEventListener('keydown', (e) => {
    if(e.key !== 'Escape') return;
    if(modal.classList.contains('open')) closeModal();
  });

  // Accordion toggle
  modal.querySelectorAll('.bb-acc-item').forEach(item => {
    const btn = item.querySelector('.bb-acc-btn');
    if(!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  });

  // Default closed
  setOpen(false);

  // Chat CS button
  const chatBtn = document.getElementById('bbFabChatBtn');
  if(chatBtn && !chatBtn.dataset.bound){
    chatBtn.dataset.bound = '1';
    chatBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = "https://wa.me/6281234567890?text=Halo%20Admin%20EcoSmet%20Baby%20Care,%20saya%20ingin%20bertanya%20mengenai%20produk.";
      window.open(url, '_blank', 'noopener');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initFloatingHelpButtons();
});

// Expose needed functions
window.initCustomerLogin = initCustomerLogin;
window.initCustomerRegister = initCustomerRegister;
window.renderHome = renderHome;
window.renderProductsPage = renderProductsPage;
window.renderCategoriesPage = renderCategoriesPage;
window.renderProductDetail = renderProductDetail;
window.renderCartPage = renderCartPage;
window.renderCheckoutPage = renderCheckoutPage;
window.renderSuccessPage = renderSuccessPage;
window.renderProfile = renderProfile;
window.initAuthGuards = initAuthGuards;
window.initUserMenu = initUserMenu;
window.initCustomerProfile = initCustomerProfile;

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileOverlay = document.getElementById("mobileOverlay");
const drawerClose = document.getElementById("drawerClose");

if(hamburgerBtn){

    hamburgerBtn.onclick = () =>{

        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");

    }

}

if(drawerClose){

    drawerClose.onclick = closeDrawer;

}

if(mobileOverlay){

    mobileOverlay.onclick = closeDrawer;

}

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeDrawer();

    }

})

function closeDrawer(){

    mobileDrawer.classList.remove("active");
    mobileOverlay.classList.remove("active");

}

// ==============================
// CLAIM VOUCHER
// ==============================

// ==========================
// TOAST NOTIFICATION
// ==========================

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}


// ==========================
// CLAIM VOUCHER
// ==========================

const claimVoucherBtn = document.getElementById("claimVoucherBtn");

if (claimVoucherBtn) {

    // Ambil voucher dari Local Storage
    let vouchers = JSON.parse(localStorage.getItem("customerVouchers")) || [];

    // Cek apakah voucher sudah pernah di-claim
    const claimed = vouchers.find(v => v.code === "WELCOME20");

    if (claimed) {

        claimVoucherBtn.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Voucher Berhasil Di-claim
        `;

        claimVoucherBtn.disabled = true;
        claimVoucherBtn.classList.add("claimed");

    }

    // Klik tombol claim
    claimVoucherBtn.addEventListener("click", () => {

        let vouchers = JSON.parse(localStorage.getItem("customerVouchers")) || [];

        const exists = vouchers.find(v => v.code === "WELCOME20");

        if (exists) {

            showToast("Voucher sudah pernah di-claim.");

            return;

        }

        // Data voucher
        const voucher = {

            id: Date.now(),

            code: "WELCOME20",

            title: "Voucher Member Baru",

            description: "Diskon 20% + Gratis Ongkir",

            discount: 20,

            freeShipping: true,

            minPurchase: 0,

            expiry: "31 Desember 2026",

            claimedAt: new Date().toLocaleString("id-ID")

        };

        // Simpan voucher
        vouchers.push(voucher);

        localStorage.setItem(
            "customerVouchers",
            JSON.stringify(vouchers)
        );

        // Ubah tombol
        claimVoucherBtn.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Voucher Berhasil Di-claim
        `;

        claimVoucherBtn.disabled = true;

        claimVoucherBtn.classList.add("claimed");

        // Toast
        showToast("🎉 Voucher berhasil di-claim!");

    });

}