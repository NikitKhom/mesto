

export default class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
        return this._cardElement;
    }
 

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
        this._handleDeleteCard();
        this._handleLikeListener();
    }

    _handleDeleteCard() {
        this.deleteButton = this._element.querySelector('.cards__delete-button');
        this.deleteButton.addEventListener('click', () =>{
            this._element.remove();

        });
    }


    _handleLikeListener() {
        
        this._likeButton.addEventListener('click', () => {
            this._likeButton.classList.toggle('cards__like-button_active');
          })
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.cards__title').textContent = this._name;
        this._cardImage = this._element.querySelector('.cards__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._setEventListeners();
        return this._element;
      }
}



