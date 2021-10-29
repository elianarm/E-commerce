const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_DESAFIANTE = 'https://japdevdep.github.io/ecommerce-api/cart/654.json'
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


document.getElementById("sesion").addEventListener("click", function () {
  localStorage.removeItem("e-mail");
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";

  } else {
    x.className = "topnav";
  }
}

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {



});

//Funcion que muestra el nombre de usuario en el navbar.
function showUser() {
  //Defino una variable que contiene el nombre de usuario.
  let usuario = localStorage.getItem("e-mail");
  //Defino una variable a la que le agrego el texto que se mostrara en el html en la linea siguiente mediante DOM.
  let addtoNav = "";

  addtoNav += `Hola, <u>` + usuario + `</u>!`;


  //Agrego en el div del navbar que tiene el id nav un <a></a> que contiene el nombre del ususario.
  document.getElementById("navbarScrollingDropdown").innerHTML += addtoNav;

}
showUser();
