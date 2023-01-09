const sliderWrap = document.querySelector('#slider-wrap');
const slider = document.querySelector('#slider-wrap #slider');
const slide = document.querySelectorAll('#slider-wrap .slide');
const btns = document.querySelectorAll('#slider-wrap .slider-btn-wrap');

let slideIdx = 0;
let lastSlideIdx = slide.length -1;

for (const btn of btns) {
    btn.addEventListener('click',function name(e) {
        moveSlide(e.target.className);
    })
}

function moveSlide(direction) {
    if (direction == 'next') {
        slideIdx = (slideIdx === lastSlideIdx) ? 0 : ++slideIdx;
        console.log(slideIdx);
    } else {
        slideIdx = (slideIdx === 0) ? lastSlideIdx : --slideIdx;
        console.log(slideIdx);
    }
    slider.scroll({left:(window.innerWidth * slideIdx), behavior:'smooth'});
}