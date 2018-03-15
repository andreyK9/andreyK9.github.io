
scrollSection('.sec_1', '.sec_2', 'down');
scrollSection('.sec_2', '.sec_3', 'down');
scrollSection('.sec_2', '.sec_1', 'up');
scrollSection('.sec_3', '.sec_2', 'up');

// scrollDown link -----------------------------
var scrollDown = document.querySelector('#scrollDown');

scrollDown.addEventListener('click', function (event) {

    event.preventDefault();

    var sec_2 = document.querySelector('.sec_2');

    smoothScroll(sec_2);
});

// toggle scroll default -----------------------------
var year = document.querySelector('#year');

year.style.background = '-webkit-linear-gradient(left ,#d1eaff 1%,rgba(209, 234, 255,.2) 1%, rgba(209, 234, 255,.2) 97%, transparent 97% )';

// right mnu -----------------------------------

var fp_nav = document.querySelectorAll('#fp-nav a');
var sec_1 = document.querySelector('.sec_1');
var sec_2 = document.querySelector('.sec_2');
var sec_3 = document.querySelector('.sec_3');

for (var i = 0; i < fp_nav.length; i++) {
    
        if (i === 0) {
            fp_nav[0].addEventListener('click', function (event) {

                event.preventDefault();

                smoothScroll(sec_1);
            });
            
        }
        else if(i === 1) {
            fp_nav[1].addEventListener('click', function (event) {
                
                event.preventDefault();

                smoothScroll(sec_2);
            });
        }
        else {
            fp_nav[2].addEventListener('click', function (event) {
                
                event.preventDefault();

                smoothScroll(sec_3);
            });
        }
}

window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if(!fp_nav[0].classList.contains('active') && scrolled < 700 )
        toggleActiveClick(0);
    if(!fp_nav[1].classList.contains('active') && scrolled >= 70 && scrolled < 1450 )
        toggleActiveClick(1);
    if(!fp_nav[2].classList.contains('active') && scrolled >= 1450 )
        toggleActiveClick(2);

    if(scrolled > 0)
        scrollDown.style.opacity = '0';
    else
        scrollDown.style.opacity = '1';
}

function toggleActiveClick(link_numb) {
    var active = document.querySelector('#fp-nav a.active');
    active.classList.remove('active');
    fp_nav[link_numb].classList.add('active');
}


function fun1() {
    var rng=document.getElementById('year');
    var vol = +rng.value;

    if(vol < 60)
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff '+(vol + 1)+'%,rgba(209, 234, 255,.2) '+(vol + 1)+'%, rgba(209, 234, 255,.2) 97%, transparent 97% )';
    else if(vol < 96)
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff '+ (vol - 2 ) +'%,rgba(209, 234, 255,.2) '+ (vol - 2 ) +'%, rgba(209, 234, 255,.2) 97%, transparent 97% )';
    else    
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff 94%,rgba(209, 234, 255,.2) 94%, rgba(209, 234, 255,.2) 97%, transparent 97% )';

    // scroll ----------------------------------------------------------

    var sec_3 = document.querySelectorAll('.sec_3 .slide');
    if( vol <= 25)
        for(var i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(0)';
    else if(vol > 25 && vol <= 75)
        for(var i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(-100vw)';
    else 
        for(var i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(-200vw)';
}


function scrollSection(sectionBegin, sectionFinish, direction) {

    var scrBtn = document.querySelector(sectionBegin);
    var scrFnsh = document.querySelector(sectionFinish);

    var touchstartX = 0;
    var touchstartY = 0;
    var touchendX = 0;
    var touchendY = 0;

    scrBtn.addEventListener('touchstart', function(event) {
        touchstartY =  event.touches["0"].clientY;
    }, false);


    scrBtn.addEventListener('touchend', function(event) {
        touchendY = event.changedTouches["0"].clientY;
        handleGesure(touchstartX, touchstartY, touchendX, touchendY, direction, scrFnsh);
    }, false); 

}

function handleGesure(touchstartX, touchstartY, touchendX, touchendY, direction, sectionFinish) {

    if ( direction === 'down' && touchendY < touchstartY  ) {
        smoothScroll(sectionFinish);
    }
    if ( direction === 'up' && touchendY > touchstartY ) {
        if(touchstartY > 600)
            return;
        smoothScroll(sectionFinish);
    }
}

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = eID;
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 1300);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 1000);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;

    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}