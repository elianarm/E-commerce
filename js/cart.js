//Variables globales que utilizo para total subtotal y envio
let envio = 0;
let subtotal = 0;
let total = 0;
let porcenvio = 0;

document.addEventListener("DOMContentLoaded", function (e) {

    getCart(CART_INFO_DESAFIANTE)
        .then(response => {
            productsCart = response.articles;
            showCartInfo();
        })

    //LLamado a los input buttons de envio para que cuando sean seleccionados 
    //dependiendo de la seleccion se calcule el porcentaje del envio
    document.getElementById("premium").addEventListener("change", function () {
        porcenvio = (parseInt(document.getElementById("premium").value) / 100);
        updateTotal();
    })
    document.getElementById("express").addEventListener("change", function () {
        porcenvio = (parseInt(document.getElementById("express").value) / 100);
        updateTotal();
    })
    document.getElementById("estandar").addEventListener("change", function () {
        porcenvio = (parseInt(document.getElementById("estandar").value) / 100);
        updateTotal();
    })

    //cuando clickeamos transferencia se desabilita la parte de tarjeta de credito
    document.getElementById("transferencia").addEventListener("change", function () {
        var form1 = document.getElementById("form1");
        var elements1 = form1.elements;

        var form2 = document.getElementById("form2");
        var elements2 = form2.elements;


        for (var i = 0, len = elements1.length; i < len; ++i) {
            elements1[i].readOnly = true;
        }
        for (var i = 0, len = elements2.length; i < len; ++i) {
            elements2[i].readOnly = false;

        }
    })

    //Cuando clickeamos tarjeta de credito desabilita la parte de transferencias
    document.getElementById("credito").addEventListener("change", function () {
        var form1 = document.getElementById("form1");
        var elements1 = form1.elements;

        var form2 = document.getElementById("form2");
        var elements2 = form2.elements;

        for (var i = 0, len = elements1.length; i < len; ++i) {
            elements1[i].readOnly = false;
            elements1[i].required = false;

        }
        for (var i = 0, len = elements2.length; i < len; ++i) {
            elements2[i].readOnly = true;

        }

    });

    //Validacion de metodo de pago
    document.getElementById("comprar").addEventListener("click", function () {
        var cred1 = document.getElementById("cred1").value;
        var cred2 = document.getElementById("cred2").value;
        var cred3 = document.getElementById("cred3").value;
        var transf1 = document.getElementById("transf1").value;

        var cred = document.getElementById("credito");
        var transf = document.getElementById("transferencia");

        //si esta desabilitada la parte de credito(es decir que se selecciono transferencia) 
        //y ademas transferencia tiene un argo mayor a cero alerta 'su compra se ha realizado con exito'
        //o si esta desbilitada la parte transferencias y todos los campos tienen un largo distinto de cero
        //alerta 'Su compra se ha realizado con exito'
        if (((cred.readOnly = true) && (transf1.length != 0)) || ((transf.readOnly = true) && (cred1.length != 0) && (cred2.length != 0) && (cred3.length != 0))) {

            alert('Su compra se ha realizado con exito');

        } else {
            alert('Debe completar todos los campos')
        }



    })




});




//Funcion que actualiza el subtotal, total y envio.
function updateTotal() {
    let cost = 0;
    let cant = 0;

    for (let i = 0; i < productsCart.length; i++) {
        cost = productsCart[i].unitCost;
        cant = document.getElementById(i).value;

        document.getElementById("sub" + i).innerHTML = productsCart[i].currency + cost * cant;
        if (productsCart[i].currency != "UYU") {
            subtotal += (cost * 40) * cant;

        } else {
            subtotal = cost * cant
        }

    }

    //porcenvio proviene de los eventos change que llamamos en el DOMContentLoaded
    envio = porcenvio * subtotal;
    total = subtotal + envio;

    //agrego al html los resutlados
    document.getElementById("envio").innerHTML = `<td colspan="3" id="envio">UYU ${envio}</td></tr>`;
    document.getElementById("subtotal").innerHTML = `<td colspan="3" id="subtotal">UYU ${subtotal}</td></tr>`
    document.getElementById("totaltd").innerHTML = `<td colspan="3" id="totaltd">UYU ${total}</td>`;
}


function getCart(url) {

    return fetch(url)
        .then(response => {
            return response.json();
        })

}

function showCartInfo() {
    let htmlCart = " ";

    for (let i = 0; i < productsCart.length; i++) {
        const prodCarrito = productsCart[i];
        htmlCart += ` 
        <tr id="prod${i}">
            
            <td class="align-middle">
            <a href="#"><img src="img/trash.png" style="width:45px;height:45px;" id="trash${i}" onclick="removeProd()"></a>
            <img class="imgCart" src="${prodCarrito.src}" alt="" width="200px">${prodCarrito.name}</td>
            <td class="align-middle">${prodCarrito.currency}${prodCarrito.unitCost}</td>
            <td class="align-middle"><input type="number" min ="1" value=${prodCarrito.count} id ="${i}" class="cantidad" onchange ="updateTotal()"></td>
            <td class="align-middle" id=${"sub" + i}>${prodCarrito.currency} ${prodCarrito.unitCost * prodCarrito.count}</td>
        </tr>`
    }
    document.getElementById("info").innerHTML += htmlCart;
}

