
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