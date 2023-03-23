import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
    open({name, link}) {
        const image = this._popup.querySelector('.popup__image');
        image.src = link;
        image.alt = name;s
        this._popup.querySelector('.popup__image-name').textContent = name;
        super.open()
    }
}
    