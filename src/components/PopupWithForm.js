import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, submiter}){
        super(popupSelector);
        this._submiter = submiter;
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._buttonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__text-field');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submiter(this._getInputValues());
        })
    }

    renderLoading() {
        this._submitButton.textContent = 'Сохранение...';
    }

    setButtonText() {
        this._submitButton.textContent = this._buttonText;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
      }

    close(){
        super.close();
        this._form.reset();
    }

    open() {
        super.open();
        this.setButtonText();
    }
}