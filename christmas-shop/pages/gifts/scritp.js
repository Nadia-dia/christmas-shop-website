// *********************************************** Burger-Menu ***********************************************
let burgerButton = document.querySelector('.burger-button');
let navMenu = document.querySelector('.nav-menu');
let menuItemLink = document.querySelectorAll('.menu-item>.link');
let burgerLines = document.querySelectorAll('.burger-line');

// Burger button pressing
burgerButton.addEventListener('click',toggleMenuSamePage);

// Menu-item pressing
// Menu-item on the same page
menuItemLink[0].addEventListener('click', toggleMenuSamePage);
menuItemLink[3].addEventListener('click', toggleMenuSamePage);

// Menu-item on the other page
for (let i=2; i<menuItemLink.length-1; ++i){
    menuItemLink[i].addEventListener('click', toggleMenuOtherPage);
    // Second&third menu-item which goes to another page
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

// *********************************************** Random Cards ***********************************************
let cards = [];
async function loadCards(){
    const response = await fetch('../home/gifts.json');
    cards = await response.json();
}

loadCards().then(()=>{
    generateCards(cards.length);
});


function generateCards(n, category){ // n is how many cards should be generated
    console.log(n);
    console.log(category);
    let usedIndexes = new Set();
    let cardsContainer = document.querySelector('.cards-container');

    // establishing how many cards and which indexes the should have according to the chosen category 
    let startIndex;
    let endIndex;
    let cardsForCategory = cards.length / 3;
    switch(category){
        case "For Work":
            startIndex = 0;
            endIndex = (startIndex + cardsForCategory) - 1;
            n /= 3;
            break;
        case "For Health":
            startIndex = cards.length / 3;
            endIndex = (startIndex + cardsForCategory) - 1;
            n /= 3;
            break;
        case "For Harmony":
            startIndex = (cards.length / 3) * 2;
            endIndex = (startIndex + cardsForCategory) - 1;
            n /= 3;
            break;
        default:
            startIndex = 0;
            endIndex = cards.length - 1;
            break;
    }

    while(usedIndexes.size < n){
        let randomIndex;
        do{
            randomIndex = Math.floor(Math.random()*cards.length);
        } while (usedIndexes.has(randomIndex) || randomIndex < startIndex || randomIndex > endIndex);
        usedIndexes.add(randomIndex);
        
        // Creating card-block
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('show');
        

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
        console.log(randomIndex);
    }
}

//********************************************************* Category switching ************************************************************
let tabItems = document.querySelectorAll('.tab-item>.link');
for(let item of tabItems){
        item.addEventListener('click', ()=>{
            tabItems.forEach((tab)=>tab.classList.remove('active'));
            item.classList.add('active');        
        });
        item.addEventListener('click', ()=>{
            const cardsContainer = document.querySelector('.cards-container');
            cardsContainer.innerHTML ='';
            generateCards(cards.length, item.textContent);
        });

}     

//********************************************************* Scroll-to-Top ************************************************************
let scrollButton = document.querySelector('.scroll-button');
window.addEventListener('scroll', checkScrollHeight);
scrollButton.addEventListener('click', goTop);

function checkScrollHeight(){
    if((document.body.scrollTop > 300 || document.documentElement.scrollTop>300) && document.documentElement.clientWidth <= 768){
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}

function goTop(){
    document.documentElement.scrollTop = 0; // for Chrome, Firefox, Opera, IE
    document.body.scrollTop = 0; // for Safari
}

//********************************************************* Modal ************************************************************

function addModal(index){

}
