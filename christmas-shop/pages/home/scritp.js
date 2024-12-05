// *********************************************** Burger-Menu ***********************************************
let burgerButton = document.querySelector('.burger-button');
let navMenu = document.querySelector('.nav-menu');
let menuItemLink = document.querySelectorAll('.menu-item>.link');
let burgerLines = document.querySelectorAll('.burger-line');

// Burger button pressing
burgerButton.addEventListener('click',toggleMenuSamePage);

// menu disappears when resize the window bigger than 768
window.addEventListener('resize', () =>{
    if(document.documentElement.clientWidth > 768 && 
        navMenu.classList.contains('open'))toggleMenuSamePage();
});

// Menu-item pressing
// Menu-item on the other page
if(document.documentElement.clientWidth <= 768) menuItemLink[0].addEventListener('click', toggleMenuOtherPage);

// Menu-item on the same page
for (let i=1; i<menuItemLink.length; ++i){
    if(document.documentElement.clientWidth <= 768) 
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

// ******************************************** Timer *****************************************
const newYear = new Date(Date.UTC(2025, 0, 1, 0, 0, 0, 0)); // Date in UTC+0
let intervalID;
document.addEventListener('DOMContentLoaded', ()=> intervalID = setInterval(updateTime, 1000));

updateTime();

function updateTime(){
    const currentTime = new Date(Date.now());

    const timeLeft = newYear - currentTime; // in milliseconds
    
    if(timeLeft <= 0){ // when it's already New Year
        clearInterval(intervalID);
        return;
    }

    // Calculating the numbers for timer
    const days = Math.floor( timeLeft/1000/60/60/24 );
    const hours = Math.floor( (timeLeft%(1000*60*60*24)) / 1000/60/60 );
    const minutes = Math.floor( (timeLeft%(1000*60*60)) / 1000/60 );
    const seconds = Math.floor( (timeLeft%(1000*60)) / 1000 );

    // Setting HTML elements' content
    document.querySelector('.day>.h2').textContent = days;
    document.querySelector('.hour>.h2').textContent = hours;
    document.querySelector('.minute>.h2').textContent = minutes;
    document.querySelector('.second>.h2').textContent = seconds;
}

// ******************************************************** Random Cards on home page *******************************************************************
let cards = [];
async function loadCards(){
    const response = await fetch('gifts.json');
    cards = await response.json();
}

loadCards().then(()=>{
    generateCards(4);
});


function generateCards(n){ // n is how many cards should be generated
    let usedIndexes = new Set();
    let cardsContainer = document.querySelector('.cards-container');
    while(usedIndexes.size < n){
        let randomIndex = Math.floor(Math.random()*cards.length);
        if(usedIndexes.has(randomIndex)) continue;
        usedIndexes.add(randomIndex);
        
        // Creating card-block
        let card = document.createElement('div');
        card.classList.add('card');

        // Creating text-container for card
        let cardText = document.createElement('div');
        cardText.classList.add('card-text');
        
        let cardCaption = document.createElement('h4');
        cardCaption.classList.add('card-caption');
        cardCaption.classList.add(cards[randomIndex].category.slice(4).toLowerCase());
        cardCaption.textContent = cards[randomIndex].category;
        let cardName = document.createElement('h3');
        cardName.textContent = cards[randomIndex].name;
        cardName.classList.add('card-name');

        cardText.append(cardCaption);
        cardText.append(cardName);

        // Image Node
        let url;
        switch(cards[randomIndex].category){
            case "For Work":
                url = "../../assets/images/gift-for-work.png";
                break;
            case "For Health":
                url = "../../assets/images/gift-for-health.png";
                break;
            case "For Harmony":
                url = "../../assets/images/gift-for-harmony.png";
                break;
        }

        let cardImage = document.createElement('img');
        cardImage.src = url;
        cardImage.alt = "christmas tree ball";
        cardImage.classList.add('image');
        cardImage.classList.add('card-image');

        // Adding card nodes to HTML
        card.append(cardImage);
        card.append(cardText);
        cardsContainer.append(card);

        // Add click event for modal
        card.addEventListener('click', ()=>openModal(randomIndex));
    }
}

//********************************************************* Modal ************************************************************
document.querySelector('.cross-button').addEventListener('click', closeModal);
document.querySelector('.modal-content').addEventListener('click',(event)=>{
    event.stopPropagation();
})
document.querySelector('.modal').addEventListener('click', closeModal);

function openModal(cardIndex){
    /*if(document.documentElement.clientWidth > 768){
        const layout = document.querySelector('.layout-container');
        layout.style.paddingRight = '17px';
        layout.style.maxWidth = '91.0625rem';
    }*/
    
    const modal = document.querySelector('.modal');
    modal.classList.add('open');

    const image = document.querySelector('.modal .image');
    let url;
    switch(cards[cardIndex].category){
        case "For Work":
            url = "../../assets/images/gift-for-work.png";
            break;
        case "For Health":
            url = "../../assets/images/gift-for-health.png";
            break;
        case "For Harmony":
            url = "../../assets/images/gift-for-harmony.png";
            break;
    }
    image.src = url;

    const cardCaption = document.querySelector('.modal .card-caption');
    cardCaption.textContent = cards[cardIndex].category;
    cardCaption.className = '';
    cardCaption.classList.add('card-caption');
    cardCaption.classList.add(cards[cardIndex].category.slice(4).toLowerCase());

    const cardName = document.querySelector('.modal .card-name');
    cardName.textContent = cards[cardIndex].name;

    const cardParagraph = document.querySelector('.modal .card-text .paragraph');
    cardParagraph.textContent = cards[cardIndex].description;

    //Names of powers
    const powers = document.querySelectorAll('.power>.paragraph:first-child');
    const powersJSON = Object.keys(cards[cardIndex].superpowers);
    for(let i =0; i< powers.length; ++i){
        powers[i].textContent = powersJSON[i];
    }

    //Points for each power
    const points = document.querySelectorAll('.power>.paragraph:nth-child(2)');
    const pointsJSON = Object.values(cards[cardIndex].superpowers);
    
    for(let i =0; i< powers.length; ++i){
        points[i].textContent = pointsJSON[i]; 

        let snowflakes = document.querySelectorAll(`.powers>.power:nth-child(${i+1}) > .snowflakes > svg`);
        
        snowflakes.forEach(item=>item.classList.remove('inactive'));
        console.log(snowflakes);
        let pointsInNumber = parseInt(pointsJSON[i]);
        if(pointsInNumber <= 400){
            snowflakes[4].classList.add('inactive');
        }
        if(pointsInNumber <= 300){
            snowflakes[3].classList.add('inactive');
        }
        if(pointsInNumber <= 200){
            snowflakes[2].classList.add('inactive');
        }
        if(pointsInNumber <= 100){
            snowflakes[1].classList.add('inactive');
        }
        if(pointsInNumber < 100){
            snowflakes[0].classList.add('inactive');
        }
    }

    document.body.style.overflow = 'hidden';
}

function closeModal(){
    const modal = document.querySelector('.modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    /*
    if(document.documentElement.clientWidth > 768){
        const layout = document.querySelector('.layout-container');
        layout.style.paddingRight = '';
        layout.style.maxWidth = '90rem';
    }*/
}




