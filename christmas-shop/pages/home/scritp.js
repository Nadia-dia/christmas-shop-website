// *********************************************** Burger-Menu ***********************************************8
let burgerButton = document.querySelector('.burger-button');
let navMenu = document.querySelector('.nav-menu');
let menuItemLink = document.querySelectorAll('.menu-item>.link');
let burgerLines = document.querySelectorAll('.burger-line');
const a = ''; const b = 9; const c = null;
console.log(!!(a || !b && !c));
// Burger button pressing
burgerButton.addEventListener('click',toggleMenuSamePage);

// Menu-item pressing
// Menu-item on the other page
menuItemLink[0].addEventListener('click', toggleMenuOtherPage);

// Menu-item on the same page
for (let i=1; i<menuItemLink.length; ++i){
    menuItemLink[i].addEventListener('click', toggleMenuSamePage);
    // First menu-item which goes to another page
} 

function toggleMenuSamePage(){
    burgerButton.classList.toggle('active');
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
        document.body.style.overflow = 'hidden';
    } else{
        document.body.style.overflow = '';
    }
}

function toggleMenuOtherPage(){
    navMenu.style.transition = 'left 0s, opacity 0s';
    for(let line of burgerLines){
        line.style.transition = 'transform 0s';
    }

    burgerButton.classList.toggle('active');
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
        document.body.style.overflow = 'hidden';
    } else{
        document.body.style.overflow = '';
    }
    navMenu.style.transition = 'left 0.9s ease-out, opacity 0.4s ease-out;';
    line.style.transition = 'transform 0.5s ease-out';
}

// ******************************************************* Slider ******************************************************
let numberOfClicks;
setNumberOfClicks();

let scrollIndex = 0;
let slider = document.querySelector('.slider-box');
let prevButton = document.querySelector('.arrow:first-child');
let nextButton = document.querySelector('.arrow:last-child');
// (Total width of the slider – Visible area) / Number of clicks = How far to move the slider with one click
let interval;
calculateInterval();
let currentTranslate = 0;

// Events
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
window.addEventListener('resize', ()=>{
    currentTranslate = 0;
    slider.style.transform = '';
    scrollIndex=0;
    setNumberOfClicks();
    calculateInterval();
    nextButton.classList.add('active');
    nextButton.classList.remove('disabled');
    prevButton.classList.add('disabled');
    prevButton.classList.remove('active');
})

function nextSlide(){
    if(nextButton.classList.contains('active')){
        currentTranslate -= interval;
        slider.style.transform = `translateX(${currentTranslate}px)`;
        ++scrollIndex;
    }

    if(scrollIndex == numberOfClicks){
        nextButton.classList.add('disabled');
        nextButton.classList.remove('active');
    }

    // enable prev button
    prevButton.classList.add('active');
    prevButton.classList.remove('disabled');
}

function prevSlide(){
    if(prevButton.classList.contains('active')){
        currentTranslate += interval;
        slider.style.transform = `translateX(${currentTranslate}px)`;
        --scrollIndex;
    }

    if(scrollIndex == 0){
        prevButton.classList.add('disabled');
        prevButton.classList.remove('active');
    }

    // enable next button
    nextButton.classList.add('active');
    nextButton.classList.remove('disabled');
}

function setNumberOfClicks(){
    if(window.innerWidth>768)numberOfClicks = 3;
    else numberOfClicks = 6;
}

function calculateInterval(){
    interval = (document.querySelector('.slider-box').scrollWidth - document.querySelector('.slider-box').clientWidth ) / numberOfClicks;
}

