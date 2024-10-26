function printCars(result) {
    document.write("<title>Машины</title>");
    for(var i in result) {
        document.write("<p>");
        for (var key in result[i]) {
            document.write(result[i][key] + " ");
        }
        document.write("</p>");
    }
    document.write("<button onclick=\"location.reload()\">Вернуться</button>");
}

function sendFile(file) {
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append("name", file.name);
    formData.append("image", file);

    const url = "http://localhost:3000/newpicture";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) { 
            console.log("ok");
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    sendFile(file);
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else if(xhr.readyState == 4) {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка, попробуйте ещё раз!");
            location.reload();
        }
    };

    xhr.send(formData);
}

function sendJSON() {
    let token = localStorage.getItem('token');

    let brand = document.querySelector('#brand');
    let model = document.querySelector('#model');
    let color = document.querySelector('#color');
    let date = document.querySelector('#date');
    let body = document.querySelector('#body');
    let power = document.querySelector('#power');
    let transmition = document.querySelector('#transmition');
    let engine = document.querySelector('#engine');
    let unit = document.querySelector('#unit');
    let country = document.querySelector('#country');
    let price = document.querySelector('#price');
    let photo = document.querySelector('#photo');

    const url = "http://localhost:3000/new";

    sendFile(photo.files[0]);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", token);

    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) { 
            console.log("ok");
            alert("Машина успешно добавлена!");
            location.reload();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    sendJSON();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else if(xhr.readyState == 4) {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка, попробуйте ещё раз!");
            location.reload();
        }
    };

    var data_json = JSON.stringify({ 
        "brand": brand.value, 
        "model": model.value, 
        "color": color.value, 
        "date": Number(date.value), 
        "body": body.value, 
        "power": Number(power.value), 
        "transmition": transmition.value, 
        "engine": engine.value, 
        "unit": unit.value, 
        "country": country.value,
        "price": price.value,
        "photo": photo.files[0].name
    });

    xhr.send(data_json);
}

function sendJSONProduct() {
    let token = localStorage.getItem('token');

    let name = document.querySelector('#name');
    let description = document.querySelector('#description');
    let price = document.querySelector('#price');
    let photo = document.querySelector('#photo');

    const url = "http://localhost:3000/newproduct";

    sendFile(photo.files[0]);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", token);

    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) { 
            console.log("ok");
            alert("Товар успешно добавлен!");
            location.reload();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    sendJSONProduct();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else if(xhr.readyState == 4) {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка, попробуйте ещё раз!");
            location.reload();
        }
    };

    var data_json = JSON.stringify({ 
        "name": name.value, 
        "description": description.value, 
        "price": price.value,
        "photo": photo.files[0].name
    });

    xhr.send(data_json);
}

function getCars() {
    let token = localStorage.getItem('token');

    const url = "http://localhost:3000/cars";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200) {
            printCars(JSON.parse(xhr.response));
            console.log("ok");
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    getCars();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function findeCars() {
    let token = localStorage.getItem('token');

    let id = document.querySelector('#car_id');
    let brand = document.querySelector('#brand');
    let model = document.querySelector('#model');
    let color = document.querySelector('#color');
    let date = document.querySelector('#date');
    let body = document.querySelector('#body');
    let power = document.querySelector('#power');
    let transmition = document.querySelector('#transmition');
    let engine = document.querySelector('#engine');
    let unit = document.querySelector('#unit');
    let country = document.querySelector('#country');
    let price = document.querySelector('#price');

    const url = `http://localhost:3000/finde?id=${id.value}&brand=${brand.value}&model=${model.value}&color=${color.value}&date=${date.value}&body=${body.value}&power=${power.value}&transmition=${transmition.value}&engine=${engine.value}&unit=${unit.value}&country=${country.value}&price=${price.value}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200) {
            printCars(JSON.parse(xhr.response));
            console.log("ok");
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    findeCars();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function updateCar() {
    let token = localStorage.getItem('token');

    let id = document.querySelector('#car_id');
    let brand = document.querySelector('#brand');
    let model = document.querySelector('#model');
    let color = document.querySelector('#color');
    let date = document.querySelector('#date');
    let body = document.querySelector('#body');
    let power = document.querySelector('#power');
    let transmition = document.querySelector('#transmition');
    let engine = document.querySelector('#engine');
    let unit = document.querySelector('#unit');
    let country = document.querySelector('#country');
    let price = document.querySelector('#price');
    let photo = document.querySelector('#photo');
    let photoName = '';

    if(photo.files[0]) {
        sendFile(photo.files[0]);
        photoName = photo.files[0].name;
    }


    const url = `http://localhost:3000/edit?id=${id.value}&brand=${brand.value}&model=${model.value}&color=${color.value}&date=${date.value}&body=${body.value}&power=${power.value}&transmition=${transmition.value}&engine=${engine.value}&unit=${unit.value}&country=${country.value}&price=${price.value}&photo=${photoName}`;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("ok");
            alert("Машина успешно обнавлена!");
            location.reload();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    updateCar();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function deleteCar() {
    let token = localStorage.getItem('token');

    let id = document.querySelector('#car_id');

    const url = `http://localhost:3000/delete?id=${id.value}`;

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("ok");
            alert("Машина успешно удалена!");
            location.reload();
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    deleteCar();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

function findeQuarter() {
    let token = localStorage.getItem('token');

    let quarter = document.querySelector('#quarter');

    const url = `http://localhost:3000/quarter?quarter=${quarter.value}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("authorization", token);

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("ok");
            document.write('<h1>Сумма за выбранный период: ' + JSON.parse(xhr.response)['sum'] + ' руб.</h1>');
            document.write("<p><button onclick=\"location.reload()\">Вернуться</button></p>");
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            UpdateToken().then( (resolve) => {
                if(!resolve)
                    window.location = "authorization.html";
                else
                    findeQuarter();
            });
        } else if (xhr.status == 403 && xhr.readyState == 4) {
            window.location = "authorization.html";
        } else {
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка!");
            location.reload();
        }
    };

    xhr.send(null);
}

window.onload = function() {
    ChekAuthorizationAdmin().then( (resolve) => {
        if(!resolve)
            window.location = "authorization.html";
    });
}