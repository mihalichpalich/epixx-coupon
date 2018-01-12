function getJSON (url, cb) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.addEventListener('load', function() {
    var responseJson = JSON.parse(this.responseText);
    cb(responseJson);
  });
  oReq.send();
}

var cartsDataArray = [];

getJSON('js/dev/data.json', function(arr) {
  cartsDataArray = arr;
  createItems(cartsDataArray);
});

var catalogList = document.querySelector('.catalog__list');

function createItems(arr) {
  catalogList.innerHTML = "";
  arr.forEach(function(item) {
    createOneItem(item);
  });
  //console.log(catalogListChildren);
}

function createOneItem(item) {
  var newItem = document.createElement('a');
  newItem.classList.add('catalog_cart', 'catalog__item');

  if (item.special) {
    newItem.classList.add('catalog_cart--special');
  }

  newItem.setAttribute('href', '#');
  newItem.setAttribute('data-type', item.type);
  newItem.setAttribute('data-special', item.special);
  newItem.setAttribute('data-price', item.priceNew);
  newItem.setAttribute('data-metro', item.metro);

  var itemDateTo = item.dateTo;
  var dateTo = new Date(itemDateTo);

  var dateToDay = dateTo.getDate();
  if (dateToDay < 10) {
    dateToDay = '0' + dateToDay;
  }

  var dateToMonth = dateTo.getMonth()+1;
  if (dateToMonth < 10) {
    dateToMonth = '0' + dateToMonth;
  }

  var dateToYear = dateTo.getFullYear();

  var dateToFull = dateToYear + ', ' + dateToMonth + ', ' + dateToDay;

  newItem.setAttribute('data-date-to', dateToFull);
  newItem.setAttribute('data-date-from', item.dateFrom);

  newItem.innerHTML =
  '<div class="catalog_cart__image"><img src="' + item.backgroundUrl + '">' +
    '<div class="catalog_cart__timer timer">' +
      '<div class="timer__item"><span>1</span><span>day</span></div>' +
      '<div class="timer__item"><span>3</span><span>hour</span></div>' +
      '<div class="timer__item"><span>40</span><span>min</span></div>' +
      '<div class="timer__item"><span>13</span><span>sec</span></div>' +
    '</div>' +
  '</div>' +
  '<div class="catalog_cart__content">' +
  '<div class="catalog_cart__discount">' + item.discount + '%</div>' +
  '<p class="catalog_cart__title">' + item.title + '</p>' +
  '<div class="catalog_cart__footer">' +
      '<p class="catalog_cart__price"><span class="price catalog_cart__price_old">' + item.priceOld + '</span><span class="price catalog_cart__price_new">' + item.priceNew + '</span></p>' +
      '<div class="catalog_cart__btn">' +
      '<p class="btn">to cart</p>' +
      '</div>' +
    '</div>' +
  '</div>';
  //console.log(newItem);
  renderDate(dateTo, newItem);

  newItem.querySelector('.btn').addEventListener('click', addToCard);

  catalogList.appendChild(newItem);
}

// таймер
var now = new Date();
const SECONDS_IN_MINUTES = 60;
const SECONDS_IN_HOURS = 60*60;
const SECONDS_IN_DAY = 60*60*24;

function renderDate(objectDate, div) {
  var secOverall = Math.floor((objectDate - now)/1000);

  var dayAmount = Math.floor(secOverall/SECONDS_IN_DAY);
  var hoursAmount = Math.floor((secOverall%SECONDS_IN_DAY)/SECONDS_IN_HOURS);
  var minutesAmount = Math.floor((secOverall%SECONDS_IN_HOURS)/SECONDS_IN_MINUTES);
  var secondsAmount = Math.floor(secOverall%SECONDS_IN_MINUTES);

  var daysDiv = div.querySelector('.timer__item:nth-of-type(1)  span:nth-of-type(1)');
  var hoursDiv = div.querySelector('.timer__item:nth-of-type(2)  span:nth-of-type(1)');
  var minutesDiv = div.querySelector('.timer__item:nth-of-type(3)  span:nth-of-type(1)');
  var secondsDiv = div.querySelector('.timer__item:nth-of-type(4)  span:nth-of-type(1)');

  //console.log(daysDiv);

  function countdown() {
    secOverall--;
    secondsAmount--;

    if (secondsAmount < 0) {
      secondsAmount = 59;
      minutesAmount--;
    }

    if (minutesAmount < 0) {
      minutesAmount = 59;
      hoursAmount--;
    }

    if (hoursAmount < 0) {
      hoursAmount = 23;
      dayAmount--;
    }

    if (secOverall < 0) {
      clearInterval(count);
      div.classList.add('catalog_cart--disabled');
    }

    daysDiv.innerHTML = dayAmount;
    hoursDiv.innerHTML = hoursAmount;
    minutesDiv.innerHTML = minutesAmount;
    secondsDiv.innerHTML = secondsAmount;
  }

  var count = setInterval(countdown, 1000);
}

function addToCard(e) {
  e.preventDefault();
  var item = this.closest('.catalog_cart');

  if (!item.classList.contains('catalog_cart--disabled')) {
    var title = item.querySelector('.catalog_cart__title').textContent;
    var price = Number(item.dataset.price);
    var itemObj = {
      title: title,
      price: price,
    };
    arrayCart.push(itemObj);
  }
  //console.log(arrayCart);
  calculatePrice();
  renderCart();
}