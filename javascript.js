const bar = document.getElementById('bar');
const navbar = document.querySelector('.navbar');
const close = document.getElementById('close');

bar.addEventListener('click', () => {
    navbar.classList.add('active');
})

close.addEventListener('click', () => {
    navbar.classList.remove('active');
})

const productFaces = document.querySelectorAll('.small-face');
const mainFace = document.querySelector('.main-face');
productFaces.forEach(face => face.addEventListener('click', function() {
    mainFace.src = face.src;
}));

var faceDetails = document.getElementById('face-details');
var closePopupButtons = document.querySelectorAll('[data-close-button]');
var overlay = document.getElementById('overlay');

function openPopUp() {
    faceDetails.classList.add('active');
    overlay.classList.add('active');
}

function closePopUp() {
    faceDetails.classList.remove('active');
    overlay.classList.remove('active');
}

const seniors = document.querySelectorAll('.senior');
seniors.forEach(senior => senior.addEventListener('click', openPopUp));

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        closePopUp();
    })
})

overlay.addEventListener('click', () => {
    closePopUp();
})

