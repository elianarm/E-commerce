//Nombro los criterios de ordenamiento que voy a usar.
const ORDER_BY_COST_DESC = "Precio desc.";
const ORDER_BY_COST_ASC = "Precio asc.";
const ORDER_BY_RELEVANCE = "Relevancia";
var currentProductsArray = [];
//Defino minCost y maxCost como undefined porque van a comenzar sin un valor asignado
var minCost = undefined;
var maxCost = undefined;

//Funcion que determina el orden segun el criterio
function sortProducts(criteria, array) {
    //Array que contendra a los objetos ordenados segun el criterio
    let result = [];
    if (criteria === ORDER_BY_COST_ASC) {
        //Mediante sort determino que si a < b entonces que pocisione a antes que b y que si a > b que posicione a despues que b
        result = array.sort(function (a, b) {
            //a.cost y b.cost son los costos que estan en el json
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_COST_DESC) {
        //En este caso hacemos lo mismo pero al reves para que los precios queden de mayor a menor
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_RELEVANCE) {
        //Con el mismo uso de sort ahora llamamos a soldCount para dererminar los mas populares
        result = array.sort(function (a, b) {
            let aCount = a.soldCount;
            let bCount = b.soldCount;
            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    //Devolvemos result para que lea el array ordenado que definimos y llenamos arriba.
    return result;
}


//Funcion para mostrar lo productos y sus caracteristicas en html
function showProducts() {
    //Defino esta variable para mediante DOM al final de la funcion agregarle lo que se mostrara en html
    let htmlContent = "";
    //Este for ejecuta el codigo siguiente por cada elemento de ProductsArray, en este caso escribe html pero aun sin mostrarse
    for (let products of ProductsArray) {
        //Este if determina que si minCost es indefinido (todavia no se le ingreso nada) o esta definido y esta entre minCost y maxCost muestre la lista de productos
        if (((minCost == undefined) || (minCost != undefined && products.cost >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && products.cost <= maxCost))) {
            htmlContent += `<a href="category-info.html" class="list-group-item list-group-item-action" class="result">
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
                    <p class="mb-1">Precio: `+ products.currency + products.cost + `</p>
                </div>
            </div> 
        </a>`

        }
        //Mediante DOM se muestra lo que escribi en el for introduciendolo en la variable htmContent definida al principio de esta funcion
        document.getElementById("prod-list-container").innerHTML = htmlContent
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    //Esta funcion esta definida detalladamente en init.js, la llamo con el url PRODUCTS_URL para utilizar los elementos del JSON luego en la funcion showProducts
    //Lo que hace es usar un fetch para obtener el JSON
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        //Con este if definimos que si el status del pedido json es correcto nos de el ProductsArray y ejecute la funcion showProducts.
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data;
            //En vez de usar showProducts como en la entrega anterior, ahora usamos sortAndShowProducts para asignarle un orden inicial, en este caso por menor precio
            sortAndShowProducts(ORDER_BY_COST_ASC, ProductsArray);
        }
    });

    //Funcion que asigna arrays a sortProducts para que sean ordenados
    function sortAndShowProducts(sortCriteria, productsSortArray) {
        currentSortCriteria = sortCriteria;
        if (productsSortArray != undefined) {
            currentProductsArray = productsSortArray;
        }

        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

        showProducts();
    }

    //estos addEventListener hacen que mediante un click se llame a sortAndShowProducts y ordene segun el criterio dado
    document.getElementById("PrecioDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_COST_DESC);
    });

    document.getElementById("PrecioAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_COST_ASC);
    });


    document.getElementById("Rel").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });



    //Funcion que limpia los campos del filtro costo minimo y maximo.
    document.getElementById("clearRangeCost").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProducts();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;


        showProducts();
    });

});
