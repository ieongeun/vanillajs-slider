const sliderWrap = document.querySelector('#slider-wrap');
const slider = document.querySelector('#slider-wrap #slider');
const slide = document.querySelectorAll('#slider-wrap .slide');
const btns = document.querySelectorAll('#slider-wrap .slider-btn-wrap');

let slideIdx = 0;
let btnDisabled = true;

firstSilde = slide[0];
lastSilde = slide[slide.length-1];

firstSildeNode = firstSilde.cloneNode(true);
lastSildeNode = lastSilde.cloneNode(true);

firstSilde.before(lastSildeNode);
lastSilde.after(firstSildeNode);


for (const btn of btns) {
    btn.addEventListener('click',function name(e) {
        e.target.setAttribute('disabled','disabled');
        setTimeout(() => {
            e.target.removeAttribute('disabled')
        }, 500);
        e.target.className == 'next' ? moveSlide(1): moveSlide(-1);
    })
}

let slideLength = slide.length;
let clonedSlideLength = slide.length + 2;
let firstSildeIdx = 1;
let lastSlideIdx = slide.length;
let slideWidth = window.innerWidth;

function moveSlide(direction) {
    slideIdx += direction;
    slider.scroll({left:(slideWidth * slideIdx), behavior:'smooth'});
    if (slideIdx == 0 || slideIdx == clonedSlideLength - 1) {
        if (slideIdx == 0 ) {
            slideIdx = lastSlideIdx;
        } else {
            slideIdx = firstSildeIdx;
        }
        setTimeout(function name(params) {
            slider.scrollLeft = (slideWidth * slideIdx);
        },500)
    }
}

window.addEventListener('resize',function () {
    slideWidth = window.innerWidth;
    slider.scroll({left:(slideWidth * slideIdx), behavior:'smooth'});
})