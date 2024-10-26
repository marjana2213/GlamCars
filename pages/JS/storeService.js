//Функция для удаления списка элементов
function DeleteElements(name) {
    const elements = document.getElementsByClassName(name);
    while (elements.length > 0)
            elements[0].remove();
}

//Функция для вывода магазина
function PrintStore(result) {
    DeleteElements('store_element');
    DeleteElements('store_lenght');
    DeleteElements('product-item');

    const store = document.getElementsByClassName('store');
    const grid = document.getElementsByClassName('grid');
    store[0].insertAdjacentHTML('beforeend', "<label class=\"store_lenght\"> " + result.length + "</label>");
    for(var i in result) {
        let car = '<div class=\"product-item\"><img src=\"' + result[i]['photo'] + '\"><div class=\"product-list\"><h3>' + result[i]['brand'] + ' ' + result[i]['model']+ '</h3><span class=\"price\">' + result[i]['price'] + ' ₽</span><a class=\"button\" id=\"' + result[i]['car_id'] + '\" onclick=BuyCar(' + result[i]['car_id'] + ',\'CAR\')>Купить</a></div></div>';
        grid[0].insertAdjacentHTML('beforeend', car);
    }
}

//Функция для добавления полей в select
function PrintSelectFilter(name, result){
    DeleteElements('option_' + name);

    const parentElement = document.querySelector('#' + name);
    let options = '';
    for(var i in result) {
        options += '<option class=\"option_' + name + '\" ' + 'value=\"';
        for (var key in result[i]) {
            options += result[i][key] + '\">' + result[i][key];
        }
        options += '</option>';
        parentElement.insertAdjacentHTML('beforeend', options);
        options = '';
    }
}

//Функция для печати чисел из input range
function PrintNumberFilter(name, number) {
    DeleteElements('number_' + name);

    const parentElement = document.getElementsByClassName(name);
    parentElement[0].insertAdjacentHTML('beforeend', "<label class=\"number_" + name + "\"> " + number + "</label>");
}

//Функция для получения доступных машин к покупке по параметрам из фильтра
function CreateStore(brand, model, body, transmition, engine, unit, min_price, max_price, min_power, max_power) {
    const url = `http://localhost:3000/store?brand=${brand}&model=${model}&body=${body}&transmition=${transmition}&engine=${engine}&unit=${unit}&min_price=${min_price}&max_price=${max_price}&min_power=${min_power}&max_power=${max_power}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            PrintStore(JSON.parse(xhr.response));
            console.log("ok");
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

//Функция для фильтра марки
function GetBarnds() {
    const url = `http://localhost:3000/brands`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            PrintSelectFilter('brand', JSON.parse(xhr.response));
            console.log("ok");
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

//Функция для сбора данных для фильтра моделей
function GetModels(brand) {
    const url = `http://localhost:3000/models?brands=${brand}`;
    console.log(url);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            PrintSelectFilter('model', JSON.parse(xhr.response));
            console.log("ok");
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

//Функция для сбора значений из select
function GetMultipleSelect(select_input) {
    let result = new Array();
    for(opt of select_input.options) {
        if(opt.selected)
            result.push(opt.value);
    }

    return result;
}

//Функция для получения данных о машине и переходе на страницу
function BuyCar(id, type) {
    localStorage.setItem('sale_id', id);
    localStorage.setItem('sale_type', type);
    window.location = "car.html";
}

function LogOut() {
    let token = localStorage.getItem('token');

    const url = `http://localhost:3000/logout`;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            localStorage.removeItem('token');
            document.cookie = "username=refreshToken; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log("logout ok");
            location.reload();
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

window.onload = function() {
    const brand = document.querySelector('#brand');
    const model = document.querySelector('#model');
    const body = document.querySelector('#body');
    const transmition = document.querySelector('#transmition');
    const engine = document.querySelector('#engine');
    const unit = document.querySelector('#unit');
    const min_price = document.querySelector('#min_price');
    const max_price = document.querySelector('#max_price');
    const min_power = document.querySelector('#min_power');
    const max_power = document.querySelector('#max_power');
    const search = document.querySelector('#search');

    PrintNumberFilter('min_price', min_price.value);
    PrintNumberFilter('max_price', max_price.value);
    PrintNumberFilter('min_power', min_power.value);
    PrintNumberFilter('max_power', max_power.value);
    GetBarnds();
    CreateStore(brand.value, model.value, body.value, transmition.value, engine.value, unit.value, min_price.value, max_price.value, min_power.value, max_power.value);

    brand.oninput = function() {
        brands = GetMultipleSelect(brand);
        GetModels(brands);
    };

    min_price.oninput = function() {
        PrintNumberFilter('min_price', min_price.value);
    };

    max_price.oninput = function() {
        PrintNumberFilter('max_price', max_price.value);
    };

    min_power.oninput = function() {
        PrintNumberFilter('min_power', min_power.value);
    };

    max_power.oninput = function() {
        PrintNumberFilter('max_power', max_power.value);
    };

    search.onclick = function() {
        let brands = GetMultipleSelect(brand);
        let models = GetMultipleSelect(model);
        let bodys = GetMultipleSelect(body);
        let transmitions = GetMultipleSelect(transmition);
        let engines = GetMultipleSelect(engine);
        let units = GetMultipleSelect(unit);
        CreateStore(brands, models, bodys, transmitions, engines, units, min_price.value, max_price.value, min_power.value, max_power.value);
    };
    
    ChekAuthorization().then( (resolve) => {
        const start = document.querySelector('#start');
        if(!resolve)
            start.insertAdjacentHTML('beforebegin', '<p align=\"right\"><a href=\"authorization.html\"><button>Войти</button></a></p>');
        else {
            start.insertAdjacentHTML('beforebegin', '<p align=\"right\"><label>Добро пожаловать, ' + resolve['first_name'] + ' </label><button onclick="LogOut()">Выход</button></p>');
            start.insertAdjacentHTML('beforebegin', '<p align=\"right\" class=\"basket_length\"><a href="#basket"><button>Корзина</button></a></p>');
            let adminPanel = document.createElement('p');
            adminPanel.innerHTML += '<a href="create.html"><button>Админ панель</button></a>';
            document.body.appendChild(adminPanel);
            GetBasket();
        }
    });
};