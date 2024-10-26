function PrintInformation(result) {
    const car = document.querySelector('#car_name_main');
    const price = document.querySelector('#price');
    const color = document.querySelector('#color');
    const date = document.querySelector('#date');
    const body = document.querySelector('#body');
    const power = document.querySelector('#power');
    const transmition = document.querySelector('#transmition');
    const engine = document.querySelector('#engine');
    const unit = document.querySelector('#unit');

    car.insertAdjacentHTML('beforeend', result['brand'] + ' ' + result['model']);
    car.insertAdjacentHTML('afterend', '<p align = \"center\"><img src=\"' + result['photo'] +'\"></p>');
    price.insertAdjacentHTML('beforeend', result['price'] + ' руб.');
    color.insertAdjacentHTML('beforeend', result['color']);
    date.insertAdjacentHTML('beforeend', result['date']);
    body.insertAdjacentHTML('beforeend', result['body']);
    power.insertAdjacentHTML('beforeend', result['power'] + ' л.с.');
    transmition.insertAdjacentHTML('beforeend', result['transmition']);
    engine.insertAdjacentHTML('beforeend', result['engine']);
    unit.insertAdjacentHTML('beforeend', result['unit']);
}

function GetInformation() {
    let id = localStorage.getItem('sale_id');

    const url = `http://localhost:3000/finde?id=${id}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            PrintInformation(JSON.parse(xhr.response)[0]);
            console.log("ok");
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

    ChekAuthorization().then( (resolve) => {
        const start = document.querySelector('#start');
        if(!resolve)
            start.insertAdjacentHTML('afterend', '<p align=\"right\"><a href=\"authorization.html\"><button>Войти</button></a></p>');
        else {
            start.insertAdjacentHTML('afterend', '<p align=\"right\" class=\"basket_length\"><a href="#basket"><button>Корзина</button></a></p>');
            start.insertAdjacentHTML('afterend', '<p align=\"right\"><label>Добро пожаловать, ' + resolve['first_name'] + ' </label><button onclick="LogOut()">Выход</button></p>');
            GetBasket();
        }
    });
};