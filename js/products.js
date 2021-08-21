
//Funcion para mostrar lo productos y sus caracteristicas en html
function showProducts(ProductsArray) {
    //Defino esta variable para mediante DOM al final de la funcion agregarle lo que se mostrara en html
    let htmlContent = "";
    //Este for ejecuta el codigo siguiente por cada elemento de ProductsArray, en este caso escribe html pero aun sin mostrarse
    for (let products of ProductsArray) {
        htmlContent += `<a href="category-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ products.name + `</h4>
                    <small class="text-muted">` + products.soldCount + ` artículos</small>
                </div>
                <p class="mb-1">` + products.description + `</p>
            </div>
        </div>
    </a>`

    }
    //Mediante DOM se muestra lo que escribi en el for introduciendolo en la variable htmContent definida al principio de esta funcion
    document.getElementById("prod-list-container").innerHTML = htmlContent
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    //Esta funcion esta definida detalladamente en init.js, la llamo con el url PRODUCTS_URL para utilizar los elementos del JSON luego en la funcion showProducts
    //Lo que hace es usar un fetch para obtener el JSON
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        //Con este if definimos que si el status del pedido json es correcto nos de el ProductsArray y ejecute la funcion showProducts.
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data;
            showProducts(ProductsArray);
        }
    });
});
