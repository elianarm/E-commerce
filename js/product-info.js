var comentarios = []
var comentariosNuevos = []
var calificacion = undefined;
document.addEventListener("DOMContentLoaded", function (e) {
    //obtengo el json de la informacion del producto.
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfo = resultObj.data;
        };
        showProductsImages();
        showProductsInfo();

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                Products = resultObj.data;
            };
            showRelatedProd();
        })

    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsComments = resultObj.data;
        };
        showComments();
    })

});

//Funcion que devuelve los productos relacionados.
function showRelatedProd() {
    let htmlRelated = "";
    //Este array es el array dentro de ProductsInfo llamado relatedProducts.
    let ProductsRelated = ProductsInfo.relatedProducts
    //Este for va de 0 a 2
    for (let i = 0; i < ProductsRelated.length; i++) {
        //Defino una variable como el array Products related para llamarlo luego.
        //Mas abajo llamo a Products que es lo que devuelve el json PRODUCT.
        //LLamo a los productos que ocupan la misma posicion que indica el array relatedProducts, es decir 1 y 3 
        //y con el for recorro products para encontrarlos y mostrarlos luego.
        const related = ProductsRelated[i];
        htmlRelated += `
        <div class="relatedCards custom-card card text-center col-md-3">
            <img src="`+ Products[related].imgSrc + `" alt="imagen" style="width:100%" class="imgrelated">
            <div class="container prodcards">
                <h5><b>`+ Products[related].name + `</b></h5> 
                <p>`+ Products[related].description + `</p> 
                <h6>`+ Products[related].currency + `$` + Products[related].cost + `</h6>
                <a type="button" class="btn btn-dark" href="product-info.html" id="verprod">Ver producto</a><br><br>
            </div>
        </div>`
    }
    document.getElementById("relatedProd").innerHTML += htmlRelated;
}

//Esta funcion muestra la informacion del producto mediante DOM.
function showProductsInfo() {
    let nombre = document.getElementById("productName");
    let costInfo = document.getElementById("costInfo");
    let descripcion = document.getElementById("productDescription");
    let cantProd = document.getElementById("productCountInfo");

    nombre.innerHTML += ProductsInfo.name;
    costInfo.innerHTML += ProductsInfo.currency + "$ " + ProductsInfo.cost;
    descripcion.innerHTML += ProductsInfo.description;
    cantProd.innerHTML += ProductsInfo.soldCount

}
//Esta funcion muestra las imagenes del producto que viene en el json mediante DOM.
function showProductsImages() {
    let imagenes = document.getElementById("productInfoImages");
    let htmlProductsInfo = "";
    htmlProductsInfo += `<div class="carousel-item active item">
    <img src="`+ ProductsInfo.images[0] + `" class="d-block w-100" alt="..." />
    </div>`
    for (let i = 1; i < ProductsInfo.images.length; i++) {
        let image = ProductsInfo.images[i];
        htmlProductsInfo += `
        <div class="carousel-item item" id="image`+ i + `">
                <img src="`+ image + `" class="d-block w-100" alt="..." />
              </div>
        `
    }

    imagenes.innerHTML += htmlProductsInfo;

}

//Esta funcion escribe la cantidad de estrellas de puntuacion.
function drawStars(stars) {
    calificacion = parseInt(stars);
    let html = " ";
    for (let i = 1; i <= calificacion; i++) {
        html += `<span class="fa fa-star checked"></span>`
    }
    for (let j = calificacion + 1; j <= 5; j++) {
        html += `<span class="fa fa-star not-checked"></span>`
    }
    return html;

}

//Esta funcion da la opcion de calificar con estrellas.
function califStars(calif) {
    calif = undefined;
    let estrellas = document.querySelectorAll(".fa-star");
    //cuando damos click en calif, que es un div, se desata un evento.
    //Obtengo el target del evento que devuelve el 'data-value' de las estrellas
    document.getElementById("calif").addEventListener("click", evento => {
        let object = evento.target;
        //target es el numero que le asigne segun la posicion de la estrella, por ejemplo la primera estrella tiene como data-value="1"
        //Si cuando obtengo el target es distinto a null calif toma el valor.
        if (object.getAttribute('data-value') != null) {
            calif = object.getAttribute('data-value')

        }

        if (calif != undefined) {
            //Este for va de 0 a calif, siendo calif la cantidad de estrellas que marcamos.
            //Para esa cantidad cambia la clase far por fas (una estrella vacia por una coloreada).
            for (let i = 0; i < calif; i++) {
                estrellas[i].classList.replace('far', 'fas');

            }
            //para el resto de las estrellas reemplaza de manera contraria.
            for (let j = calif; j < 5; j++) {
                estrellas[j].classList.replace('fas', 'far')

            }
        }

        //asigno a calificacion el valor de la estrella que marque para usarla mas adelante.
        calificacion = object.getAttribute('data-value');

    })

}

califStars(calificacion);

function submitComment() {
    //Este addeventlistener hace que al dar click se guarde el comentario que escribimos:
    //la calificacion, la fecha y el usuario para mostrarlo en el html mediante comentariosNuevos
    document.getElementById("enviar").addEventListener("click", function () {
        let comment = document.getElementById("comment").value;
        //obtiene la fecha exacta en que enviamos el comentario.
        let today = new Date();
        //slice hace que muestre dos caracteres, es para que agregue el cero al mes.
        let date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let user = localStorage.getItem("e-mail");
        //Array creado al principio del documento.
        comentariosNuevos = `
        <div class="comment-main-level">
            <div class="comment-avatar">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="">
            </div>
            <div class="comment-box">
                <div class="comment-head">
                    <h6 class="comment-name by-author"><a href="product-info.html">` + user + `</a></h6>
			        <span id="submitStars">` + drawStars(calificacion) + `</span>
                    <i>` + date + `</i>
                </div>
                <div class="comment-content">`
            + comment +
            `</div>
            </div>
        </div>`
        //newComment es un li en html para agregar los nuevos comentarios por encima de los viejos
        document.getElementById("newComment").innerHTML += comentariosNuevos;

    });

}

submitComment();

//Funcion que muestra los comentarios obtenidos del json.
function showComments() {
    //este for recorre los elementos de json de comentarios y los muestra mediante comentarios.
    for (let i = 0; i < ProductsComments.length; i++) {
        let comment = ProductsComments[i];
        comentarios +=
            `<li>
            <div class="comment-main-level"> 
                <div class="comment-avatar"><img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" width="50px">
                </div>
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name by-author"><a href="product-info.html">` + comment.user + `</a></h6>
                        <span>` + drawStars(comment.score) + `</span>
                        <i>` + comment.dateTime + `</i>						
                    </div>
                    <div class="comment-content">`
            + comment.description +
            `</div>
                </div>
            </div>
      </li>`;
    }
    //agrega los comentarios a comments-list para que se muestren en html
    document.getElementById("comments-list").innerHTML += comentarios;
}
