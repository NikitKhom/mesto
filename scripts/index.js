let content = document.querySelector('.page');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let exitButton = content.querySelector('.popup__close-button');
let nameInput = content.querySelector('.popup__text-field_type_name');
let jobInput = content.querySelector('.popup__text-field_type_job');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__personal-info');

function popupOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
exitButton.addEventListener('click', popupClose);

let formElement = content.querySelector('.popup__form');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}


formElement.addEventListener('submit', handleFormSubmit); 
