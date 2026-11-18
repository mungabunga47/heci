document.addEventListener("DOMContentLoaded", function() {
  
    const images = document.querySelectorAll('img[onmouseover]');
    
    images.forEach(img => {
        
        const w = img.getAttribute('width') || img.clientWidth;
        const h = img.getAttribute('height') || img.clientHeight;
        
      
        const src1 = img.src;
        
       
        img.dispatchEvent(new Event('mouseover'));
        const src2 = img.src;
        
       
        img.src = src1;
        
      
        img.removeAttribute('onmouseover');
        img.removeAttribute('onmouseout');
        img.onmouseover = null;
        img.onmouseout = null;
        
      
        const container = document.createElement('span');
        container.className = 'menu-fade-container';
        container.style.width = w + 'px';
        container.style.height = h + 'px';
        
      
        img.className = 'menu-base-img';
        img.style.width = w + 'px';
        img.style.height = h + 'px';
        
      
        const img2 = img.cloneNode(true);
        img2.src = src2;
        img2.className = 'menu-overlay-img';
        img2.style.width = w + 'px';
        img2.style.height = h + 'px';
        
       
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        container.appendChild(img2);
    });
});
