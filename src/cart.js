// update basket to have data from localStorage every time page is refreshed

var basket = JSON.parse(localStorage.getItem('data'));
var cartBody = document.getElementById('cart-table-body');

if (Array.isArray(basket) && basket.length > 0) {
    cartBody.innerHTML = '';
    basket.forEach(face => {
        var newRow = document.createElement('tr');
        var price = parseFloat(face.price.replace("$", "")).toFixed(2);
        newRow.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle remove"></i></a></td>
            <td><img src="${face.img}" alt=""></td>
            <td>${face.name}</td>
            <td>${face.status}</td>
            <td>${face.price}</td>
            <td><input type="number" value="${face.item}" min="1"></td>
            <td class="item-subtotal">$${price * face.item}.00</td>`;
        cartBody.appendChild(newRow);
    })
    calculateCartSubtotal();
    calculateCartGrandTotal();
}


// update cart every time new faces are added up cart by clicking add to cart button

window.addEventListener('storage', (e) => {
    if (e.key === 'data') {
        var updatedBasket = JSON.parse(e.newValue);
        basket = updatedBasket;
        localStorage.setItem("data", JSON.stringify(basket));
        if (Array.isArray(updatedBasket) && updatedBasket.length > 0) {
            cartBody.innerHTML = '';
            updatedBasket.forEach(face => {
                var newRow = document.createElement('tr');
                var price = parseFloat(face.price.replace("$", "")).toFixed(2);
                newRow.innerHTML = `
                    <td><a href="#"><i class="far fa-times-circle remove"></i></a></td>
                    <td><img src="${face.img}" alt=""></td>
                    <td>${face.name}</td>
                    <td>${face.status}</td>
                    <td>${face.price}</td>
                    <td><input type="number" value="${face.item}" min="1"></td>
                    <td>$${price * face.item}.00</td>`;
                cartBody.appendChild(newRow);
            });
        }
        calculateCartSubtotal();
        calculateCartGrandTotal();
    }
});

// update subtotal every time up or down arrow key is clicked on cart page inputs

var cartRows = document.querySelectorAll('#cart-table-body tr');
cartRows.forEach((row) => {
    var cartQtyValue = row.querySelector('td:nth-child(6) input');
    cartQtyValue.addEventListener('change', () => {
        console.log('clicked!');
        var cartPriceValue = row.querySelector('td:nth-child(5)');
        var cartPriceString = cartPriceValue.innerText.replace("$", "");
        var cartPrice = parseFloat(cartPriceString).toFixed(2);

        var cartQty = Number(cartQtyValue.value);

        var cartRowTotalValue = row.querySelector('td:nth-child(7)');
        var cartRowTotal = (cartPrice * cartQty).toFixed(2);
        cartRowTotalValue.innerText = `$${cartRowTotal}`;

        var faceName = row.querySelector('td:nth-child(3)');
        var faceStatus = row.querySelector('td:nth-child(4)');

        basket.forEach(face => {
            if (faceName.innerText === face.name && faceStatus.innerText === face.status) {
                face.item = cartQty;
                localStorage.setItem("data", JSON.stringify(basket));
            };
        })
        calculateCartSubtotal();
        calculateCartGrandTotal();
    })
});

// to remove items from cart and update localStorage

var removeBtn = document.querySelectorAll('.remove');
removeBtn.forEach(btn => btn.addEventListener('click', (e) => {
    var trToRemove = e.target.parentElement.parentElement.parentElement;
    var nameToRemove = trToRemove.querySelector('td:nth-child(3)').innerText;
    var statusToRemove = trToRemove.querySelector('td:nth-child(4)').innerText;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === nameToRemove && basket[i].status === statusToRemove) {
            basket.splice(i, 1);
        }
    }
    localStorage.setItem("data", JSON.stringify(basket));
    trToRemove.remove();
    calculateCartSubtotal();
    calculateCartGrandTotal();
}));

// to calculate cart subtotal

function calculateCartSubtotal() {
    var cartSubtotal = document.getElementById('cart-subtotal');
    var itemSubtotal = document.querySelectorAll('.item-subtotal');
    var cartSubtotalPrice = 0;
    itemSubtotal.forEach(tdPrice => {
        var subtotalPriceString = tdPrice.innerText.replace("$", "");
        var subTotalPrice = parseFloat(subtotalPriceString).toFixed(2);
        cartSubtotalPrice += Number(subTotalPrice);
    });
    cartSubtotal.innerText = `$${cartSubtotalPrice.toFixed(2)}`;
}

calculateCartSubtotal();

// to calculate grand total

function calculateCartGrandTotal() {
    var cartGrandTotal = document.getElementById('cart-grand-total');
    var shipping = document.getElementById('shipping');
    var cartSubtotal = document.getElementById('cart-subtotal');

    if (shipping.innerText === 'Free') {
        cartGrandTotal.innerText = cartSubtotal.innerText;
    } else {
        var cartGrandTotalPrice = Number(cartSubtotal.innerText.replace('$', '')) + Number(shipping.innerText.replace('$', ''));
        cartGrandTotal.innerText = `$${cartGrandTotalPrice.toFixed(2)}`;
    };
}

// clear cart page and localStorage basket when checkout button is clicked

var checkoutBtn = document.getElementById('checkout-btn');

var shipping = document.getElementById('shipping');
var cartSubtotal = document.getElementById('cart-subtotal');
var cartGrandTotalPrice = Number(cartSubtotal.innerText.replace('$', '')) + Number(shipping.innerText.replace('$', ''));
var cartGrandTotal = document.getElementById('cart-grand-total');

checkoutBtn.addEventListener('click', () => {
    if (cartGrandTotalPrice !== 0) {
        alert('Payment Complete!');
        cartSubtotal.innerText = '$0.00';
        shipping.innerText = '$0.00';
        cartGrandTotal.innerText = '$0.00';
        cartBody.innerHTML = '';
        basket = [];
        localStorage.setItem("data", JSON.stringify(basket));
        cartGrandTotalPrice = 0;
    } else if (cartGrandTotalPrice === 0) {
        alert('No faces to bring home! Add some faces!');
    }
});
