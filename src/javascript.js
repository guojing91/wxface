const bar = document.getElementById('bar');
const navbar = document.querySelector('.navbar');
const close = document.getElementById('close');
const proDesCat = document.getElementById('pro-des-cat');
const proDesName = document.getElementById('pro-des-name');
const proDesPrice = document.getElementById('pro-des-price');
const proDesBio = document.getElementById('pro-des-bio');


var closePopupButtons = document.querySelectorAll('[data-close-button]');
var overlay = document.getElementById('overlay');

// 1. INDEX Page

// 1a. Generate Feature Cards

let feature = document.getElementById('feature');

let generateFeatureCards = () => {
    return (feature.innerHTML = indexFeatures.map((card) => {
        let img = card.imgName;
        let tag = card.tagLine;
        return `
        <div class="fe-box">
            <img src="${img}" alt="">
            <h6>${tag}</h6>
        </div>
        `;
    }).join(""));
};

generateFeatureCards();

// 1b. Generate Senior Cards

let theDeepSeniors = document.getElementById('senior-container');

let generateSeniorCards = () => {
    return (theDeepSeniors.innerHTML = theDeep.map((card) => {
        let img = card.imgName;
        let name = card.name;
        let price = card.price;
        let i = card.number;
        return `
        <div class="senior product-card">
            <img src="${img}" alt="">
            <div class="des senior-${i}">
                <span>the deep</span>
                <h5>${name}</h5>
                <div class="star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <h4>$${price}</h4>
            </div>
            <a href="#"><i class="fa fa-shopping-cart cart"></i></a>
        </div>
        `;
    }).join(""));
}

generateSeniorCards();

// 1c. Generate Newcomer Cards

let theSurfaceNewcomers = document.getElementById('newcomer-container');

let generatorNewcomerCards = () => {
    return (theSurfaceNewcomers.innerHTML = theSurface.map((card) => {
        let img = card.imgName;
        let name = card.name;
        let price = card.price;
        let i = card.number;
        return `
        <div class="newcomer product-card">
            <img src="${img}" alt="">
            <div class="des new-${i}">
                <span>the surface</span>
                <h5>${name}</h5>
                <div class="star">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <h4>$${price}</h4>
            </div>
            <a href="#"><i class="fa fa-shopping-cart cart"></i></a>
        </div>
        `;
    }).join(""));
}

generatorNewcomerCards();



function closePopUp() {
    faceDetails.classList.remove('active');
    overlay.classList.remove('active');
}

function firstLetterCapital(sentence) {
    var words = sentence.split(' ');
    var capitalizedWords = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        capitalizedWords.push(capitalizedWord);
    }

    var capitalizedSentence = capitalizedWords.join(' ');
    return capitalizedSentence;
}

bar.addEventListener('click', () => {
    navbar.classList.add('active');
})

close.addEventListener('click', () => {
    navbar.classList.remove('active');
})

// Pop up product details for selection before adding to cart

var faceDetails = document.getElementById('face-details');

const productCard = document.querySelectorAll('.product-card');
productCard.forEach(card => card.addEventListener('click', function () {

    // Pop up dialogue and overlay grey for other area

    faceDetails.classList.add('active');
    overlay.classList.add('active');
    var img = this.querySelector('img');
    mainFace.src = img.src;

    // Change category name to be the selection category: The Deep or The Surface

    var desInfoCat = document.getElementById('pro-des-cat');
    var desInfoParent = this.querySelector('.des');
    var oriInfoCat = desInfoParent.querySelector('span');
    desInfoCat.innerText = firstLetterCapital(oriInfoCat.innerText);

    // Change the product name to be the selected name

    var desInfoName = document.getElementById('pro-des-name');
    var oriInfoName = desInfoParent.querySelector('h5');
    desInfoName.innerText = oriInfoName.innerText;

    // Change the product price to be the selected price

    var desInfoPrice = document.getElementById('pro-des-price');
    var oriInfoPrice = desInfoParent.querySelector('h4');
    desInfoPrice.innerText = `${oriInfoPrice.innerText}.00`;

    // To refresh input value to 1 every time a card is selected

    var defaultInputValue = document.getElementById('user-input-qty');
    defaultInputValue.value = 1;

    // To refresh status to "Happy" every time a cart is selected

    var defaultStatus = document.getElementById('user-input-status');
    defaultStatus.value = "Happy";

    // To generate 4 smaller images under the selected product as other choices

    // This is for when The Deep is selected

    if (desInfoCat.innerText === 'The Deep') {
        var number = desInfoName.innerText.match(/\d+/)[0];
        for (let i = 0; i < productFaces.length; i++) {
            productFaces[i].src = `file:///Users/GJ/Desktop/Web%20Dev/Portfolio-WxFace-ECommerce-Website/wxface/the-deep-senior/senior-${number}.jpg`;
            number++;
            if (number > 8) {
                number = 1;
            }
        }

        // This is for when The Surface is selected

    } else if (desInfoCat.innerText === 'The Surface') {
        var number = desInfoName.innerText.match(/\d+/)[0];
        for (let i = 0; i < productFaces.length; i++) {
            productFaces[i].src = `file:///Users/GJ/Desktop/Web%20Dev/Portfolio-WxFace-ECommerce-Website/wxface/the-surface-newcomer/new-${number}.jpg`;
            number++;
            if (number > 8) {
                number = 1;
            }
        }
    }

    // To change bio description to be the same as selected product bio

    var desInfoBio = document.getElementById('pro-des-bio');

    // This is when The Deep is selected

    if (desInfoCat.innerText === 'The Deep') {
        theDeep.forEach(face => {
            if (face.name === desInfoName.innerText) {
                desInfoBio.innerText = face.bio;
            }
        });

        // This is when The Surface is selected

    } else if (desInfoCat.innerText === 'The Surface') {
        theSurface.forEach(face => {
            if (face.name === desInfoName.innerText) {
                desInfoBio.innerText = face.bio;
            }
        });
    }
}));

// Change product info when new faces are selected in the product dialog

const productFaces = document.querySelectorAll('.small-face');
const mainFace = document.querySelector('.main-face');
productFaces.forEach(face => face.addEventListener('click', function () {
    mainFace.src = face.src;
    var newClass = face.src.split('/').pop().split('.')[0];
    var desInfoParent = document.querySelector(`.${newClass}`);
    var desInfoName = document.getElementById('pro-des-name');
    var oriInfoName = desInfoParent.querySelector('h5');
    desInfoName.innerText = oriInfoName.innerText;

    var desInfoCat = document.getElementById('pro-des-cat');

    var desInfoBio = document.getElementById('pro-des-bio');
    if (desInfoCat.innerText === 'The Deep') {
        theDeep.forEach(face => {
            if (face.name === desInfoName.innerText) {
                desInfoBio.innerText = face.bio;
            }
        });
    } else if (desInfoCat.innerText === 'The Surface') {
        theSurface.forEach(face => {
            if (face.name === desInfoName.innerText) {
                desInfoBio.innerText = face.bio;
            }
        });
    }
}));

// To update cart when add to cart button is clicked on product dialog


var addToCartBtn = document.querySelector('.add-to-cart-btn');
addToCartBtn.addEventListener('click', () => {
    var basket = JSON.parse(localStorage.getItem('data')) || [];
    var userInputQty = document.getElementById('user-input-qty');
    var userInputStatus = document.getElementById('user-input-status');
    var desInfoName = document.getElementById('pro-des-name');
    var desInfoPrice = document.getElementById('pro-des-price');
    var selectedItemId;
    var selectedItemQty = Number(userInputQty.value);
    var selectedItemStatus = userInputStatus.value;
    var desInfoCat = document.getElementById('pro-des-cat');
    if (desInfoCat.innerText === 'The Deep') {
        theDeep.forEach(face => {
            if (face.name === desInfoName.innerText) {
                selectedItemId = face.id;
            }
        });
    } else if (desInfoCat.innerText === 'The Surface') {
        theSurface.forEach(face => {
            if (face.name === desInfoName.innerText) {
                selectedItemId = face.id;
            }
        });
    }
    var search = basket.find(face => face.id === selectedItemId && face.status === selectedItemStatus);
    if (search === undefined) {
        basket.push({
            id: selectedItemId,
            category: desInfoCat.innerText,
            name: desInfoName.innerText,
            status: selectedItemStatus,
            price: desInfoPrice.innerText,
            item: selectedItemQty,
            img: mainFace.src,
        });
    } else {
        search.item += selectedItemQty;
    }

    localStorage.setItem("data", JSON.stringify(basket));
    alert('Added To Cart!')
});

// To close product dialog whenever exit button or when overlay area is clicked

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        closePopUp();
    })
})

overlay.addEventListener('click', () => {
    closePopUp();
})

// to avoid user from selecting or entering number less than 0 adding to cart
var inputElement = document.getElementById("user-input");
inputElement.addEventListener("input", function (event) {
    var inputValue = event.target.value;
    if (inputValue < 1) {
        event.target.value = 1;
    }
});

// function updateCartTotal() {

// }

//remove cart items
// var removeCartItemButtons = document.querySelectorAll('.remove');
// removeCartItemButtons.forEach(button => button.addEventListener('click', function () {
//     this.parentElement.parentElement.parentElement.remove();
// }));


