function DeleteElements(name) {
    const elements = document.getElementsByClassName(name);
    while (elements.length > 0)
            elements[0].remove();
}

function PrintBasket(result) {
    DeleteElements('basket_element');

    const basket = document.getElementsByClassName('popup');
    const basket_length = document.getElementsByClassName('basket_length');

    basket[0].insertAdjacentHTML('beforeend', '<h2 align = "center" class=\"basket_element\">Корзина</h2>');

    basket_length[0].insertAdjacentHTML('afterbegin', '<label class=\"basket_element\">Товаров в корзине: ' + result[0].length + ' </label>');
    console.log(result);

    let number = 1;
    for(var i in result[1]) {
        let car = '<p class=\"basket_element\">' + number + '. ' + result[1][i]['brand'] + ' ' + result[1][i]['model'] + ' ' + result[1][i]['price'] + ' руб. <button onclick=\"DeleteFromBasket(' + result[1][i]['car_id'] + ', \'CAR\')\">Удалить</button></p>';
        basket[0].insertAdjacentHTML('beforeend', car);
        number += 1;
    }

    for(var i in result[2]) {
        let item = '<p class=\"basket_element\">' + number + '. ' + result[2][i]['name'] + ' ' + result[2][i]['price'] + ' руб. <button onclick=\"DeleteFromBasket(' + result[2][i]['id'] + ', \'ITEM\')\">Удалить</button></p>';
        basket[0].insertAdjacentHTML('beforeend', item);
        number += 1;
    }

    basket[0].insertAdjacentHTML('beforeend', '<p class=\"basket_element\"><button onclick="BuyBasket()">Оформить</button> <button onclick="DeleteFromBasketAll()">Удалить всё</button></p>');
}

function AddToBasket() {
    let id = localStorage.getItem('sale_id');
    let type = localStorage.getItem('sale_type');
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/addbasket`;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            alert('Товар добавлен в корзину!');
            GetBasket();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    AddToBasket();
            });
        } else if (xhr.status == 409 && xhr.readyState == 4) {
            alert('Этот товар уже в корзине!');
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    var data = JSON.stringify({ 
        "product_id": id, 
        "product_type": type
    });

    xhr.send(data);
}

function BuyBasket() {
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/buycar`;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            alert('Заказ успешно создан!');
            localStorage.setItem('order_id', JSON.parse(xhr.response)['id']);
            window.location = "payment.html";
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    buyBasket();
            });
        } else if (xhr.status == 409 && xhr.readyState == 4) {
            alert('В корзине пусто!');
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function GetBasket() {
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/getbasket`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            PrintBasket(JSON.parse(xhr.response));
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    GetBasket();
            });
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function DeleteFromBasket(id, type) {
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/deletebasket?product_id=${id}&product_type=${type}`;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            GetBasket();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    DeleteFromBasket();
            });
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function DeleteFromBasketAll() {
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/deletebasketall`;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            GetBasket();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    DeleteFromBasketAll();
            });
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}