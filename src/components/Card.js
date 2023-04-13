

export default class Card {
    constructor(card, ownerId, templateSelector, {handleCardClick, handleCardRemove, handleLikeToggler}) {
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleLikeToggler = handleLikeToggler;
        this._cardId = card._id;
        this._ownerId = ownerId;
        this._haveDeleteButton = (card.owner._id === this._ownerId);
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
        return this._cardElement;
    }
 

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
        });
        if (this._haveDeleteButton) {
            this._handleDeleteCard();
        }
        this._handleLikeListener();
    }

    _handleDeleteCard() {
        this._deleteButton.addEventListener('click', () =>{
            this._handleCardRemove(this._element, this._cardId)
        });
    }

    _handleLikeListener() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeToggler(this._likeButton, this._cardId, this._cardLikes);
        })
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.cards__delete-button');
        if (!this._haveDeleteButton) {
            this._deleteButton.remove();
        }
        this._element.querySelector('.cards__title').textContent = this._name;
        this._cardImage = this._element.querySelector('.cards__image');
        this._cardLikes = this._element.querySelector('.cards__like-count');
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._likes.forEach(item => {
            if (item._id === this._ownerId ) {
                this._likeButton.classList.toggle('cards__like-button_active');
            }  
        });
        this._cardLikes.textContent = this._likes.length;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._element;
      }
}



