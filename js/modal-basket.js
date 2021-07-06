'use strict';

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    window.addEventListener("keydown", closeEsc);
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

function closeEsc(e) {
    if (e.code === "Escape") {
        cartModalClose(e);
    }
}