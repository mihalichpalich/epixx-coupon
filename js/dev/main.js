//catalog
var catalogViewToogle = document.querySelectorAll(".catalog_view__item");

for (var i=0; i<catalogViewToogle.length; i++) {
  catalogViewToogle[i].addEventListener('click', function(e) {
    var elem = e.currentTarget;

    if(!elem.classList.contains('catalog_view__item--active')) {
      document.querySelector(".catalog_view__item--active").classList.remove('catalog_view__item--active');
      elem.classList.add('catalog_view__item--active');
    }
  });
}

//basket
var arrayCart = [];
var btnsToCard = document.querySelectorAll('.catalog_cart__btn  .btn');
var list = document.querySelector('.catalog_basket__list');
var finalPrice = document.querySelector('.catalog_basket__summ_text');

for(var i = 0; i < btnsToCard.length; i++) {
  btnsToCard[i].addEventListener('click', addToCard);
}

function addToCard(e) {
  e.preventDefault();
  var item = this.closest('.catalog_cart');
  var title = item.querySelector('.catalog_cart__title').textContent;
  var price = Number(item.dataset.price);
  var itemObj = {
    title: title,
    price: price,
  };
  arrayCart.push(itemObj);
  calculatePrice();
  renderCart();
}

function removeFromCard() {
  list.innerHTML = "";
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
  finalPrice.textContent = price;
}