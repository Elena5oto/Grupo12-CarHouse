const burger_menu = document.querySelector('.burger_menu');
const mobile_menu = document.querySelector('.mobile_nav');

burger_menu.addEventListener('click', () =>{
    burger_menu.classList.toggle('is_active');
    mobile_menu.classList.toggle('is_active');
})
