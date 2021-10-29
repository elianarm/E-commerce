
//funcion que muestra la foto que subimos al input choose image para el perfil
function showProfilePicture() {
    let myimage = document.getElementById("myimage");
    let file = document.getElementById("image_input").files[0];

    let reader = new FileReader();

    if (file) {

        reader.readAsDataURL(file);

    } else {

        myimage.src = "img/profile-picture.png"

    }
    reader.onloadend = function () {
        myimage.src = reader.result;
    }

}

//funcion que guarda cada uno de los datos y los pasa a un json que se almacenara en el localStorage
function saveProfile() {


    localStorage.removeItem("profile");



    var profileData = {
        name: document.getElementById("name").value,
        secondName: document.getElementById("name-2").value,
        surname: document.getElementById("surname").value,
        secondSurname: document.getElementById("surname-2").value,
        email: document.getElementById("mail").value,
        contactNumber: document.getElementById("num").value,
        img: myimage.src
    };

    localStorage.setItem("profile", JSON.stringify(profileData));

    alert("Sus cambios se han guardado correctamente");




}

//Luego que cargue todo el codigo, esta funcion devuelve los datos del json que se recuperan mediante parse y se muestran en los inputs mediante DOM
document.addEventListener("DOMContentLoaded", function (e) {
    let perfil = JSON.parse(localStorage.getItem("profile"));

    if (perfil != null) {
        document.getElementById("name").value = perfil.name;
        document.getElementById("name-2").value = perfil.secondName;
        document.getElementById("surname").value = perfil.surname
        document.getElementById("surname-2").value = perfil.secondSurname
        document.getElementById("mail").value = perfil.email
        document.getElementById("num").value = perfil.contactNumber;
        document.getElementById("myimage").src = perfil.img;

        document.getElementById("name-saved").innerHTML = `<strong>` + perfil.name + ' ' + perfil.surname + `</strong>`;
        document.getElementById("email-saved").innerHTML = perfil.email;

    }
});



