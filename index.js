'use strict';
// import "./js/city.js";
// import "./js/modal-basket.js";
// import "./js/goods-pages.js";
// import "./js/cards-good.js";
// import "./js/database.js";
// import "./js/scroll-lock.js";

let hash = location.hash.substring(1);
const cartListGoods = document.querySelector('.cart__list-goods');
const cartTotalCost = document.querySelector('.cart__total-cost');


// city

const headerCityButton = document.querySelector('.header__city-button');

const updateLocation = () => {
    const isLocation = localStorage.getItem('lomoda-location');

    headerCityButton.textContent =
        isLocation && isLocation !== 'null' ?
            isLocation :
            'Ваш город?';
};

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите Ваш город');
    if (city !== null) {
        localStorage.setItem('lomoda-location', city);
    }
    updateLocation();
});
updateLocation();

const getLocalStorage = () => JSON?.parse(localStorage.getItem('cart-lomoda')) || [];
const setLocalStorage = data => localStorage.setItem('cart-lomoda', JSON.stringify(data));

const renderCart = () => {
    cartListGoods.textContent = '';

    const cartItems = getLocalStorage();

    let totalPrice = 0;

    cartItems.forEach((item, i) => {

        const tr = document.createElement('tr');

        tr.innerHTML =
            `
            <td>${i+1}</td>
            <td>${item.brand} ${item.name}</td>
            ${item.color ? `<td>${item.color}</td>` : '<td>-</td>'}
            ${item.size ? `<td>${item.size}</td>` : '<td>-</td>'}
            <td>${item.cost} &#8381;</td>
            <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
        `;

        totalPrice += item.cost;

        cartListGoods.append(tr);
    });

    cartTotalCost.textContent = totalPrice + ' ₽';
};

const deleteItemCart = id => {
    const cartItems = getLocalStorage();
    const newCartItems = cartItems.filter(item => item.id !== id);
    setLocalStorage(newCartItems);
};

cartListGoods.addEventListener('click', e => {
    if (e.target.matches('.btn-delete')) {
        deleteItemCart(e.target.dataset.id);
        renderCart();
    }
});


// open-close

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
    renderCart();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    window.addEventListener("keydown", closeEsc);
    enableScroll();
};


subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
    const target = e.target;
    
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

const getData = async () => {
    const data = await fetch('db.json');
    if (data.ok) {
        return data.json();
    } else {
        throw new Error(`Данные небыли получены, ошибка ${data.status} ${data.statusText}`);
    }
};

const getGoods = (callback, prop, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item[prop] === value));
            }
            else {
                callback(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
};

//goods pages

try {

    const goodsList = document.querySelector('.goods__list');

    if (!goodsList) {
        throw 'This is not a goods page';
    }

    const goodsTitle = document.querySelector('.goods__title');

    const changeTitle = () => {
        goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
    };

    const createCard = ({ id, preview, cost, brand, name, sizes }) => {

            const li = document.createElement('li');

            li.classList.add('goods__item');
            li.innerHTML = `
        <article class="good">
        <a class="good__link-img" href="card-good.html#${id}">
            <img class="good__img" src="goods-image/${preview}" alt="">
        </a>
        <div class="good__description">
            <p class="good__price">${cost} EUR;</p>
            <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
            ${sizes ? 
                `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
            ' '}
            <a class="good__link" href="card-good.html#${id}">Подробнее</a>
        </div>
    </article>
        `;

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach(item => {
            const card = createCard(item);
            goodsList.append(card);
        });
    };

    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        changeTitle();
        getGoods(renderGoodsList, 'category', hash);
    });

    changeTitle();
    getGoods(renderGoodsList, 'category', hash);

} catch (err) {
    console.warn(err);
}


//card good

try {

    if (!document.querySelector('.card-good')) {
        throw 'This is not a card-good page';
    }

    const cardGoodImage = document.querySelector('.card-good__image');
    const cardGoodBrand = document.querySelector('.card-good__brand');
    const cardGoodTitle = document.querySelector('.card-good__title');
    const cardGoodPrice = document.querySelector('.card-good__price');
    const cardGoodColor = document.querySelector('.card-good__color');
    const carGgoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');
    const cardGoodColorList = document.querySelector('.card-good__color-list');
    const cardGoodSizes = document.querySelector('.card-good__sizes');
    const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
    const cardGoodBuy = document.querySelector('.card-good__buy');

    const generateList = data => data.reduce((html, item, i) => html + 
        `<li class="card-good__select-item" data-id="${i}">${item}</li>`, '');

    const renderCardGood = ([{id, brand, name, cost, color, sizes, photo}]) => {
        
        const data = { brand, name, cost, id };

        cardGoodImage.src = `goods-image/${photo}`;
        cardGoodImage.alt = `${brand} ${name}`;
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name;
        cardGoodPrice.textContent = `${cost} ₽`;        
        if (color) {
            cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = generateList(color);
        } else {
            cardGoodColor.style.display = 'none';
        }

        if(sizes) {
            cardGoodSizes.textContent = sizes[0];
            cardGoodSizes.dataset.id = 0;
            cardGoodSizesList.innerHTML = generateList(sizes);
        } else {
            cardGoodSizes.style.display = 'none';
        }

        if (getLocalStorage().some(item => item.id === id)) {
            cardGoodBuy.classList.add('delete');
            cardGoodBuy.textContent = 'Удалить из корзины';
        }

        cardGoodBuy.addEventListener('click', () => {
            if (cardGoodBuy.classList.contains('delete')) {
                deleteItemCart(id);
                 cardGoodBuy.classList.remove('delete');
                cardGoodBuy.textContent = 'Добавить в корзину';
                return;
            }
            if (color) data.color = cardGoodColor.textContent;
            if (sizes) data.size = cardGoodSizes.textContent;

            cardGoodBuy.classList.add('delete');
            cardGoodBuy.textContent = 'Удалить из корзины';

            const cardData = getLocalStorage();
            cardData.push(data);
            setLocalStorage(cardData);
        });
    };

        carGgoodSelectWrapper.forEach(item => {
        item.addEventListener('click', e => {
            const target = e.target;
            
            if (target.closest('.card-good__select')) {
                target.classList.toggle('card-good__select__open');
            }

            if (target.closest('.card-good__select-item')) {
                const cardGoddSelect = item.querySelector('.card-good__select');
                cardGoddSelect.textContent = target.textContent;
                cardGoddSelect.dataset.id = target.dataset.id;
                cardGoddSelect.classList.remove('card-good__select__open');
            }

        });
    });

    getGoods(renderCardGood, 'id', hash);
} catch (err) {
    console.warn(err);
}