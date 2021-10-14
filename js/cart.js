
document.addEventListener("DOMContentLoaded", function (e) {

    getCart(CART_INFO_DESAFIANTE)
        .then(response => {
            productsCart = response.articles;
            showCartInfo();
        })

});

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
        <tr>
            <td class="align-middle"><img class="imgCart" src="${prodCarrito.src}" alt="" width="200px">${prodCarrito.name}</td>
            <td class="align-middle">${prodCarrito.currency}${prodCarrito.unitCost}</td>
            <td class="align-middle"><input type="number" min ="1" value=${prodCarrito.count} id ="${i}" class="cantidad" onchange ="updateSubtotal()"></td>
            <td class="align-middle" id=${"sub" + i}>${prodCarrito.currency} ${prodCarrito.unitCost * prodCarrito.count}</td>
        </tr>`
    }
    document.getElementById("info").innerHTML += htmlCart;
}

function updateSubtotal() {
    let cost = 0;
    let cant = 0;
    let subtotal = 0;
    for (let i = 0; i < productsCart.length; i++) {
        cost = productsCart[i].unitCost;
        cant = document.getElementById(i).value;

        document.getElementById("sub" + i).innerHTML = productsCart[i].currency + cost * cant;
        if (productsCart[i].currency != "UYU") {
            subtotal += (cost * 40) * cant;

        } else {
            subtotal += cost * cant

        }


    }
    let total = subtotal;
    document.getElementById("total").innerHTML = `<tr><th colspan="2"></th><th>Total</th><td colspan="3" id="totaltd">UYU ${total}</td></tr>`;
}