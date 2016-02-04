function slideShow(){

    
    var container = document.querySelectorAll('.slideshow');
    
    var numSlideShow = container.length;

    for(var i = 0; i< numSlideShow ; i ++){
        var items = container[i].querySelectorAll('img');
        var numItems = items.length;
        var next = container[i].querySelectorAll('.next');
        var prev = container[i].querySelectorAll('.prev');

        next.addEventListener('click', function(e) {
            counter ++;
            showCurrent(items, numItems);
        },false );

        prev.addEventListener('click', function(e) {
            counter --;
            showCurrent(items, numItems);
        }, false);
    }
}

function showCurrent(items, numItems){
    
    var counter = 0; // to keep track of current slide

    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
    
    // http://stackoverflow.com/a/16053538/2006057
    [].forEach.call( items, function(el){
        el.classList.remove('show');
    });

    // add .show to the one item that's supposed to have it
    items[itemToShow].classList.add('show');    
};

