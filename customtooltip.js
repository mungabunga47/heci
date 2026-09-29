document.addEventListener('DOMContentLoaded', function() {

    var tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#8eb7cb';  
    tooltip.style.color = 'white'
    tooltip.style.padding = '8px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.fontSize = '15px'; 
    tooltip.style.display = 'none';           
    tooltip.style.zIndex = '10000';
    

    tooltip.style.border = '1px solid'; 
    tooltip.style.borderColor = 'white'; 

    document.body.appendChild(tooltip);
    
   
    var typingInterval; 

    var links = document.querySelectorAll('a[title]');
    links.forEach(function(link) {
        link.addEventListener('mouseover', function(event) {
           
            clearInterval(typingInterval);
            
            var fullText = this.getAttribute('title'); 
            tooltip.innerHTML = ''; 
            tooltip.style.display = 'block'; 
            tooltip.style.left = event.pageX + 'px'; 
            tooltip.style.top = (event.pageY + 20) + 'px';

      
            var index = 0;
            var speed = 30; 
            
            typingInterval = setInterval(function() {
                if (index < fullText.length) {
                    tooltip.innerHTML += fullText.charAt(index);
                    index++;
                } else {
                    clearInterval(typingInterval); 
                }
            }, speed);
        });

        link.addEventListener('mousemove', function(event) {
            tooltip.style.left = event.pageX + 'px'; 
            tooltip.style.top = (event.pageY + 20) + 'px'; 
        });

        link.addEventListener('mouseout', function() {
            clearInterval(typingInterval); 
            tooltip.style.display = 'none'; 
            tooltip.style.innerHTML = '';
        });
    });
});
