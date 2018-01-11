//filter
var filters = {
  type: [],
  metro: [],
  price: {
    from: null,
    to: null,
  },
  special: false,
  date: null,
};

var catalogItems = document.querySelectorAll('.catalog__item');
var checkboxTypes = document.querySelectorAll('.js-filters-type  input[type="checkbox"]');
var specialCheckbox = document.querySelector('.js-filters-special  input[type="checkbox"]');
var pricesInputs = document.querySelectorAll('.js-filters-price  input[type="text"]');
var dateInput = document.querySelector('.js-filters-date  input[type="date"]');
//console.log(catalogItems);

for(var i=0; i<checkboxTypes.length; i++) {
  checkboxTypes[i].addEventListener('change', function() {
    var name = this.parentNode.querySelector('.checkbox__label').textContent;
    if (this.checked) {
      filters.type.push(name);
    } else {
      var indexOfValue = filters.type.indexOf(name);
      if (indexOfValue != -1) {
        filters.type.splice(indexOfValue, 1);
      };
    };
    filterCatalog();
  });
};

specialCheckbox.addEventListener('change', function() {
  filters.special = this.checked;
  //console.log(filters.special);
  filterCatalog();
});

pricesInputs.forEach(function(input) {
  input.addEventListener('change', function() {
    var type = this.dataset.type;
    var value = Number(this.value);
    if (!isNaN(value)) {
      if (this.value === '') filters.price[type] = null;
      else filters.price[type] = this.value;
      filterCatalog();
    }
  });
});

// dateInput.addEventListener('change', function() {

// });

function filterCatalog() {
  catalogItems.forEach(function (item, i) {

    var shouldBeVisible = 1;

    //type
    if (filters.type.length) {
      var currentType = item.dataset.type;
      var flagDelete = filterByType(currentType);
      if (flagDelete) {
        shouldBeVisible *= 0;
      }
    }

    //console.log(item.dataset.special);
    //special offer
    if (filters.special && (item.dataset.special == "false")) {
      shouldBeVisible *= 0;
    }


    //price
    if (filters.price.from || filters.price.to) {
      var currentValue =+ item.dataset.price;
      var from = filters.price.from;
      var to = filters.price.to;

      if (from && currentValue < from) {
        shouldBeVisible *= 0;
      }
      if (to && currentValue > to) {
        shouldBeVisible *= 0;
      }
    }

    if (shouldBeVisible) {
      item.style.display = "inline-block";
    } else  {
      item.style.display = "none";
    }

  });

}

function filterByType(currentType) {
  return filters.type.indexOf(currentType) == -1;
}

var btnSortPrice = document.querySelector('.catalog_sort__item:first-child');
var btnSortDiscount = document.querySelector('.catalog_sort__item:last-child');
btnSortPrice.addEventListener('click', sortPrice);
btnSortDiscount.addEventListener('click', sortDiscount);

function sortPrice(e) {
  e.preventDefault();

  var catalogItemsPrice = document.querySelectorAll('[data-price]');
  var catalogItemsPriceArray = [];

  for (var i=0; i<catalogItemsPrice.length; i++) {
    catalogItemsPriceArray.push(catalogItemsPrice[i]);
  }

  catalogItemsPriceArray.sort(function(a, b) {
    if (Number(a.getAttribute("data-price")) > Number(b.getAttribute("data-price"))) {
      return 1;
    } else {
      return -1;
    }
  });

  for (var i=0; i<catalogItemsPriceArray.length; i++) {
    catalogList.appendChild(catalogItemsPriceArray[i]);
    //console.log(catalogItemsPriceArray[i].getAttribute("data-price"));
  }
}

function sortDiscount(e) {
  e.preventDefault();

  var catalogItemsPrice = document.querySelectorAll('[data-price]');
  var catalogItemsPriceArray = [];

  for (var i=0; i<catalogItemsPrice.length; i++) {
    catalogItemsPriceArray.push(catalogItemsPrice[i]);
  }

  catalogItemsPriceArray.sort(function(a, b) {
    if (Number(a.getAttribute("data-price")) < Number(b.getAttribute("data-price"))) {
      return 1;
    } else {
      return -1;
    }
  });

  for (var i=0; i<catalogItemsPriceArray.length; i++) {
    catalogList.appendChild(catalogItemsPriceArray[i]);
    //console.log(catalogItemsPriceArray[i].getAttribute("data-price"));
  }
}