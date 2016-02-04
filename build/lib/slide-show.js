
function slideShow(){
    var container = document.querySelectorAll('.slideshow');
    var numSlideShow = container.length;

    for(var i = 0; i< numSlideShow ; i ++){
        
        var counter = 0;
        var items = container[i].querySelectorAll('img');
        
        if(items.length <= 0){
            items = container[i].querySelectorAll('iframe');
            container[i].querySelectorAll('iframe')[0].className = 'show';
        } else {
            container[i].querySelectorAll('img')[0].className = 'show';
        }

        var numItems = items.length;
        var next = container[i].querySelectorAll('.next');
        var prev = container[i].querySelectorAll('.prev');

        eventListener(prev[0], next[0], items, numItems);
    }
}

function eventListener(prev, next, items, numItems){
    
    var counter = 0;

    next.addEventListener('click', function(e) {
        counter ++;
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

}

