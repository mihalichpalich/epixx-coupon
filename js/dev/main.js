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