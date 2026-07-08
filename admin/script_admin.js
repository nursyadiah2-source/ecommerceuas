/* EcoSmet — script_admin.js */
console.log("SCRIPT TERBARU LOADED");
const LS_ADMIN = {
  CUSTOMERS: 'ecosmet_customers',
  ADMIN: 'ecosmet_admin',
  SESSION: 'ecosmet_session',
  CATEGORIES: 'ecosmet_categories',
  PRODUCTS: 'ecosmet_products'
};

function safeJSONParse(str, fallback){
  try{ return JSON.parse(str); }catch{ return fallback; }
}

function getSession(){ return safeJSONParse(localStorage.getItem(LS_ADMIN.SESSION), null); }
function setSession(s){ if(!s) localStorage.removeItem(LS_ADMIN.SESSION); else localStorage.setItem(LS_ADMIN.SESSION, JSON.stringify(s)); }
function getProducts(){ return safeJSONParse(localStorage.getItem(LS_ADMIN.PRODUCTS), []); }
function setProducts(p){ localStorage.setItem(LS_ADMIN.PRODUCTS, JSON.stringify(p)); }
const DEFAULT_CATEGORIES = [
  { id:'cat_bath', name:'Bath & Hygiene', icon:'fa-bath', img:'images/kategori/kategori-bath.png' },
  { id:'cat_diapers', name:'Diapers', icon:'fa-pants', img:'images/kategori/kategori-diapers.png' },
  { id:'cat_body', name:'Body Care', icon:'fa-heart', img:'images/kategori/kategori-body.png' },
  { id:'cat_hygiene', name:'Wipes & Care', icon:'fa-tshirt', img:'images/kategori/kategori-wipes.png' }
];

function getCategories(){
  const parsed = safeJSONParse(localStorage.getItem(LS_ADMIN.CATEGORIES), []);
  if(!Array.isArray(parsed) || parsed.length === 0){
    // Jika kategori belum ada / kosong, jangan biarkan dropdown menjadi kosong.
    // Isi ulang dengan DEFAULT_CATEGORIES.
    localStorage.setItem(LS_ADMIN.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES.slice();
  }
  return parsed;
}

function seedIfNeeded(){
  // reuse seed from customer script if available; if not, create minimal.
  if(!localStorage.getItem(LS_ADMIN.PRODUCTS)) localStorage.setItem(LS_ADMIN.PRODUCTS, JSON.stringify([]));

  // BUGFIX: jangan seed kategori sebagai []
  // Jika key belum ada atau sudah ada tapi kosong, isi DEFAULT_CATEGORIES.
  const cur = safeJSONParse(localStorage.getItem(LS_ADMIN.CATEGORIES), []);
  if(!Array.isArray(cur) || cur.length === 0){
    localStorage.setItem(LS_ADMIN.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }

  if(!localStorage.getItem(LS_ADMIN.ADMIN)) localStorage.setItem(LS_ADMIN.ADMIN, JSON.stringify({email:'nuradmin@gmail.com', password:'nura12345', name:'Admin Nura Baby Care'}));
}


function requireAdmin(){
  seedIfNeeded();
  const s = getSession();
  if(!s || s.role !== 'admin'){
    window.location.href = 'login_admin.html';
    return false;
  }
  return true;
}

function uid(){
  return 'p_' + Math.random().toString(16).slice(2) + '_' + Date.now();
}

function renderYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

function initAdminMenu(){
  const s = getSession();
  const nameEl = document.getElementById('adminName');
  const roleEl = document.getElementById('adminRole');
  if(nameEl) nameEl.textContent = s?.name || '-';
  if(roleEl) roleEl.textContent = 'Admin';

  const logoutBtn = document.getElementById('btnLogoutAdmin');
  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      setSession(null);
      window.location.href = '../index.html';
    });
  }
}

function handleAdminLogin(){
  const form = document.getElementById('loginAdminForm');
  const alert = document.getElementById('loginAdminAlert');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const fd = new FormData(form);
    const email = String(fd.get('email')||'').trim().toLowerCase();
    const password = String(fd.get('password')||'');

    const admin = safeJSONParse(localStorage.getItem(LS_ADMIN.ADMIN), null);

    if(!admin || email !== admin.email || password !== admin.password){
      if(alert){ alert.textContent='Email atau password admin salah.'; alert.className='alert alert--danger'; alert.hidden=false; }
      return;
    }

    setSession({role:'admin', userId:'admin', email: admin.email, name: admin.name});
    window.location.href = 'dashboard.html';
  });
}

function renderAdminCategoriesToSelect(selectEl, selectedId){
  if(!selectEl) return;
  const categories = getCategories();
  selectEl.innerHTML = '';
  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = 'Semua kategori';
  selectEl.appendChild(optAll);
  categories.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    if(selectedId && selectedId===c.id) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

function getOrCreateDeleteProductModal(){
  // Prefer modal defined in admin/edit_produk.html (already modern).
  // If it doesn't exist (e.g. on dashboard.html), create a compatible one.
  let modal = document.getElementById('deleteProductModal');
  if(modal) return modal;

  modal = document.createElement('div');
  modal.id = 'deleteProductModal';
  modal.className = 'modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'deleteProductModalTitle');

  modal.innerHTML = `
    <div class="modal__backdrop" data-modal-close="true"></div>
    <div class="modal__panel" role="document">
      <div class="modal__icon" aria-hidden="true"><i class="fa-solid fa-trash"></i></div>
      <h3 class="modal__title" id="deleteProductModalTitle">Hapus Produk?</h3>
      <p class="modal__desc">Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</p>
      <div class="modal__actions">
        <button class="btn btn-ghost" type="button" data-modal-close="true"><i class="fa-solid fa-xmark"></i> Batal</button>
        <button class="btn btn-danger" type="button" id="confirmDeleteBtn"><i class="fa-solid fa-trash"></i> Ya, Hapus</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeButtons = modal.querySelectorAll('[data-modal-close="true"], [data-modal-close="1"]');
  closeButtons.forEach(btn =>{
    btn.addEventListener('click', ()=>{
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  modal.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') modal.setAttribute('aria-hidden', 'true');
  });

  return modal;
}

function openDeleteProductModal({ id }={}){
  const modal = getOrCreateDeleteProductModal();
  if(!modal) return;

  modal.setAttribute('aria-hidden', 'false');
  modal.dataset.targetId = id || '';

  const confirmBtn = modal.querySelector('#confirmDeleteBtn');
  if(confirmBtn && !confirmBtn.dataset.bound){
    confirmBtn.dataset.bound = '1';
    confirmBtn.addEventListener('click', ()=>{
      const targetId = modal.dataset.targetId;
      if(!targetId) return;

      const products = getProducts().filter(p=>p.id!==targetId);
      setProducts(products);
      modal.setAttribute('aria-hidden', 'true');
      renderDashboard();
    });
  }
}

function renderDashboard(){
  if(!requireAdmin()) return;
  const listEl = document.getElementById('adminProductList');
  if(!listEl) return;

  const categories = getCategories();
  const catSelect = document.getElementById('filterCategory');
  const searchInput = document.getElementById('filterSearch');

  const apply = ()=>{
    const q = (searchInput?.value || '').trim().toLowerCase();
    const cat = catSelect?.value || 'all';

    let items = getProducts();
    if(cat && cat!=='all') items = items.filter(p=>p.categoryId===cat);
    if(q) items = items.filter(p=>p.name.toLowerCase().includes(q));

    listEl.innerHTML='';
    if(!items.length){
      listEl.innerHTML = '<div class="muted">Produk kosong.</div>';
      return;
    }

    items.forEach(p=>{
      const row = document.createElement('div');
      row.className = 'table-row';
      row.innerHTML = `
        <div style="display:flex; gap:12px; align-items:center">
          <img src="${p.img||''}" alt="${p.name}" style="width:44px; height:44px; object-fit:contain; border-radius:16px; background:rgba(255,255,255,.6); border:1px solid rgba(43,27,34,.10)" onerror="this.style.display='none'" />
          <div>
            <div style="font-weight:1100">${p.name}</div>
            <div style="color: rgba(43,27,34,.65); font-weight:900; font-size:13px">${p.categoryName||''}</div>
          </div>
        </div>
        <div style="font-weight:1100">${(p.price||0).toLocaleString('id-ID',{style:'currency',currency:'IDR'}).replace(',00','') }</div>
        <div class="hide-sm" style="font-weight:1100">${p.stock ?? 0}</div>
        <div class="hide-md" style="font-weight:900; color: rgba(43,27,34,.65)">★ ${Number(p.rating||0).toFixed(1)}</div>
        <div style="display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap">
          <a class="btn btn-ghost" href="edit_produk.html?id=${encodeURIComponent(p.id)}"><i class="fa-solid fa-pen"></i> Edit</a>
          <button class="btn btn-danger" data-del="${p.id}" type="button"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      `;
      listEl.appendChild(row);
    });

    listEl.querySelectorAll('button[data-del]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-del');
        openDeleteProductModal({ id });
      });
    });
  };

  renderAdminCategoriesToSelect(catSelect, 'all');
  apply();

  [catSelect, searchInput].forEach(el=>{
    if(!el) return;
    el.addEventListener('input', apply);
    el.addEventListener('change', apply);
  });
}

function isAllowedImageFile(file){
  if(!file) return false;
  const allowed = ['image/jpeg','image/png','image/webp'];
  if(allowed.includes(file.type)) return true;
  // fallback by extension
  const name = String(file.name || '').toLowerCase();
  return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp');
}

function readFileAsDataURL(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = ()=> resolve(String(reader.result || ''));
    reader.onerror = ()=> reject(new Error('Gagal membaca file.'));
    reader.readAsDataURL(file);
  });
}

function renderTambahProduk(){
  if(!requireAdmin()) return;

  const form = document.getElementById('addProductForm');
  if(!form) return;

  const alertEl = document.getElementById('addProductAlert');

  // hindari duplikasi event listener bila init dipanggil lebih dari sekali
  if(form.dataset.boundAddProduct === '1') return;
  form.dataset.boundAddProduct = '1';

  const catSelect = document.getElementById('categoryId');
  const categories = getCategories();
  if(catSelect){
    catSelect.innerHTML = '';
    categories.forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      catSelect.appendChild(opt);
    });
  }


  const imgFileInput = document.getElementById('imgFile');
  const imgPreview = document.getElementById('imgPreview');
  const imgHidden = document.getElementById('img');

  if(imgFileInput){
    imgFileInput.addEventListener('change', async ()=>{
      if(!alertEl) return;
      alertEl.hidden = true;

      const file = imgFileInput.files && imgFileInput.files[0];
      if(!file){
        if(imgHidden) imgHidden.value = '';
        if(imgPreview){ imgPreview.src = ''; imgPreview.style.display='none'; }
        return;
      }
      if(!isAllowedImageFile(file)){
        alertEl.textContent = 'Format gambar tidak valid. Gunakan jpg, jpeg, png, atau webp.';
        alertEl.className = 'alert alert--danger';
        alertEl.hidden = false;
        imgFileInput.value = '';
        if(imgHidden) imgHidden.value = '';
        if(imgPreview){ imgPreview.src = ''; imgPreview.style.display='none'; }
        return;
      }

      try{
        const dataUrl = await readFileAsDataURL(file);
        if(imgPreview){
          imgPreview.src = dataUrl;
          imgPreview.style.display='';
        }
        if(imgHidden) imgHidden.value = dataUrl;
      }catch{
        alertEl.textContent = 'Gagal memproses gambar.';
        alertEl.className = 'alert alert--danger';
        alertEl.hidden = false;
      }
    });
  }

  // logging sementara: tombol diklik -> submit event akan mengikuti
  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  submitBtn?.addEventListener('click', ()=>{
    console.log('[TambahProduk] tombol diklik');
    // LocalStorage sebelum
    try{
      console.log('[TambahProduk] localStorage ecosmet_products sebelum:', localStorage.getItem(LS_ADMIN.PRODUCTS));
    }catch(err){
      console.log('[TambahProduk] gagal baca localStorage sebelum', err);
    }
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alertEl && (alertEl.hidden=true);

    console.log('[TambahProduk] submit event fired');

    const fd = new FormData(form);
    const name = String(fd.get('name')||'').trim();
    const categoryId = String(fd.get('categoryId')||'').trim();
    const price = Number(fd.get('price')||0);
    // stok awal untuk produk baru selalu 0 (hanya boleh diubah lewat Manajemen Stok)
    const stock = 0;
    const rating = Number(fd.get('rating')||0);

    // img hidden berisi Base64 hasil upload
    const img = String(fd.get('img')||'').trim();
    const desc = String(fd.get('desc')||'').trim();

    console.log('[TambahProduk] data form diterima:', { name, categoryId, price, stock, rating, imgLen: img ? img.length : 0, descLen: desc ? desc.length : 0 });

    if(!name){
      alertEl.textContent='Nama produk wajib diisi.'; alertEl.className='alert alert--danger'; alertEl.hidden=false; return;
    }
    if(!categoryId){
      alertEl.textContent='Kategori wajib diisi.'; alertEl.className='alert alert--danger'; alertEl.hidden=false; return;
    }
    if(!(price>0) || !(stock>=0)){
      alertEl.textContent='Harga/stock tidak valid.'; alertEl.className='alert alert--danger'; alertEl.hidden=false; return;
    }

    const cat = categories.find(c=>c.id===categoryId);
    const newProduct = {
      id: uid(),
      name,
      categoryId,
      categoryName: cat?.name || '',
      price,
      stock,
      rating: rating || 4.6,
      sales: 0,
      createdAt: Date.now(),
      img: img || 'images/produk/default-produk.png',
      desc: desc || '-' 
    };

    console.log('[TambahProduk] objek produk akan disimpan:', newProduct);

    const products = getProducts();
    const before = safeJSONParse(localStorage.getItem(LS_ADMIN.PRODUCTS), []);
    console.log('[TambahProduk] isi localStorage ecosmet_products (parsed) sebelum:', before);

    // pastikan id unik, jangan menimpa
    if(products.some(p => p.id === newProduct.id)){
      console.log('[TambahProduk] WARNING: id duplikat terdeteksi, regenerating...');
      newProduct.id = uid();
    }

    products.push(newProduct);
    setProducts(products);

    const after = safeJSONParse(localStorage.getItem(LS_ADMIN.PRODUCTS), []);
    console.log('[TambahProduk] isi localStorage ecosmet_products (parsed) sesudah:', after);

    if(alertEl){
      alertEl.textContent = 'Produk berhasil disimpan.';
      alertEl.className = 'alert alert--success';
      alertEl.hidden = false;
    }

    // reset form + preview
    form.reset();
    const imgPreview = document.getElementById('imgPreview');
    const imgHidden = document.getElementById('img');
    if(imgPreview){ imgPreview.src = ''; imgPreview.style.display='none'; }
    if(imgHidden){ imgHidden.value = ''; }

    // refresh tabel produk admin sebelum redirect (agar langsung terlihat di admin juga jika user kembali)
    // dashboard.html akan render sendiri, tapi ini membantu jika tetap berada di konteks admin yang sama.
    try{ renderDashboard && renderDashboard(); }catch{}

    window.location.href = 'produk.html';
  });

}

function renderEditProduk(){
  if(!requireAdmin()) return;
  const form = document.getElementById('editProductForm');
  if(!form) return;

  const id = new URLSearchParams(location.search).get('id');
  const alertEl = document.getElementById('editProductAlert');

  const categories = getCategories();
  const catSelect = document.getElementById('categoryIdEdit');
  categories.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    catSelect.appendChild(opt);
  });

  const product = getProducts().find(p=>p.id===id);
  if(!product){
    alertEl.textContent='Produk tidak ditemukan.';
    alertEl.className='alert alert--danger';
    alertEl.hidden=false;
    return;
  }

  form.querySelector('#nameEdit').value = product.name || '';
  form.querySelector('#priceEdit').value = String(product.price ?? 0);

  form.querySelector('#ratingEdit').value = String(product.rating ?? 4.6);
  form.querySelector('#descEdit').value = product.desc || '';
  catSelect.value = product.categoryId || '';

  // image: support path folder OR base64 already stored in product.img
  const imgPreview = document.getElementById('imgPreviewEdit');
  const imgHidden = document.getElementById('img');
  const imgFileInput = document.getElementById('imgFileEdit');

  if(imgHidden) imgHidden.value = product.img || '';
  if(imgPreview){
    if(product.img){
      imgPreview.src = product.img;
      imgPreview.style.display='';
    } else {
      imgPreview.style.display='none';
    }
  }

  if(imgFileInput){
    imgFileInput.addEventListener('change', async ()=>{
      if(!alertEl) return;
      alertEl.hidden = true;

      const file = imgFileInput.files && imgFileInput.files[0];
      if(!file){
        // no change: keep old (imgHidden already has old)
        return;
      }
      if(!isAllowedImageFile(file)){
        alertEl.textContent = 'Format gambar tidak valid. Gunakan jpg, jpeg, png, atau webp.';
        alertEl.className = 'alert alert--danger';
        alertEl.hidden = false;
        imgFileInput.value = '';
        return;
      }
      try{
        const dataUrl = await readFileAsDataURL(file);
        if(imgPreview){
          imgPreview.src = dataUrl;
          imgPreview.style.display='';
        }
        if(imgHidden) imgHidden.value = dataUrl;
      }catch{
        alertEl.textContent = 'Gagal memproses gambar.';
        alertEl.className = 'alert alert--danger';
        alertEl.hidden = false;
      }
    });
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alertEl && (alertEl.hidden=true);

    const fd = new FormData(form);
    const name = String(fd.get('name')||'').trim();
    const categoryId = String(fd.get('categoryId')||'').trim();
    const price = Number(fd.get('price')||0);
    const rating = Number(fd.get('rating')||0);
    // stok tidak boleh diubah dari halaman Edit Produk
    const desc = String(fd.get('desc')||'').trim();

    const products = getProducts();
    const idx = products.findIndex(p=>p.id===id);
    if(idx<0) return;

    const stock = products[idx].stock ?? 0;

    // img hidden berisi Base64 baru jika diupload, atau path lama jika tidak
    const img = String(fd.get('img')||'').trim();

    if(!name){ alertEl.textContent='Nama produk wajib diisi.'; alertEl.className='alert alert--danger'; alertEl.hidden=false; return; }
    if(!categoryId){ alertEl.textContent='Kategori wajib diisi.'; alertEl.className='alert alert--danger'; alertEl.hidden=false; return; }

    const cat = categories.find(c=>c.id===categoryId);

    products[idx] = {
      ...products[idx],
      name,
      categoryId,
      categoryName: cat?.name || '',
      price,
      stock,
      rating: rating || products[idx].rating,
      img: img || products[idx].img,
      desc: desc || products[idx].desc
    };

    setProducts(products);
    window.location.href = 'produk.html';
  });
}

// entry
window.addEventListener("DOMContentLoaded", () => {

    renderYear();
    // Pastikan seed admin siap sebelum proses login membaca LocalStorage
    seedIfNeeded();

    // Login
    if(document.getElementById("loginAdminForm")){
        handleAdminLogin();
    }


    // Dashboard
    if(document.getElementById("adminProductList")){
        initAdminMenu();
        renderDashboard();
    }

    // Tambah Produk
    if(document.getElementById("addProductForm")){
        initAdminMenu();
        renderTambahProduk();
    }

    // Edit Produk
    if(document.getElementById("editProductForm")){
        initAdminMenu();
        renderEditProduk();
    }

});

