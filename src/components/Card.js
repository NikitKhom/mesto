

export default class Card {
    constructor(card, templateSelector, handleCardClick, popup, api) {
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._popup = popup;
        this._popupDeleteButton = popup._popup.querySelector('.popup__save-button');
        this._cardId = card._id;
        this._ownerId = 'f6fa8335e1701b65e52b5f8c';
        this._haveDeleteButton = (card.owner._id === this._ownerId);
        this._api = api;
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
            this._popup.open();
            this._popupDeleteButton.addEventListener('click', () => {
                this._api
                .deleteCard(this._cardId)
                .then(res => {
                    this._element.remove();
                    this._popup.close();
                })
                .catch(err => console.log(err));
            })
            
        });
    }

    _toogleLike(card) {
        this._cardLikes.textContent = card.likes.length;
        this._likeButton.classList.toggle('cards__like-button_active');
    }

    _handleLikeListener() {
        this._likeButton.addEventListener('click', () => {
            if (!this._likeButton.classList.contains('cards__like-button_active')) {
                this._api
                .putLike(this._cardId)
                .then(res => {
                    this._toogleLike(res);
                })
                .catch(err => console.log(err));
            }
            else {
                this._api
                .deleteLike(this._cardId)
                .then(res => {
                    this._toogleLike(res);
                })
                .catch(err => console.log(err));
            }
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
                this._likeButton.classList.add('cards__like-button_active');
            }  
        });
        this._cardLikes.textContent = this._likes.length;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._element;
      }
}



