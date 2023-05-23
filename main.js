const toggleMenu = document.querySelector("#check");

window.addEventListener('scroll',()=>{
    // desactiva el menú hamburguesa si se baja el scroll 200px

    if(window.scrollY > 200){
        toggleMenu.checked = false;
    }
});