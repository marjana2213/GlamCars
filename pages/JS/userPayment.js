function PrintInformation(result) {
    const id = document.querySelector('#id');
    const products = document.querySelector('#products');
    const person = document.querySelector('#person');
    const price = document.querySelector('#price');

    id.insertAdjacentHTML('beforeend', result['id']);

    let number = 1;
    let sum = 0;
    let productText = '';
    let personText = '';

    for(var i in result['products'][0]) {
        productText += '<h3>' + number + '. ' + result['products'][0][i]['brand'] + ' ' + result['products'][0][i]['model'] + ' ' + result['products'][0][i]['price'] + ' руб.</h3>';
        number += 1;
        sum += result['products'][0][i]['price'];
    }

    for(var i in result['products'][1]) {
        productText += '<h3>' + number + '. ' + result['products'][1][i]['name'] + ' ' + result['products'][1][i]['price'] + ' руб.</h3>';
        number += 1;
        sum += result['products'][1][i]['price'];
    }

    personText = result['person']['last_name'] + ' ' + result['person']['first_name'] + ' ' + result['person']['middle_name'];

    products.insertAdjacentHTML('afterend', productText);

    person.insertAdjacentHTML('beforeend', personText);

    price.insertAdjacentHTML('beforeend', sum + ' руб.');
}

function GetInformation() {
    let id = localStorage.getItem('order_id');
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/quintation?id=${id}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            PrintInformation(JSON.parse(xhr.response));
        } else if(xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    GetInformation();
            });
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function PayForCar() {
    let id = localStorage.getItem('order_id');
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/paycar?id=${id}`;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("ok");
            alert('Оплата прошла успешно!');
            window.location = "сhoose.html";
        } else if(xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    PayForCar();
            });
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

window.onload = function() {
    GetInformation();
};