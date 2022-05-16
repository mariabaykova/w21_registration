let lastNameElem = document.getElementById("lastName");
let firstNameElem = document.getElementById("firstName");
let mobPhoneElem = document.getElementById("phone");
let emailElem = document.getElementById("email");

let errBlocks = document.querySelectorAll(".errors-block");
let lastNameErrElem = document.getElementById("lastNameErr");
let firstNameErrElem = document.getElementById("firstNameErr");
let MobPhoneErrElem = document.getElementById("MobPhoneErr");
let emailErrElem = document.getElementById("emailErr");

hideErrBlocks();

let form = document.querySelector(".registration-form");



form.addEventListener( "submit", ( event ) => {

    // индикатор наличия ошибок. Если errInd == 0, то ошибок нет
    let errInd = 0;
    if ( !checkPhone(mobPhoneElem.value) ) {
        showErr(MobPhoneErrElem, "Номер телефона указан не корректно" );
        errInd++;
    } else {
        hideErr(MobPhoneErrElem);
    }
    if ( !checkName(firstNameElem.value) ) {
        showErr(firstNameErrElem, "Имя указано не корректно" );
        errInd++;
    } else {
        hideErr(firstNameErrElem);
    }
    if ( !checkName(lastNameElem.value) ) {
        showErr(lastNameErrElem, "Фамилия не корректна" );
        errInd++;
    } else {
        hideErr(lastNameErrElem);
    }

    if ( !checkEmail(emailElem.value) ) {
        showErr(emailErrElem, "Электронный адрес указан не корректно" );
        errInd++;
    } else {
        hideErr(emailErrElem);
    }
    // вывести приветствие, если ошибок нет
    if ( !errInd ) {
        sayWelcome();
        const formDataObj = {
            "lastname": lastNameElem.value,
            "firstname": firstNameElem.value,
            "email": emailElem.value,
            "mobilePhone": mobPhoneElem.value
        };
        sendReq( formDataObj );
    }
    // отменить сабмит, если есть ошибки
    if(errInd > 0) {
        event.preventDefault();
    }
});

function sendReq( obj ) {
    fetch(`https://httpbin.org/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    }
    );
}

function sayWelcome() {
    alert("Добро пожаловать, " + lastNameElem.value + " " + firstNameElem.value + "!");
}

function checkPhone( phoneNumber ) {
    return /^(\+?7|8)-?\(?\d{3}\)?-?\d{3}-?\d{4}$/.test(phoneNumber.trim());
}

function checkName( nameStr ) {
    return /^[а-яА-Я]{2,}(-[а-яА-я]{2,})?$/.test(nameStr.trim());
}

function checkEmail( str ) {
    return /^[a-zA-Z0-9]{1,}[a-zA-Z0-9._-]{1,}@[a-zA-Z0-9_-]{2,}\.[a-zA-Z0-9_-]{2,}$/.test(str.trim());
}

// передать сюда elem блока с ошибкой и текст
function showErr( elem, errText ) {
    elem.style.display = "";
    elem.textContent = errText;
}

function hideErr( elem ) {
    elem.style.display = "none";
    elem.textContent = ""; 
}

// скрыть все блоки с ошибками и удалить ошибки
function hideErrBlocks() {
    errBlocks.forEach(hideErr);
}