const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const popupProfile = content.querySelector('.popup_type_profile');
const nameInput = popupProfile.querySelector('.popup__text-field_type_name');
const jobInput = popupProfile.querySelector('.popup__text-field_type_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__personal-info');
const popupNewItem = content.querySelector('.popup_type_new-item');
const formProfile = popupProfile.querySelector('.popup__form');
const formNewItem = popupNewItem.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const titleInput = popupNewItem.querySelector('.popup__text-field_type_title');
const linkInput = popupNewItem.querySelector('.popup__text-field_type_link');
const popupOverlay = Array.from(document.querySelectorAll('.popup'));
const closeButtons = document.querySelectorAll('.popup__close-button');
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const newItemForm = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
}, document.forms.newItemForm);

const profileForm =  new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
}, document.forms.profileForm);

newItemForm.enableValidation();
profileForm.enableValidation();

const detectClickOverlay = (evt) => {
  const target = evt.target;
  if (target.classList.contains('popup')) {
    closePopup(target);
  }
}

popupOverlay.forEach((popup) => {
  popup.addEventListener('click', detectClickOverlay);
});


function handlePopupCloseEsc(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
          openedPopup.classList.remove('popup_opened');
      }
  }
}



function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileForm.resetValidation();
  openPopup(popupProfile);
}



function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupCloseEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupCloseEsc);
}

editButton.addEventListener('click', openProfilePopup);

addButton.addEventListener('click', () => {
  newItemForm.makeButtonDisabled();
  openPopup(popupNewItem);
});




closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});



function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}



formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewItem.addEventListener('submit', handleNewItemFormSubmit);



const templateCard = document.querySelector('.template').content.querySelector('.cards__card');
const cardsBlock = document.querySelector('.cards');
const deleteButton = templateCard.querySelector('.cards__delete-button');


function handleNewItemFormSubmit (evt) {
    evt.preventDefault();
    const item = {
        name: titleInput.value,
        link: linkInput.value
    }
    const card = createCard(item);
    cardsBlock.prepend(card);
    closePopup(popupNewItem);
    evt.target.reset();
  }




  function renderCards(items) {
    const cards = items.map(createCard);
    cardsBlock.append(...cards);
  }
  
  renderCards(initialCards);  
  
  
  

  
  function createCard (item) {
    const card = new Card(item.name, item.link, 'template');
    return card.generateCard();
  }
  

