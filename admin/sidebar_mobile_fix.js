(function(){
  const toggle = document.getElementById('adminSidebarToggle');
  if(!toggle) return;

  const close = () => { toggle.checked = false; };

  // Close when overlay clicked
  const overlay = document.querySelector('.admin-sidebar-backdrop[for="adminSidebarToggle"], .mobile-overlay');
  if(overlay){
    overlay.addEventListener('click', (e)=>{
      // If overlay is label, it may trigger toggle too. We force-close.
      close();
    });
  }

  // Close when any menu item clicked (mobile)
  document.querySelectorAll('.sidebar-item').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(window.matchMedia('(max-width: 680px)').matches){
        close();
      }
    });
  });

  // Ensure hamburger actually toggles checkbox on mobile.
  // In some cases, the non-standard attribute `for` on <button> won't toggle checkbox.
  const hamburger = document.querySelector('.btn-hamburger[for="adminSidebarToggle"], .btn-hamburger');
  if(hamburger){
    hamburger.addEventListener('click', (e)=>{
      if(!window.matchMedia('(max-width: 680px)').matches) return;
      // prevent default label toggling (if any)
      e.preventDefault();
      toggle.checked = !toggle.checked;
    });
  }

  // Escape closes
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') close();
  });
})();

