
// Funcionamiento del slider

const slider = new Slider('slider');
const nextSlide = document.getElementById('slide_next');
const prevSlide = document.getElementById('slide_prev');

nextSlide.addEventListener("click", ()=> {

    slider.nextSlide();
});

prevSlide.addEventListener("click", () => {

    slider.prevSlide();

});

window.addEventListener("load", () => {
    
   slider.automaticSlider();
})


// Volver hacia el inicio con animacion

const button_returnTop = document.getElementById('returnTop');

button_returnTop.addEventListener("click",function(){
    setTimeout(returnTop,200);
});

// Abrir el modal para subscribirse al newsletter

const modal = document.getElementById('modal');
const modal_background = document.getElementById('modal-background');
const close_modal = document.getElementById('close_modal');
const button_newsletter = document.getElementById('submitNewsletter');


window.addEventListener("scroll", function(){

    let widthMaxSize = document.documentElement.scrollHeight - window.innerHeight;
    let actualWidth = this.window.scrollY;
    let scrollBar = this.document.getElementById("scroll-percentage");
    let scrollPercentage = (actualWidth / widthMaxSize) * 100;

    scrollBar.style.width = scrollPercentage + '%';

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


async function submitNewsletter(){

    let email = document.getElementById('email_newsletter');

    let emailValid = emailRegex.test(email.value);

    let message_error = document.getElementById('message_error');
    

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
            message_error.style.display = 'none';
            closeModal();
        }
        else {
            
            message_error.style.display = "block";
            message_error.innerText = "Error al enviar los datos al servidor";
        }
    }
    else {

        let message_error = document.getElementById('message_error');
        message_error.style.display = "block";
        message_error.innerText = "El email que has introducido no es correcto";

    }


}

// Menu desplegable

const menu_open = document.getElementById('menu-open');
const menu_close = document.getElementById('menu-close');
const menu = document.getElementsByClassName('header__content__nav')[0];

menu_open.addEventListener("click", openMenu);
menu_close.addEventListener("click", closeMenu);

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

// Funcionalidad ir hacia el principio de la página

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


// Validar el formulario con el nombre, email y el checkbox


const button_form = document.getElementById('contact-form');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// Listener que efectúa la validación del formulario

button_form.addEventListener("submit", function(event){
    event.preventDefault();
    validateForm();
});

var message = document.getElementById('message');

function validateForm(){

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let checkbox = document.getElementById('protection-check');
    let check_label = document.getElementById('check-label');
    let emailValid = emailRegex.test(email.value);
    let formValid = true;
    

    name.classList.remove('section-contact__form__email__input--not-valid');
    email.classList.remove('section-contact__form__email__input--not-valid');
    check_label.style.border = 'none';

    

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
        sendFormInformation(name,email,checkbox);
    }
    else {
        message.style.display = 'block';
        message.innerHTML = 'Algunos de los campos no es correcto';
        message.classList.remove('section-contact__form__message--correct');
        message.classList.add('section-contact__form__message--error');
    }

}

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

            message.innerHTML = 'La información se envió correctamente.'
            message.classList.remove('section-contact__form__message--error');
            message.classList.add('section-contact__form__message--correct');
            message.style.display = 'block';

            setTimeout(() => {
                message.style.display = 'none';
            },5000);
        }

        else {

        }
    }
}

// Función para abrir el modal

function openModal(){

    if(sessionStorage.getItem("openModal") != "true"){
        sessionStorage.setItem("openModal","true");
        modal.style.display = "block";
    }
    
}

// Función para cerrar el modal

function closeModal(){
    modal.style.display = "none";
}


// Selector de moneda

const select_currency = document.getElementById('currency');
const premium = document.getElementById('premium_price');
const profesional = document.getElementById('profesional_price');
const basic = document.getElementById('basic_price');

var actual_currency = select_currency.value;
var premium_price = premium.innerHTML.substring(1,premium.innerHTML.length);
pro_price = profesional.innerHTML.substring(1,profesional.innerHTML.length);

select_currency.addEventListener("change", (event) => {
    changeCurrency(event.target.value);
});

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

