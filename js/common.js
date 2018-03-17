'use strict';

scrollSection('.sec_1', '.sec_2', 'down');
scrollSection('.sec_2', '.sec_3', 'down');
scrollSection('.sec_2', '.sec_1', 'up');
scrollSection('.sec_3', '.sec_2', 'up');

// scrollDown link -----------------------------
const scrollDown = document.querySelector('#scrollDown');

scrollDown.addEventListener('click', function (event) {

    event.preventDefault();

    const sec_2 = document.querySelector('.sec_2');

    smoothScroll(sec_2);
});

// toggle scroll default -----------------------------
const year = document.querySelector('#year');

year.style.background = '-webkit-linear-gradient(left ,#d1eaff 1%,rgba(209, 234, 255,.2) 1%, rgba(209, 234, 255,.2) 97%, transparent 97% )';

// right mnu -----------------------------------

const fp_nav = document.querySelectorAll('#fp-nav a');
const sec_1 = document.querySelector('.sec_1');
const sec_2 = document.querySelector('.sec_2');
const sec_3 = document.querySelector('.sec_3');

for (let i = 0; i < fp_nav.length; i++) {

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
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;

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
};

function toggleActiveClick(link_numb) {
    let active = document.body.querySelector('.active');
    active.classList.remove('active');
    fp_nav[link_numb].classList.add('active');
}


function fun1() {
    const rng=document.getElementById('year');
    let vol = +rng.value;

    if(vol < 60)
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff '+(vol + 1)+'%,rgba(209, 234, 255,.2) '+(vol + 1)+'%, rgba(209, 234, 255,.2) 97%, transparent 97% )';
    else if(vol < 96)
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff '+ (vol - 2 ) +'%,rgba(209, 234, 255,.2) '+ (vol - 2 ) +'%, rgba(209, 234, 255,.2) 97%, transparent 97% )';
    else
        rng.style.background = '-webkit-linear-gradient(left ,#d1eaff 94%,rgba(209, 234, 255,.2) 94%, rgba(209, 234, 255,.2) 97%, transparent 97% )';

    // scroll ----------------------------------------------------------

    const sec_3 = document.querySelectorAll('.sec_3 .slide');
    if( vol <= 25)
        for(let i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(0)';
    else if(vol > 25 && vol <= 75)
        for(let i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(-100vw)';
    else
        for(let i = 0; i < sec_3.length; i++)
            sec_3[i].style.transform = 'translateX(-200vw)';
}


function scrollSection(sectionBegin, sectionFinish, direction) {

    const scrBtn = document.querySelector(sectionBegin);
    const scrFnsh = document.querySelector(sectionFinish);

    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

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
    let elm = eID;
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    let startY = currentYPosition();
    let stopY = elmYPosition(eID);
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    let speed = Math.round(distance / 1300);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 1000);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;

    if (stopY > startY) {
        for ( let i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( let i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}