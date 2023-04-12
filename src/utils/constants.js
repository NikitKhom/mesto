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
export const avatar = content.querySelector('.profile__image');
export const changeAvatarButton = content.querySelector('.profile__overlay');
export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error_active'
}
