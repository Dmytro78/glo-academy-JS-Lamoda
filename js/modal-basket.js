'use strict';

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
     disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    window.addEventListener("keydown", closeEsc);
    enableScroll();
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

// close Esc

function closeEsc(e) {
    if (e.code === "Escape") {
        cartModalClose(e);
    }
}

// scroll-lock

/*
const disableScroll = () => { document.body.style.overflow = 'hidden'; };
const enableScroll = () => { document.body.style.overflow = '';};
*/

const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};
const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
};