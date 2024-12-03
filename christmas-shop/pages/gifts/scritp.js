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
    }
}
