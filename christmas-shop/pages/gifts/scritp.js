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
// Menu-item on the same page
menuItemLink[0].addEventListener('click', ()=>{
    if(document.documentElement.clientWidth <= 768)toggleMenuSamePage();
});
menuItemLink[3].addEventListener('click', ()=>{
    if(document.documentElement.clientWidth <= 768)toggleMenuSamePage();
});

// Second&third menu-item which goes to another page
// Menu-item on the other page
menuItemLink[1].addEventListener('click', ()=>{
    if(document.documentElement.clientWidth <= 768)toggleMenuOtherPage();
});
menuItemLink[2].addEventListener('click', ()=>{
    if(document.documentElement.clientWidth <= 768)toggleMenuOtherPage();
});

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

        // Add card nodes to HTML
        card.append(cardImage);
        card.append(cardText);
        cardsContainer.append(card);
        console.log(randomIndex);

        // Add click event for modal
        card.addEventListener('click', ()=>openModal(randomIndex));
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
    console.log(document.body.scrollTop);
    console.log(document.documentElement.scrollTop);
    
    if((document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) && document.documentElement.clientWidth <= 768){
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
document.querySelector('.cross-button').addEventListener('click', closeModal);
document.querySelector('.modal-content').addEventListener('click',(event)=>{
    event.stopPropagation();
})
document.querySelector('.modal').addEventListener('click', closeModal);

function openModal(cardIndex){
    /*
    if(document.documentElement.clientWidth > 768){
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
