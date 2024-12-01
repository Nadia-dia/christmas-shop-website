let burgerButton = document.querySelector('.burger-button');
let navMenu = document.querySelector('.nav-menu');
burgerButton.addEventListener('click',()=>{
    burgerButton.classList.toggle('active');
    navMenu.classList.toggle('open');
})