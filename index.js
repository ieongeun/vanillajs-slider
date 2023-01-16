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
let slideWidth = window.innerWidth;
let slideIdx = 0;
let preSlideIdx = slideIdx;
slider.scrollLeft = (slideWidth * (slideIdx + 1));

function moveSlide(direction) {
    preSlideIdx = slideIdx;
    slideIdx += direction;
    slider.scroll({left:(slideWidth * (slideIdx + 1)), behavior:'smooth'});
    if (slideIdx  == -1 || slideIdx == slideLength ) {
        if (slideIdx == -1 ) {
            slideIdx = slideLength - 1;
        } else {
            slideIdx = 0;
        }
        setTimeout(function name(params) {
            slider.scrollLeft = (slideWidth * (slideIdx + 1));
        },500)
    }
    activePagination();
}

window.addEventListener('resize',function () {
    slideWidth = window.innerWidth;
    slider.scroll({left:(slideWidth * (slideIdx + 1)), behavior:'smooth'});
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
            slider.scroll({left:(slideWidth * (slideIdx + 1)), behavior:'smooth'})
        }
    })

    slider.addEventListener('touchmove',function name(e) {
        moveX = e.touches[0].clientX;
        diffX = startX -moveX;
        slider.scrollLeft = (slideWidth * (slideIdx + 1))+ diffX;
    });

    // 페이지네이션
    const paginationWrap = document.querySelector('#slider-wrap ul.pagination-wrap');
    for (let i = 0; i < slideLength; i++) {
        const paginationItem = document.createElement('li');
        paginationWrap.appendChild(paginationItem);
    }
    const pagination = document.querySelectorAll('#slider-wrap ul.pagination-wrap li');
    pagination[slideIdx].classList.add('active');
    // paginationItem.setAttribute('','');

    function activePagination(params) {
        pagination[preSlideIdx].classList.remove('active');
        pagination[slideIdx].classList.add('active');
    }

    pagination.forEach((item,index) => {
        item.addEventListener('click',function name() {
            preSlideIdx = slideIdx;
            slideIdx = index;
            slider.scroll({left:(slideWidth * (slideIdx + 1)), behavior:'smooth'})
            activePagination();
        })
    });