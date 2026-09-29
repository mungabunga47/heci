document.addEventListener('DOMContentLoaded', function() {
  
  const td = document.querySelector('td[background="ilk.jpg"]');
  
  
  if (!td) return;
  
  
  const container = document.createElement('div');
  container.className = 'image-container';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  
  
  container.innerHTML = td.innerHTML;
  container.style.backgroundImage = td.style.backgroundImage || 'url(ilk.jpg)';
  container.style.width = td.style.width || '700px';
  container.style.height = td.style.height || '529px';
  

  td.innerHTML = '';
  td.appendChild(container);
  

  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'coordinate-line horizontal-line';
  
  const verticalLine = document.createElement('div');
  verticalLine.className = 'coordinate-line vertical-line';
  
 
  const scaleSettings = {
   minX: 280, 
maxX: 430,
minY: 140, 
maxY: 330 
  };
  


 
  const scaleBoundary = document.createElement('div');
  scaleBoundary.className = 'scale-boundary';
  scaleBoundary.style.left = scaleSettings.minX + 'px';
  scaleBoundary.style.top = scaleSettings.minY + 'px';
  scaleBoundary.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  scaleBoundary.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';
  
 
  container.appendChild(horizontalLine);
  container.appendChild(verticalLine);
  container.appendChild(scaleBoundary);
  
  
  horizontalLine.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  verticalLine.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';
  
 
  container.addEventListener('mousemove', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
 
    if (x >= scaleSettings.minX && x <= scaleSettings.maxX && 
        y >= scaleSettings.minY && y <= scaleSettings.maxY) {
      // Çizgileri göster ve pozisyonlarını güncelle
      horizontalLine.style.display = 'block';
      verticalLine.style.display = 'block';
      
    
      horizontalLine.style.top = y + 'px';
      horizontalLine.style.left = scaleSettings.minX + 'px';
      
      verticalLine.style.left = x + 'px';
      verticalLine.style.top = scaleSettings.minY + 'px';
    } else {
    
      horizontalLine.style.display = 'none';
      verticalLine.style.display = 'none';
    }
  });
  
 
  container.addEventListener('mouseleave', function() {
    horizontalLine.style.display = 'none';
    verticalLine.style.display = 'none';
  });
});




document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('td[background="ilk.jpg"] .image-container');
  if (!container) return;

  const zone = {
    minX: 280,   
    maxX: 430,   
    minY: 100,   
    maxY: 290,   
    size: 10    
  };

  container.addEventListener('click', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
   
    if (x >= zone.minX && x <= zone.maxX && 
        y >= zone.minY && y <= zone.maxY &&
        Math.abs(x - (zone.minX + (zone.maxX-zone.minX)/2)) <= zone.size/2 &&
        Math.abs(y - (zone.minY + (zone.maxY-zone.minY)/2)) <= zone.size/2) {
      e.stopPropagation();
      new Audio('ding.mp3').play().catch(e => console.log("Ses çalınamadı:", e));
    }
  });
});



document.addEventListener('DOMContentLoaded', function() {
   
    const logoImage = document.querySelector('img[src="logow.jpg"]');
    if (logoImage) {
        
        logoImage.addEventListener('dblclick', function() {
            alert('LANET OLSUN SİYONİSTLERE VE ONLARIN KÖPEK YANDAŞLARINA!'); 
        });
    }
 
});
