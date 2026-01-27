document.addEventListener('DOMContentLoaded', function() {
  const td = document.querySelector('td[background="col3hakkimda.jpg"]');
  if (!td) return;
  // Özel elementleri koru
  const galeriResmi = td.querySelector('.resim');
  const digerOzelElementler = td.querySelectorAll('.taramaheryer, .curl');
  // Container oluştur
  const container = document.createElement('div');
  container.className = 'hakkimda-container';
  container.style.position = 'relative';
  container.style.width = '267px';
  container.style.height = '529px';
  container.style.backgroundImage = 'url(col3hakkimda.jpg)';
  container.style.backgroundRepeat = 'no-repeat';
  container.style.backgroundSize = 'cover';
  // İçeriği taşı
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
  // Özel elementleri ekle
  if (galeriResmi) container.appendChild(galeriResmi);
  digerOzelElementler.forEach(el => container.appendChild(el));
  // TD'yi güncelle
  td.innerHTML = '';
  td.appendChild(container);
  // Çizgileri oluştur
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'hakkimda-line horizontal';
  const verticalLine = document.createElement('div');
  verticalLine.className = 'hakkimda-line vertical';
  const scaleSettings = {
    minX: 5,    // Başlangıç X
    maxX: 210,  // Bitiş X
    minY: 135,  // Başlangıç Y
    maxY: 330,  // Bitiş Y
    size: 30    // Tıklama alanı boyutu
  };
  // Çizgi boyutları
  horizontalLine.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  verticalLine.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';
  // Çizgileri ekle
  container.prepend(horizontalLine);
  container.prepend(verticalLine);
  // TAM ORTAYA TIKLAMA ÖZELLİĞİ (YENİ EKLENDİ)
  container.addEventListener('click', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Merkez koordinatları
    const centerX = scaleSettings.minX + (scaleSettings.maxX - scaleSettings.minX)/2;
    const centerY = scaleSettings.minY + (scaleSettings.maxY - scaleSettings.minY)/2;
    
    // Merkezdeki 10x10px'lik alana tıklanmışsa
    if (Math.abs(x - centerX) <= scaleSettings.size/2 && 
        Math.abs(y - centerY) <= scaleSettings.size/2) {
      new Audio('ding.mp3').play().catch(e => console.log("Ses çalınamadı:", e));
    }
  });
  // Fare hareketi
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
