/**
 * ------------SLIDER-------------------
 */

const slider = new Slider('slider');
const nextSlide = document.getElementById('slide_next');
const prevSlide = document.getElementById('slide_prev');
let intervalId = 0;
// Botón para el siguiente slide

nextSlide.addEventListener("click", ()=> {

    slider.nextSlide();
    clearInterval(intervalId);
    intervalId = slider.automaticSlider();
});

// Botón para el anterior slide

prevSlide.addEventListener("click", () => {

    slider.prevSlide();
    clearInterval(intervalId);
    intervalId = slider.automaticSlider();

});

// Funcionamiento autómatico del slider

intervalId = slider.automaticSlider();


/**
 * ------------FUNCIONALIDAD RETURN TO THE TOP---------------------
 */

const button_returnTop = document.getElementById('returnTop');

function returnTop(){

    let animationId;

    if(window.scrollY != 0){

        window.scrollBy(0,-10);

        animationId = window.requestAnimationFrame(returnTop);

    }
    else {
        window.cancelAnimationFrame(animationId);
    }
   
}

button_returnTop.addEventListener("click",function(){
    setTimeout(returnTop,200);
});


// Regex para validar los emails del formulario y el newsletter

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



/**
 * -----------------FUNCIONALIDAD SUBMIT NEWSLETTER------------------------
 */

const modal = document.getElementById('modal');
const modal_background = document.getElementById('modal-background');
const close_modal = document.getElementById('close_modal');
const button_newsletter = document.getElementById('submitNewsletter');
const message_newsLetter = document.getElementById('message-newsletter');

// Función para abrir el modal

function openModal(){

    if(sessionStorage.getItem("openModal") !== "true"){
        sessionStorage.setItem("openModal","true");
        modal.classList.add('pop-up-modal--display');
    }
}

// Función para cerrar el modal

function closeModal(){
    modal.classList.remove('pop-up-modal--display');
    message_newsLetter.classList.remove('pop-up-modal__content__form__message--error');
    message_newsLetter.classList.remove('pop-up-modal__content__form__message--correct');
    message_newsLetter.innerText = ''
}

// Función para enviar el newsletter

async function submitNewsletter(){

    let email = document.getElementById('email_newsletter');

    let emailValid = emailRegex.test(email.value);

    
    

    if(emailValid){

        let data = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments',{
            method: 'POST',
            body: JSON.stringify({
                "postId":1,
                "id":6,
                "name": 'Jon',
                "email":email.value,
                "body": "Esto es una prueba"

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        });

        if(data.ok){
            email.value = '';
            message_newsLetter.classList.remove('pop-up-modal__content__form__message--error');
            message_newsLetter.classList.add('pop-up-modal__content__form__message--correct');
            message_newsLetter.innerText = 'It has been sent successfully';
            setTimeout(closeModal,3000);
        }
        else {
            
            message_newsLetter.classList.add('pop-up-modal__content__form__message--error');
            message_newsLetter.innerText = "Error sending data to the server";
        }
    }
    else {

        message_newsLetter.classList.add('pop-up-modal__content__form__message--error');
        message_newsLetter.innerText = "The email you have entered is not correct";

    }
}

// Abrir modal y barra de progreso del scroll

window.addEventListener("scroll", function(){

    // Funcionalidad de la barra de progreso del scroll
    let widthMaxSize = document.documentElement.scrollHeight - window.innerHeight;
    let actualWidth = this.window.scrollY;
    let scrollBar = this.document.getElementById("scroll-percentage");
    let scrollPercentage = (actualWidth / widthMaxSize) * 100;

    scrollBar.style.width = scrollPercentage + '%';

    // Abre el modal
    if(scrollPercentage >= 25){
        openModal();
    }
});

window.addEventListener("load",function(){
    this.setTimeout(openModal,5000);
});

// Cerrar el modal

window.addEventListener("click",function(event){
    if(event.target === modal_background){
        closeModal();
    }
});

close_modal.addEventListener("click",closeModal);

window.addEventListener("keydown",(event) => {
    if(event.key === "Escape"){
        closeModal();
    }
});

// Enviar la subscripción del newsletter

button_newsletter.addEventListener("click",(event) => {
    event.preventDefault();
    submitNewsletter();
});

/**
 * ---------------- MENU DESPLEGABLE--------------------------
 */

const menu_open = document.getElementById('menu-open');
const menu_close = document.getElementById('menu-close');
const menu = document.getElementsByClassName('header__content__nav')[0];
const header = document.getElementsByClassName('header')[0];
menu_open.addEventListener("click", openMenu);
menu_close.addEventListener("click", closeMenu);

// Función abrir menú

function openMenu(){

    menu_open.classList.remove("header__content__button-menu__open--open-menu-actived");
    menu_close.classList.add("header__content__button-menu__close--close-menu-actived");
    menu.classList.remove("header__content__nav--closed");
    menu.classList.add("header__content__nav--opened");
    header.classList.add("header--menu-open");

}

// Función cerrar menú

function closeMenu(){

    menu_close.classList.remove("header__content__button-menu__close--close-menu-actived");
    menu_open.classList.add("header__content__button-menu__open--open-menu-actived");
    menu.classList.remove("header__content__nav--opened");
    menu.classList.add("header__content__nav--closed");
    header.classList.remove("header--menu-open");
}

/**
 * ----------------CAMBIO DE ITEM DEL MENU-----------------
 */

const navbarItems = document.querySelectorAll('nav ul li');

navbarItems.forEach((item) => {
    item.addEventListener('click', (event) => {

        navbarItems.forEach((item) => {
            item.classList.remove('header__content__nav__item--active');
        })

        item.classList.add('header__content__nav__item--active');

    })
})

/**
 * --------------VALIDAR FORMULARIO------------------
 */

const button_form = document.getElementById('contact-form');

const message_form = document.getElementById('message-form');

// Función para validar el formulario

function validateForm(){

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let checkbox = document.getElementById('protection-check');
    let check_label = document.getElementById('check-label');
    let emailValid = emailRegex.test(email.value);
    let formValid = true;
    

    name.classList.remove('section-contact__form__email__input--not-valid');
    email.classList.remove('section-contact__form__email__input--not-valid');
    check_label.classList.remove('section-contact__form__protection__text--not-valid');

    

    if(name.value.length < 2 || name.value.length > 100){
        name.classList.add('section-contact__form__email__input--not-valid');
        formValid = false;

    }

    if(!emailValid){
        email.classList.add('section-contact__form__email__input--not-valid');
        formValid = false;
    }

    if(!checkbox.checked){
        check_label.classList.add('section-contact__form__protection__text--not-valid');
        formValid = false;
    }

    if(formValid){
        sendFormInformation(name,email,checkbox);
    }
    else {
        message_form.innerText = 'Some of the fields are not correct';
        message_form.classList.remove('section-contact__form__message--correct');
        message_form.classList.add('section-contact__form__message--error');
    }

}

// Función para enviar los datos del formulario

async function sendFormInformation(name,email,checkbox){

    if(validateForm){
        let data = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments',{
            method: 'POST',
            body: JSON.stringify({
                "postId":1,
                "id":6,
                "name": name.value,
                "email":email.value,
                "body": "Esto es una prueba"

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        });

        if(data.ok){
            name.value = '';
            email.value = '';
            checkbox.checked = false;

            message_form.innerHTML = 'The information was sent successfully'
            message_form.classList.remove('section-contact__form__message--error');
            message_form.classList.add('section-contact__form__message--correct');

            setTimeout(() => {
                message_form.classList.remove('section-contact__form__message--correct');
            },3000);
        }

        else {
            message_form.innerHTML = 'La información no se pudo enviar. Error en el servidor.'
            message_form.classList.remove('section-contact__form__message--error');
            message_form.classList.add('section-contact__form__message--correct');
        }
    }
}

// Listener que efectúa la validación del formulario

button_form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm();
});


/**
 * --------------SELECTOR CURRENCY---------------------------
 */

const select_currency = document.getElementById('currency');
const premium = document.getElementById('premium_price');
const profesional = document.getElementById('profesional_price');
const basic = document.getElementById('basic_price');

// Divisa actual 
let actual_currency = select_currency.value;

// Cargar primeros valores de los precios
let premium_price = premium.innerHTML.substring(1,premium.innerHTML.length);
let pro_price = profesional.innerHTML.substring(1,profesional.innerHTML.length);


// Función para cambiar los precios dependiendo la divisa

async function changeCurrency(currency){

    let currency_response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'+actual_currency+'/'+currency+'.json');

    let currency_value = await currency_response.json();

    let premium_symbol = premium.innerHTML.substring(0,1);
    let pro_symbol = profesional.innerHTML.substring(0,1);
    let basic_symbol = basic.innerHTML.substring(0,1);

    
    switch (currency) {
        case 'usd':

            basic_symbol = '$';
            
            premium_price *=  currency_value.usd;
            premium_symbol = '$';

            pro_price *= currency_value.usd;
            pro_symbol = '$';

            break;
    
        case 'eur':

            basic_symbol = '€';

            premium_price *= currency_value.eur;
            premium_symbol = '€';

            pro_price *= currency_value.eur;
            pro_symbol = '€';
            
            break;
        
        case 'gbp':

            basic_symbol = '&pound;';

            premium_price *= currency_value.gbp;
            premium_symbol = '&pound;';

            pro_price *= currency_value.gbp;
            pro_symbol = '&pound;';

    }
    basic.innerHTML = basic_symbol+0;
    premium.innerHTML = premium_symbol+Math.round(premium_price);
    profesional.innerHTML = pro_symbol+Math.round(pro_price);

    actual_currency = currency;
}

select_currency.addEventListener("change", (event) => {
    changeCurrency(event.target.value);
});