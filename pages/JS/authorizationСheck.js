//Функция для проверки авторизации
function ChekAuthorization() {
    return new Promise( ( resolve, reject ) => {  
        let token = localStorage.getItem('token');

        const url = `http://localhost:3000/checktoken`;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("authorization", token);

        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                console.log("Authorization ok");
                resolve(JSON.parse(xhr.response));
            } else if(xhr.status == 401 && xhr.readyState == 4) {
                console.log('No authorization');
                resolve(UpdateToken().then( (resolve1) => {
                    if(resolve1)
                        return ChekAuthorization();
                    else
                        return false;
                }));
            } else {
                console.log("Server response: ", xhr.statusText);
                alert("Ошибка!");
            }
        };

        xhr.send(null);
    });
}

//Функция для проверки авторизации админом
function ChekAuthorizationAdmin() {
    return new Promise( ( resolve, reject ) => {  
        let token = localStorage.getItem('token');

        const url = `http://localhost:3000/checktokenadmin`;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("authorization", token);

        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                console.log("Authorization ok");
                resolve(JSON.parse(xhr.response));
            } else if(xhr.status == 401 && xhr.readyState == 4) {
                console.log('No authorization');
                resolve(UpdateToken().then( (resolve1) => {
                    if(resolve1)
                        return ChekAuthorization();
                    else
                        return false;
                }));
            }  else if (xhr.status == 403 && xhr.readyState == 4){
                window.location = "authorization.html";
            } else {
                console.log("Server response: ", xhr.statusText);
                alert("Ошибка!");
            }
        };

        xhr.send(null);
    });
}

//Функция для обнавления токена
function UpdateToken() {  
    return new Promise( ( resolve, reject ) => {  
        const url = `http://localhost:3000/updatetoken`;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.withCredentials = true;

        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                localStorage.setItem('token', JSON.parse(xhr.response)['newToken']);
                console.log("UpdateToken ok");
                resolve(JSON.parse(xhr.response)['newToken']);
            } else if(xhr.status == 401 && xhr.readyState == 4) {
                console.log('No authorization');
                resolve(false);
            } else {
                console.log("Server response: ", xhr.statusText);
                alert("Ошибка!");
                location.reload();
            }
        };

        xhr.send(null);
    });
}