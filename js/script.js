
const menu_open = document.getElementById('menu-open');
const menu_close = document.getElementById('menu-close');
const menu = document.getElementsByClassName('header__content__nav')[0];
const button_form = document.getElementById('contact-form');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

menu_open.addEventListener("click", openMenu);
menu_close.addEventListener("click", closeMenu);
button_form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm();
});

window.addEventListener("scroll", function(){

    let widthMaxSize = document.documentElement.scrollHeight - window.innerHeight;
    let actualWidth = this.window.scrollY;
    let scrollBar = this.document.getElementById("scroll-percentage");

    scrollBar.style.width = (actualWidth / widthMaxSize) * 100+'%';
});

function openMenu(){

    menu_open.classList.remove("header__content__button-menu__open--open-menu-actived");
    menu_close.classList.add("header__content__button-menu__close--close-menu-actived");
    menu.classList.remove("header__content__nav--closed");
    menu.classList.add("header__content__nav--opened");

}

function closeMenu(){

    menu_close.classList.remove("header__content__button-menu__close--close-menu-actived");
    menu_open.classList.add("header__content__button-menu__open--open-menu-actived");
    menu.classList.remove("header__content__nav--opened");
    menu.classList.add("header__content__nav--closed");
}

function validateForm(){

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let checkbox = document.getElementById('protection-check');
    let check_label = document.getElementById('check-label');
    let emailValid = emailRegex.test(email.value);

    name.classList.remove('section-contact__form__email__input--not-valid');
    email.classList.remove('section-contact__form__email__input--not-valid');
    check_label.style.border = 'none';

    let formValid = true;

    if(name.value.length < 2 || name.value.length > 100){
        name.classList.add('section-contact__form__email__input--not-valid');
        formValid = false;
    }

    if(!emailValid){
        email.classList.add('section-contact__form__email__input--not-valid');
        formValid = false;
    }

    if(!checkbox.checked){
        check_label.style.border = '1px solid #FB3B64';
        formValid = false;
    }

    if(formValid){
        sendFormInformation(name.value,email.value)
    }

}

async function sendFormInformation(name,email){

    if(validateForm){
        let data = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments',{
            method: 'POST',
            body: JSON.stringify({
                "postId":1,
                "id":6,
                "name": name,
                "email":email,
                "body": "fadfadsfsgadfgadfgdg"

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
    }
}

