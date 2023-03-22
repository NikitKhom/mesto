const content = document.querySelector('.page');
export const editButton = content.querySelector('.profile__edit-button');
export const popupProfile = content.querySelector('.popup_type_profile');
export const nameInput = popupProfile.querySelector('.popup__text-field_type_name');
export const jobInput = popupProfile.querySelector('.popup__text-field_type_job');
export const profileName = content.querySelector('.profile__name');
export const profileJob = content.querySelector('.profile__personal-info');
export const popupNewItem = content.querySelector('.popup_type_new-item');
export const addButton = content.querySelector('.profile__add-button');
export const cardsBlock = content.querySelector('.cards');

export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
}

export const initialCards = [
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