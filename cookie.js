document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');

    if (!localStorage.getItem('cookies-accepted')) {
        cookieBanner.style.display = 'block'; 
    }
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookies-accepted', 'true');
        cookieBanner.style.display = 'none'; 
    });
    rejectBtn.addEventListener('click', function() {
        
        alert("Çerezleri reddettiniz. Daha fazla bilgi için Gizlilik Politikamıza bakabilirsiniz.");
        cookieBanner.style.display = 'none'; 
    });
});
