
document.addEventListener("DOMContentLoaded", function (e) {


});


document.getElementById("login").addEventListener("click", function () {
    //defino una variable donde almaceno el nombre de usuario
    let nombre = document.getElementById("user").value;
    //con localStorage.setItem obtengo el usuario para que se almacene en localStorage.
    localStorage.setItem("e-mail", nombre);
});



