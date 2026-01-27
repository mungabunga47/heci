document.addEventListener('DOMContentLoaded', function() {
  // Tablo hücresini seç
  const td = document.querySelector('td[background="ilk.jpg"]');
  
  // Eğer td elementi yoksa işlemi sonlandır
  if (!td) return;
  
  // Yeni bir container oluştur
  const container = document.createElement('div');
  container.className = 'image-container';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  
  // TD'nin içeriğini ve stilini yeni containera taşı
  container.innerHTML = td.innerHTML;
  container.style.backgroundImage = td.style.backgroundImage || 'url(ilk.jpg)';
  container.style.width = td.style.width || '700px';
  container.style.height = td.style.height || '529px';
  
  // TD'nin içeriğini temizle ve container'ı ekle
  td.innerHTML = '';
  td.appendChild(container);
  
  // Çizgi elementlerini oluştur
  const horizontalLine = document.createElement('div');
  horizontalLine.className = 'coordinate-line horizontal-line';
  
  const verticalLine = document.createElement('div');
  verticalLine.className = 'coordinate-line vertical-line';
  
  // Ölçek ayarları (örnek: 50x50 alan)
  const scaleSettings = {
   minX: 280, // Başlangıç X koordinatı
maxX: 430, // Bitiş X koordinatı
minY: 140, // Başlangıç Y koordinatı
maxY: 330 // Bitiş Y koordinatı
  };
  


  // Sınır kutusunu oluştur ve ekle
  const scaleBoundary = document.createElement('div');
  scaleBoundary.className = 'scale-boundary';
  scaleBoundary.style.left = scaleSettings.minX + 'px';
  scaleBoundary.style.top = scaleSettings.minY + 'px';
  scaleBoundary.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  scaleBoundary.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';
  
  // Elementleri containera ekle
  container.appendChild(horizontalLine);
  container.appendChild(verticalLine);
  container.appendChild(scaleBoundary);
  
  // Çizgilerin uzunluklarını ayarla
  horizontalLine.style.width = (scaleSettings.maxX - scaleSettings.minX) + 'px';
  verticalLine.style.height = (scaleSettings.maxY - scaleSettings.minY) + 'px';
  
  // Fare hareketi event listener'ı
  container.addEventListener('mousemove', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Eğer fare belirtilen ölçek alanı içindeyse
    if (x >= scaleSettings.minX && x <= scaleSettings.maxX && 
        y >= scaleSettings.minY && y <= scaleSettings.maxY) {
      // Çizgileri göster ve pozisyonlarını güncelle
      horizontalLine.style.display = 'block';
      verticalLine.style.display = 'block';
      
      // Çizgilerin pozisyonunu ölçek alanına göre ayarla
      horizontalLine.style.top = y + 'px';
      horizontalLine.style.left = scaleSettings.minX + 'px';
      
      verticalLine.style.left = x + 'px';
      verticalLine.style.top = scaleSettings.minY + 'px';
    } else {
      // Değilse çizgileri gizle
      horizontalLine.style.display = 'none';
      verticalLine.style.display = 'none';
    }
  });
  
  // Fare resmin dışına çıkınca çizgileri gizle
  container.addEventListener('mouseleave', function() {
    horizontalLine.style.display = 'none';
    verticalLine.style.display = 'none';
  });
});



// Özel tıklama alanı (EN ALTA EKLEYİN)
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('td[background="ilk.jpg"] .image-container');
  if (!container) return;
  // Koordinat ayarları (YUKARI KAYDIRILMIŞ HALİ)
  const zone = {
    minX: 280,   // X başlangıç (aynı)
    maxX: 430,   // X bitiş (aynı)
    minY: 100,   // Y başlangıç (140 yerine 100 - 40px yukarı)
    maxY: 290,   // Y bitiş (330 yerine 290 - 40px yukarı)
    size: 10     // Alan boyutu (5px yerine 10px genişlettim)
  };
  // Tıklama kontrolü
  container.addEventListener('click', function(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Belirtilen koordinat aralığında ve 10x10px'lik alanda mı?
    if (x >= zone.minX && x <= zone.maxX && 
        y >= zone.minY && y <= zone.maxY &&
        Math.abs(x - (zone.minX + (zone.maxX-zone.minX)/2)) <= zone.size/2 &&
        Math.abs(y - (zone.minY + (zone.maxY-zone.minY)/2)) <= zone.size/2) {
      e.stopPropagation();
      new Audio('ding.mp3').play().catch(e => console.log("Ses çalınamadı:", e));
    }
  });
});
