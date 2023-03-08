const popupImage = document.querySelector('.popup_type_image');
const imageLink = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');
const exitImageButton = popupImage.querySelector('.popup__close-button_type_image');

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
        return this._cardElement;
    }

    _handleOpenPopup() {
        imageLink.src = this._link;
        imageName.textContent = this._name;
        popupImage.classList.add('popup_opened');
    }
    
    _handleClosePopup() {
        imageLink.src = '';
        imageName.textContent = '';
        popupImage.classList.remove('popup_opened');
    }

    _setEventListeners() {
        this._element.querySelector('.cards__image').addEventListener('click', () => {
          this._handleOpenPopup();
        });
    
        exitImageButton.addEventListener('click', () => {
          this._handleClosePopup();
        });
    }

    _handleDeleteCard() {
        this.deleteButton = this._element.querySelector('.cards__delete-button');
        this.deleteButton.addEventListener('click', () =>{
            this._element.remove();

        });
    }


    _handleLikeListener() {
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._likeButton.addEventListener('click', () => {
            this._likeButton.classList.toggle('cards__like-button_active');
          })
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards__title').textContent = this._name;
        this._element.querySelector('.cards__image').src = this._link;
        this._setEventListeners();
        this._handleDeleteCard();
        this._handleLikeListener();
        return this._element;
      }
}



