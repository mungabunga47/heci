
document.addEventListener('DOMContentLoaded', function() {

    var tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#8eb7cb';  
    tooltip.style.color = 'white';           
    tooltip.style.padding = '15px';
    tooltip.style.borderRadius = '12px';
    tooltip.style.fontSize = '14px'; 
    tooltip.style.display = 'none';           
    tooltip.style.zIndex = '10000';
    document.body.appendChild(tooltip);
    var links = document.querySelectorAll('a[title]');
    links.forEach(function(link) {
        link.addEventListener('mouseover', function(event) {
            tooltip.innerHTML = this.getAttribute('title'); 
            tooltip.style.display = 'block';  // Göster
            tooltip.style.left = event.pageX + 'px'; 
            tooltip.style.top = (event.pageY + 20) + 'px';
        });
        link.addEventListener('mousemove', function(event) {
            tooltip.style.left = event.pageX + 'px'; 
            tooltip.style.top = (event.pageY + 20) + 'px'; 
        });
        link.addEventListener('mouseout', function() {
            tooltip.style.display = 'none'; 
        });
    });
});
