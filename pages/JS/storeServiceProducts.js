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
        let car = '<div class=\"product-item\"><img src=\"' + result[i]['photo'] + '\"><div class=\"product-list\"><h3>' + result[i]['name'] + '</h3><span class=\"price\">' + result[i]['price'] + ' ₽</span><a class=\"button\" id=\"' + result[i]['id'] + '\" onclick=BuyCar(' + result[i]['id'] + ',\"ITEM\")>В корзину</a></div></div>';
        grid[0].insertAdjacentHTML('beforeend', car);
    }
}

//Функция для получения доступных машин к покупке по параметрам из фильтра
function CreateStore() {
    const url = `http://localhost:3000/storeproduct`;

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

//Функция для добавления товара в корзину
function BuyCar(id, type) {
    localStorage.setItem('sale_id', id);
    localStorage.setItem('sale_type', type);
    AddToBasket();
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
    CreateStore();
    
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