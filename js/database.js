'use strict';

const getData = async () => {
    const data = await fetch('db.json');
    if (data.ok) {
       return data.json()
    } else {
        throw new Error(`Данныенебыли получены, ошибка ${data.status} ${data.statusText}`)
    }
};

const getGoods = (callback) => {
    getData()
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err)
        });
};

getGoods((data) => {
    console.warn(data);
});

// уневерсальная функция

/*     
const getData = async () => {
    const data = await fetch('db.json');
    if (data.ok) {
       return data.json()
    } else {
        throw new Error(`Данныенебыли получены, ошибка ${data.status} ${data.statusText}`)
    }
};

getData()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err)
    });
*/