//catalog
var catalogViewToogle = document.querySelectorAll(".catalog_view__item");

for (var i=0; i<catalogViewToogle.length; i++) {
  catalogViewToogle[i].addEventListener('click', function(e) {
    var elem = e.currentTarget;

    if(!elem.classList.contains('catalog_view__item--active')) {
      document.querySelector(".catalog_view__item--active").classList.remove('catalog_view__item--active');
      elem.classList.add('catalog_view__item--active');
    }

    if (catalogViewToogle[0].classList.contains('catalog_view__item--active')) {
      catalogList.classList.remove('catalog__list--three');
      catalogList.classList.add('catalog__list--two');
    } else {
      catalogList.classList.remove('catalog__list--two');
      catalogList.classList.add('catalog__list--three');
    }
  });
}

//basket
var arrayCart = [];
var btnsToCard = document.querySelectorAll('.catalog_cart__btn  .btn');
var list = document.querySelector('.catalog_basket__list');
var finalPrice = document.querySelector('.catalog_basket__summ_text');

for(i = 0; i < btnsToCard.length; i++) {
  btnsToCard[i].addEventListener('click', addToCard);
}

function removeFromCard() {
  var catalogBasketLine = (this.parentNode).parentNode;
  var catalogBasketLinePrice = Number(catalogBasketLine.querySelector('.price').innerHTML).toFixed(1);
  var summarizedPrice = Number(finalPrice.innerHTML).toFixed(1);

  catalogBasketLine.remove();
  arrayCart.pop();

  var decreasePrice = summarizedPrice - catalogBasketLinePrice;
  finalPrice.innerHTML = decreasePrice.toFixed(1);
  //console.log(decreasePrice);
}

function cleanCart() {
  list.innerHTML = "";
}

function renderCart() {
  cleanCart();
  arrayCart.forEach(function(item, i) {
    var newItem = document.createElement('div');
    newItem.className = "catalog_basket__line";
    newItem.innerHTML = '<div class="catalog_basket__product">' + item.title + '</div>' +
    '<div class="catalog_basket__price price">' + item.price + '</div>' +
    '<div class="catalog_basket__close">' +
    '<img src="img/svg/i-close.svg" alt="close">' +
    '</div>';
    newItem.querySelector('.catalog_basket__close  img').addEventListener('click', removeFromCard);
    list.appendChild(newItem);
  });
}

function calculatePrice() {
  var price = 0;
  arrayCart.forEach(function(item, i) {
    price += item.price;
  });
  finalPrice.textContent = price.toFixed(1);
}

//modal window
var buyButton = document.querySelector('.catalog_basket__summ .btn');
var modalUnderlay = document.querySelector('.modal_underlay');
var modalWindow = document.querySelector('.modal_order');
var modalSuccess = document.querySelector('.modal_success');
var modalClose = modalWindow.querySelector('.modal__close');
var modalLoader = document.querySelector('.loader');

buyButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (finalPrice.innerHTML != "0") {
    modalUnderlay.style.display = "block";
    modalWindow.style.display = "block";
  }
});

modalUnderlay.addEventListener('click', function() {
  e.preventDefault();
  this.style.display = "none";
  modalWindow.style.display = "none";
});
modalClose.addEventListener('click', function(e) {
  modalWindow.style.display = "none";
  modalUnderlay.style.display = "none";
});
//console.log(buyButton);
var modalLines = modalWindow.querySelectorAll('.modal__line');
var modalNameInput = modalLines[0].querySelector('.input');
var modalPhoneInput = modalLines[1].querySelector('.input');
var modalEmailInput = modalLines[2].querySelector('.input');
var modalCheckboxes = modalWindow.querySelectorAll('.checkbox__input');
var modalBuyButton = modalWindow.querySelector('.btn');
var reName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
var rePhone = /([0-9-+\s])+/g;
var reEmail = /^([a-zA-Z0-9@.]+|\d+)$/i;

modalBuyButton.addEventListener('click', function(e) {
  e.preventDefault();
  var modalLinesValid = 1;

  if (!reName.test(modalNameInput.value) || modalNameInput.value == "" || !rePhone.test(modalPhoneInput.value) || modalPhoneInput.value == "" || !reEmail.test(modalEmailInput.value) || modalEmailInput.value == "") {
    modalLinesValid = 0;
  }

  var checkedCounter = 0;

  for (i=0; i<modalCheckboxes.length; i++) {
    if (modalCheckboxes[i].checked) {
      checkedCounter++;
    }
  }

  //console.log(modalLinesValid, checkedCounter);
  if (checkedCounter == 1 && modalLinesValid == 1) {
    modalWindow.style.display = "none";
    modalUnderlay.style.display = "none";
    //modalSuccess.style.display = "block";
    modalLoader.style.position = "fixed";
    modalLoad(modalLoader, "block");
    setTimeout(modalLoad, 1000, modalLoader, "none");
    setTimeout(modalLoad, 1000, modalSuccess, "block");
    setTimeout(modalLoad, 1500, modalSuccess, "none");
  }
});

function modalLoad(modalElem, displayValue) {
  modalElem.style.display = displayValue;
}