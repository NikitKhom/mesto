const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const popupProfile = content.querySelector('.popup_type_profile');
const exitProfileButton = popupProfile.querySelector('.popup__close-button_type_profile');
const nameInput = popupProfile.querySelector('.popup__text-field_type_name');
const jobInput = popupProfile.querySelector('.popup__text-field_type_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__personal-info');
const popupNewItem = content.querySelector('.popup_type_new-item');
const exitNewItemButton = popupNewItem.querySelector('.popup__close-button_type_new-item');
const formProfile = popupProfile.querySelector('.popup__form');
const formNewItem = popupNewItem.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const titleInput = popupNewItem.querySelector('.popup__text-field_type_title');
const linkInput = popupNewItem.querySelector('.popup__text-field_type_link');

function popupProfileOpen() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupProfile.classList.add('popup_opened');
}

function popupProfileClose() {
    popupProfile.classList.remove('popup_opened');
}

function popupNewItemClose() {
    popupNewItem.classList.remove('popup_opened');
}

function popupNewItemOpen() {
    popupNewItem.classList.add('popup_opened');
    titleInput.value = '';
    linkInput.value = '';
}



editButton.addEventListener('click', popupProfileOpen);
exitProfileButton.addEventListener('click', popupProfileClose);
addButton.addEventListener('click', popupNewItemOpen);
exitNewItemButton.addEventListener('click', popupNewItemClose);




function profileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupProfileClose();
}



formProfile.addEventListener('submit', profileFormSubmit); 
formNewItem.addEventListener('submit', newItemFormSubmit);
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


const templateCard = document.querySelector('.template').content.querySelector('.cards__card');
const deleteButton =templateCard.querySelector('.cards__delete-button');
const cardsBlock = document.querySelector('.cards');

function newItemFormSubmit (evt) {
    evt.preventDefault();
    const item = {
        name: titleInput.value,
        link: linkInput.value
    }
    const card = createCard(item);
    cardsBlock.prepend(card);
    popupNewItemClose();
}




function renderCards(items) {
    const cards = items.map((item) => {
            return createCard(item);
    } );

    cardsBlock.append(...cards);
}

renderCards(initialCards);  



const popupImage = content.querySelector('.popup_type_image');
const imageLink = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');
const exitImageButton = popupImage.querySelector('.popup__close-button_type_image');


function createCard (item) {
  const card =  templateCard.cloneNode(true);
  card.querySelector('.cards__title').textContent = item.name;
  card.querySelector('.cards__image').src = item.link;
  card.querySelector('.cards__delete-button').addEventListener('click', () => {
    card.remove();
  });
  card.querySelector('.cards__like-button').addEventListener('click', () => {
    card.querySelector('.cards__like-button').classList.toggle('cards__like-button_active');
  })
  card.querySelector('.cards__image').addEventListener('click', () => {
    imageLink.src = card.querySelector('.cards__image').src;
    imageName.textContent = card.querySelector('.cards__title').textContent;
    popupImage.classList.add('popup_opened');
  })
  return card;
}



templateCard.querySelector('.cards__image').addEventListener('click', () => {
  popupImage.classList.add('popup_opened');
});

exitImageButton.addEventListener('click', () => {
  popupImage.classList.remove('popup_opened');
})