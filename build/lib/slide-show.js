function slideShow(){
    var counter = 0, // to keep track of current slide

    var container = document.querySelectorAll('.slideshow');

    [].forEach.call(container, fuction(){
        var children = container.childNodes;
        var list = children.getElementsByTagName('img')
    });

    // original
    $items = document.querySelectorAll('.slideshow img'), // a collection of all of the slides, caching for performance
    
    numItems = $items.length; // total number of slides

    // this function is what cycles the slides, showing the next or previous slide and hiding all the others
    var showCurrent = function(){
        var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
        
        console.log(itemToShow);

        // http://stackoverflow.com/a/16053538/2006057
        [].forEach.call( $items, function(el){
            el.classList.remove('show');
        });
  
        // add .show to the one item that's supposed to have it
        $items[itemToShow].classList.add('show');    
    };

    /* add click events to prev & next buttons */

    var next = document.getElementsByClassName('next')[0];
    var prev = document.getElementsByClassName('prev')[0];

    next.addEventListener('click', function(e) {
        counter ++;
        showCurrent();
    },false );

    prev.addEventListener('click', function(e) {
        counter --;
        showCurrent();
    }, false);
}
