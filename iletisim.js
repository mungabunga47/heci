document.addEventListener('DOMContentLoaded', function() {
  const td = document.querySelector('td[background="col7iletisim.jpg"]');
  if (!td) return;
  
  const galeriResmi = td.querySelector('.resim');
  const digerOzelElementler = td.querySelectorAll('.taramaheryer, .curl');

  const container = document.createElement('div');
  container.className = 'hakkimda-container';
  container.style.position = 'relative';
  container.style.width = '267px';
  container.style.height = '529px';
  container.style.backgroundImage = 'url(col7iletisim.jpg)';
  container.style.backgroundRepeat = 'no-repeat';
  container.style.backgroundSize = 'cover';
 
  const clonedContent = td.cloneNode(true);
  while(clonedContent.firstChild) {
    const child = clonedContent.firstChild;
    if (!child.classList || 
        (!child.classList.contains('resim') && 
         !child.classList.contains('taramaheryer') &&
         !child.classList.contains('curl'))) {
      container.appendChild(child);
    }
  }

  if (galeriResmi) container.appendChild(galeriResmi);
  digerOzelElementler.forEach(el => container.appendChild(el));
 
  td.innerHTML = '';
  td.appendChild(container);
  
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'hakkimda-line horizontal';
  const verticalLine = document.createElement('div');
  verticalLine.className = 'hakkimda-line vertical';
  const scaleSettings = {
    minX: 5,    
    maxX: 210, 
    minY: 135,  
    maxY: 330,  
    size: 30    
  };
 
  horizontalLine.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  verticalLine.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';

  container.prepend(horizontalLine);
  container.prepend(verticalLine);

  container.addEventListener('click', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
   
    const centerX = scaleSettings.minX + (scaleSettings.maxX - scaleSettings.minX)/2;
    const centerY = scaleSettings.minY + (scaleSettings.maxY - scaleSettings.minY)/2;
    
   
    if (Math.abs(x - centerX) <= scaleSettings.size/2 && 
        Math.abs(y - centerY) <= scaleSettings.size/2) {
      new Audio('ding.mp3').play().catch(e => console.log("Ses çalınamadı:", e));
    }
  });
  
  container.addEventListener('mousemove', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const inArea = x >= scaleSettings.minX && x <= scaleSettings.maxX && 
                  y >= scaleSettings.minY && y <= scaleSettings.maxY;
    
    horizontalLine.style.display = inArea ? 'block' : 'none';
    verticalLine.style.display = inArea ? 'block' : 'none';
    
    if (inArea) {
      horizontalLine.style.top = y + 'px';
      horizontalLine.style.left = scaleSettings.minX + 'px';
      verticalLine.style.left = x + 'px';
      verticalLine.style.top = scaleSettings.minY + 'px';
    }
  });
  container.addEventListener('mouseleave', function() {
    horizontalLine.style.display = 'none';
    verticalLine.style.display = 'none';
  });
});
