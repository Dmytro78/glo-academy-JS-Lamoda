'use strict';

const headerCityButton = document.querySelector('.header__city-button');

/*
if (localStorage.getItem('Lomoda-Location')) {
    headerCityButton.textContent = localStorage.getItem('Lomoda-Location');
}
*/
headerCityButton.textContent = localStorage.getItem('Lomoda-Location') || 'Ваш город?';


headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите Ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('Lomoda-Location', city);
});
