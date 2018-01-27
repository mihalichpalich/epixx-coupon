//filter
var filterTitles = document.querySelectorAll('.filter__title');

for(var i=0; i<filterTitles.length; i++) {
  filterTitles[i].addEventListener('click', function() {
    togglefilterTitles(this.parentNode);
  });
}

function togglefilterTitles(el) {
  var filterOpenClass = 'filter--open';
  if (!el.classList.contains(filterOpenClass)) {
    el.classList.add(filterOpenClass);
  } else {
    el.classList.remove(filterOpenClass);
  }
}

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

var catalogItems = catalogList.childNodes;
var checkboxTypes = document.querySelectorAll('.js-filters-type  input[type="checkbox"]');
var specialCheckbox = document.querySelector('.js-filters-special  input[type="checkbox"]');
var pricesInputs = document.querySelectorAll('.js-filters-price  input[type="text"]');
var dateInput = document.querySelector('.js-filters-date  input[type="date"]');
var checkboxMetro = document.querySelectorAll('.js-filters-metro  input[type="checkbox"]');

for(i=0; i<checkboxTypes.length; i++) {
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

dateInput.addEventListener('change', function() {
  filters.date = Date.parse(new Date(this.value));
  //console.warn(filters.date);
  filterCatalog();
});

for(i=0; i<checkboxMetro.length; i++) {
  checkboxMetro[i].addEventListener('change', function() {
    var name = this.parentNode.querySelector('.checkbox__label').textContent;
    if (this.checked) {
      filters.metro.push(name);
    } else {
      var indexOfValue = filters.metro.indexOf(name);
      if (indexOfValue != -1) {
        filters.metro.splice(indexOfValue, 1);
      };
    };
    filterCatalog();
  });
};

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

    //date
    if (filters.date) {
      var currentDate = Date.parse(new Date(item.dataset.dateTo));
      //console.log(currentDate);
      if (filters.date > currentDate) {
        shouldBeVisible *= 0;
      }
    }

    //metro
    if (filters.metro.length) {
      var currentMetro = item.dataset.metro;
      var flagDelete = filterByMetro(currentMetro);
      if (flagDelete) {
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

function filterByMetro(currentMetro) {
  return filters.metro.indexOf(currentMetro) == -1;
}

var btnSortPrice = document.querySelector('.catalog_sort__item:first-child');
var btnSortDiscount = document.querySelector('.catalog_sort__item:last-child');
btnSortPrice.addEventListener('click', sortPrice);
btnSortDiscount.addEventListener('click', sortDiscount);

function sortPrice(e) {
  e.preventDefault();

  var catalogItemsPrice = document.querySelectorAll('[data-price]');
  var catalogItemsPriceArray = [];

  for (i=0; i<catalogItemsPrice.length; i++) {
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
  }
}

function sortDiscount(e) {
  e.preventDefault();

  var catalogItemsPrice = document.querySelectorAll('[data-price]');
  var catalogItemsPriceArray = [];

  for (i=0; i<catalogItemsPrice.length; i++) {
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
  }
}