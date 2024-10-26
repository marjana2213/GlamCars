//Скрипт для регистрации нового пользователя

var isCorect = [false, false, false, false, false, false]; /*Все ли данные готовы для регистрации нового пользователя?
где индексы: 0 - почта, 1 - пароль, 2 - повторный пароль, 3 - имя, 4 - фамилия, 5 - номер телефона*/

//Функция для удаления сообщений об ошибках.
function DeleteErrors(error_Type) {
    const errorElements = document.getElementsByClassName('error ' + error_Type);
    while (errorElements.length > 0)
            errorElements[0].remove();
}

//Функция для валидации почты
function EmailCheck(email) {
    let errorText = '';
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if(email == undefined || email == null || email == '')
        errorText += '<p class=\"error Email\">Почта не может быть пустым!</p>';
    else if(!EMAIL_REGEXP.test(String(email)))
        errorText += '<p class=\"error Email\">Некорректная почта</p>';

    return errorText;
}

//Функция для отображения ошибок
function EmailChange(email_Input) {
    DeleteErrors('Email'); //Удалеяем предидущие ошибки

    error = EmailCheck(email_Input.value);

    if(error != ''){
        isCorect[0] = false;
        email_Input.insertAdjacentHTML('afterend', error);
    }
    else
        isCorect[0] = true;
}

//Функция для валидации пароля
function PasswordCheck(password1, password2) {
    let errorText = '';
    let error2Text = '';

    if(password1 == undefined || password1 == null || password1 == '')
        errorText += '<p class=\"error Password\">Пароль не может быть пустым!</p>';
    else if(password1.length < 8)
        errorText += '<p class=\"error Password\">В пароле должно быть хотя бы 8 символов!</p>';

    if(password2 == undefined || password2 == null || password2 == '')
        error2Text += '<p class=\"error Password2\">Поле не может быть пустым!</p>';
    else if(password1 != password2)
        error2Text += '<p class=\"error Password2\">Пароли не совпадают!</p>';

    return JSON.stringify({"error" : errorText, "error2" : error2Text});
}

//Функция для отображения ошибок
function PasswordChange(password_Input, password_2_Input) {
    //Удалеяем предидущие ошибки
    DeleteErrors('Password');
    DeleteErrors('Password2');

    errors = JSON.parse(PasswordCheck(password_Input.value, password_2_Input.value));
    error = errors["error"];
    error2 = errors["error2"];

    if(error != '') {
        isCorect[1] = false;
        password_Input.insertAdjacentHTML('afterend', error);
    }
    else
        isCorect[1] = true;

    if(error2 != '') {
        isCorect[2] = false;
        password_2_Input.insertAdjacentHTML('afterend', error2);
    }
    else
        isCorect[2] = true;
}

//Функция для валидации имени
function FirstNameCheck(name){
    let errorText = '';

    if(name == undefined || name == null || name == '')
        errorText += '<p class=\"error FirstName\">Поле не может быть пустым!</p>';

    return errorText;
}

//Функция для отображения ошибок
function FirstNameChange(name_Input) {
    DeleteErrors('FirstName'); //Удалеяем предидущие ошибки

    error = FirstNameCheck(name_Input.value);

    if(error != '') {
        isCorect[3] = false;
        name_Input.insertAdjacentHTML('afterend', error);
    }
    else
        isCorect[3] = true;
}

//Функция для валидации фамилии
function LastNameCheck(name){
    let errorText = '';

    if(name == undefined || name == null || name == '')
        errorText += '<p class=\"error LastName\">Поле не может быть пустым!</p>';

    return errorText;
}

//Функция для отображения ошибок
function LastNameChange(name_Input) {
    DeleteErrors('LastName'); //Удалеяем предидущие ошибки

    error = LastNameCheck(name_Input.value);

    if(error != '') {
        isCorect[4] = false;
        name_Input.insertAdjacentHTML('afterend', error);
    }
    else
        isCorect[4] = true;
}

//Функция для валидации номера телефона
function TelephoneCheck(telephone){
    let errorText = '';
    const TELEPHONE_REGEX = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    if(telephone == undefined || telephone == null || telephone == '')
        errorText += '<p class=\"error Telephone\">Телефон не может быть пустым!</p>';
    else if(!TELEPHONE_REGEX.test(telephone))
        errorText += '<p class=\"error Telephone\">Некорректый телефон!</p>';

    return errorText;
}

//Функция для отображения ошибок
function TelephoneChange(telephone_Input) {
    DeleteErrors('Telephone'); //Удалеяем предидущие ошибки

    error = TelephoneCheck(telephone_Input.value);

    if(error != '') {
        isCorect[5] = false;
        telephone_Input.insertAdjacentHTML('afterend', error);
    }
    else
        isCorect[5] = true;
}

//Функция для создания запроса на регистрацию пользователя
function createUser() {
    DeleteErrors('CreateUser'); //Удалеяем предидущие ошибки

    if(isCorect[0] && isCorect[1] && isCorect[2] && isCorect[3] && isCorect[4] && isCorect[5]) { //Проверяем все ли данные корректные
        const email_Input = document.querySelector('#login');
        const password_Input = document.querySelector('#password');
        const password_2_Input = document.querySelector('#password_2');
        const first_name_Input = document.querySelector('#first_name');
        const last_name_Input = document.querySelector('#last_name');
        const middle_name_Input = document.querySelector('#middle_name');
        const telephone_Input = document.querySelector('#number');
        const create_button = document.querySelector('#create_button');

        //Шмфруем пароль
        let temp = password_Input.value.split('');
        let cipherPassword = temp.map(value => value.charCodeAt(0) ^ temp.length).join('');

        //Создаём пост запрос
        const url = "http://localhost:3000/registration";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) { 
                console.log("ok");
                alert("Регистрация прошла успешно!");
                window.location = "authorization.html";
            } else if(xhr.status == 401 && xhr.readyState == 4) {
                let error405 = JSON.parse(xhr.response).message;
                create_button.insertAdjacentHTML('afterend', `<p class="error CreateUser">${error405}</p>`);
            } else if (xhr.readyState == 4){
                console.log("Server response: ", xhr.statusText);
                alert("Ошибка, попробуйте в другой раз!");
                location.reload();
            }
        };

        //Создаем json файл
        var data_json = JSON.stringify({ 
            "email": email_Input.value, 
            "telephone": telephone_Input.value, 
            "password": cipherPassword, 
            "first_name": first_name_Input.value, 
            "last_name": last_name_Input.value, 
            "middle_name": middle_name_Input.value, 
        });

        //Отправляем запрос
        xhr.send(data_json);
    } else {
        create_button.insertAdjacentHTML('afterend', "<p class=\"error CreateUser\">Некорректно введены данные!</p>");
    }
}

function LoginUser() {
    DeleteErrors('LoginUser'); //Удалеяем предидущие ошибки

    const email_Input = document.querySelector('#login');
    const password_Input = document.querySelector('#password');
    const login_button = document.querySelector('#login_button');

    //Шмфруем пароль
    let temp = password_Input.value.split('');
    let cipherPassword = temp.map(value => value.charCodeAt(0) ^ temp.length).join('');

    //Создаём пост запрос
    const url = "http://localhost:3000/login";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) { 
            console.log("ok");
            localStorage.setItem('token', JSON.parse(xhr.response));
            window.location = "сhoose.html";
        } else if(xhr.status == 401 && xhr.readyState == 4) {
            let error405 = JSON.parse(xhr.response).message;
            login_button.insertAdjacentHTML('afterend', `<p class="error LoginUser">${error405}</p>`);
        } else if (xhr.readyState == 4){
            console.log("Server response: ", xhr.statusText);
            alert("Ошибка, попробуйте в другой раз!");
            location.reload();
        }
    };

    //Создаем json файл
    var data_json = JSON.stringify({ 
        "email": email_Input.value,  
        "password": cipherPassword, 
    });

    //Отправляем запрос
    xhr.send(data_json);
}