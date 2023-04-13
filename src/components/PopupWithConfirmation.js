import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
    constructor({popupSelector, confirmer}){
        super(popupSelector);
        this._confirmer = confirmer;
        this._confirmButton = this._popup.querySelector('.popup__save-button');
    }

    setConfirmListener(card, cardId) {
        this._confirmButton.addEventListener('click', (evt) => {
            this._confirmer(card, cardId);
        })
    }
}