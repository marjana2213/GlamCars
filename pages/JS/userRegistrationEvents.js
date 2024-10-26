window.onload = function() {
    const email_Input = document.querySelector('#login');
    const password_Input = document.querySelector('#password');
    const password_2_Input = document.querySelector('#password_2');
    const first_name_Input = document.querySelector('#first_name');
    const last_name_Input = document.querySelector('#last_name');
    const middle_name_Input = document.querySelector('#middle_name');
    const telephone_Input = document.querySelector('#number');

    email_Input.oninput = function() {
        EmailChange(email_Input);
    };

    password_Input.oninput = function() {
        PasswordChange(password_Input, password_2_Input);
    };

    password_2_Input.oninput = function() {
        PasswordChange(password_Input, password_2_Input);
    };

    first_name_Input.oninput = function() {
        FirstNameChange(first_name_Input);
    };

    last_name_Input.oninput = function() {
        LastNameChange(last_name_Input);
    };

    telephone_Input.oninput = function() {
        TelephoneChange(telephone_Input);
    };
};