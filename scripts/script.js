'use strict';

const headerCityButton = document.querySelector('.header__city-button');

/*
if (localStorage.getItem('Lomoda-Location')) {
    headerCityButton.textContent = localStorage.getItem('Lomoda-Location');
}
*/
headerCityButton.textContent = localStorage.getItem('Lomoda-Location') || "Ваш город?";

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите Ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('Lomoda-Location', city);
});


// modal window

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
};


subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    /*
    if (target.classList.contains('cart__btn-close')) {cartModalClose();}
    */
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
});