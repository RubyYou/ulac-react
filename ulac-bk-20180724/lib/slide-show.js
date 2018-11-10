
function slideShow( type, autoSlide){
    var container = document.querySelectorAll('.slideshow');
    var numSlideShow = container.length;
    var childInfo = (!type) ? 'img' : type;

    for(var i = 0; i< numSlideShow ; i ++){
        
        var counter = 0;
        var items = container[i].querySelectorAll(childInfo);
        
        if(items.length <= 0){
            items = container[i].querySelectorAll('iframe');
            container[i].querySelectorAll('iframe')[0].className = 'show';
        } else {
            container[i].querySelectorAll(childInfo)[0].className = 'show';
        }

        var numItems = items.length;
        var next = container[i].querySelectorAll('.next');
        var prev = container[i].querySelectorAll('.prev');

        eventListener(prev[0], next[0], items, numItems, autoSlide);

    }
}

function eventListener(prev, next, items, numItems, autoSlide){
    
    var counter = 0;

    next.addEventListener('click', function(e) {
        counter ++;
        console.log('click next', autoSlide);
        showCurrent(items, numItems);
    },false );

    prev.addEventListener('click', function(e) {
        counter --;
        showCurrent(items, numItems);
    }, false);


    var showCurrent = function(){

        var itemToShow = Math.abs(counter%numItems);
        [].forEach.call( items, function(el){
            el.classList.remove('show');
        });

        items[itemToShow].classList.add('show');     
    }
    
    var autoClick = function (){
        next.click();
        setTimeout(autoClick, 4000);
    }

    if(autoSlide){
        setTimeout(autoClick, 4000);
    }

}
