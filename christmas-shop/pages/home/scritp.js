let burgerButton = document.querySelector('.burger-button');
let navMenu = document.querySelector('.nav-menu');
let menuItemLink = document.querySelectorAll('.menu-item>.link');

// Burger button pressing
burgerButton.addEventListener('click',toggleMenu);
// Menu-item pressing
for (let item of menuItemLink){
    item.addEventListener('click', toggleMenu);
} 

function toggleMenu(){
    burgerButton.classList.toggle('active');
    navMenu.classList.toggle('open');
    if(navMenu.classList.contains('open')){
        document.body.style.overflow = 'hidden';
    } else{
        document.body.style.overflow = '';
    }
}

