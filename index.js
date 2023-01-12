const sliderWrap = document.querySelector('#slider-wrap');
const slider = document.querySelector('#slider-wrap #slider');
const slide = document.querySelectorAll('#slider-wrap .slide');
const btns = document.querySelectorAll('#slider-wrap .slider-btn-wrap');


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
let lastSlideIdx = slideLength;
let slideWidth = window.innerWidth;
let slideIdx = 4; // 이거 하드코딩이다 
slider.scrollLeft = (slideWidth * slideIdx);

function moveSlide(direction) {
    slideIdx += direction;
    console.log(slideIdx);
    slider.scroll({left:(slideWidth * slideIdx), behavior:'smooth'});
    if (slideIdx <= 0 || slideIdx == clonedSlideLength - 1) {
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


    let startX;
    let endX;
    let diffX;

    slider.addEventListener('touchstart',function name(e) {
        startX = e.touches[0].clientX;
    })

    slider.addEventListener('touchend',function name(e) {
        endX = e.changedTouches[0].clientX;
        diffX = startX - endX;
        if(Math.abs(diffX)>= window.innerWidth / 2) {
            (diffX > 0) ? moveSlide(1): moveSlide(-1);
        }else{
            slider.scroll({left:(slideWidth * slideIdx), behavior:'smooth'})
        }
    })

    slider.addEventListener('touchmove',function name(e) {
        moveX = e.touches[0].clientX;
        diffX = startX -moveX;
        slider.scrollLeft = (slideWidth * slideIdx)+ diffX;
    });

    // 페이지네이션
    const pagination = document.querySelector('#slider-wrap ul.pagination-wrap');
    for (let i = 0; i < slideLength; i++) {
        const paginationItem = document.createElement('li');
        pagination.appendChild(paginationItem);
    }
    // paginationItem.setAttribute('','');