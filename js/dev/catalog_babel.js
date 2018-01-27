class TogglerView {
  constructor() {
    this._initialStates = ["three", "two"];
    this._buttons = document.querySelectorAll(".catalog_view__item");
    this._catalogList = document.querySelector('.catalog__list');
    this._catalogListSelector = "catalog__list";
    this._buttonsSelectorActive = "catalog_view__item--active";
  }

  toogle() {
    if (this._buttons[0].classList.contains(this._buttonsSelectorActive)) {
      this._catalogList.classList.remove(`${this._catalogListSelector}--${this._initialStates[0]}`);
      this._catalogList.classList.add(`${this._catalogListSelector}--${this._initialStates[1]}`);
    } else {
      this._catalogList.classList.remove(`${this._catalogListSelector}--${this._initialStates[1]}`);
      this._catalogList.classList.add(`${this._catalogListSelector}--${this._initialStates[0]}`);
    }
  }

  activeClassChange(element) {
    if(!element.classList.contains(this._buttonsSelectorActive)) {
      document.querySelector(`.${this._buttonsSelectorActive}`).classList.remove(this._buttonsSelectorActive);
      element.classList.add(this._buttonsSelectorActive);
    }

    this.toogle();
  }

  init() {
    for (let i=0; i<this._buttons.length; i++) {
      this._buttons[i].addEventListener('click', evt => {
        var elem = evt.currentTarget;

        this.activeClassChange(elem);
      });
    };
  }
}

let toggler = new TogglerView();
toggler.init();