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

const detectClickOverlay = (evt) => {
  const target = evt.target;
  console.log(target);
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

addButton.addEventListener('click', () => openPopup(popupNewItem));


const closeButtons = document.querySelectorAll('.popup__close-button');

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



const popupImage = content.querySelector('.popup_type_image');
const imageLink = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');
const exitImageButton = popupImage.querySelector('.popup__close-button_type_image');


function createCard (item) {
  const card =  templateCard.cloneNode(true);
  const image = card.querySelector('.cards__image');
  const title = card.querySelector('.cards__title');
  const like = card.querySelector('.cards__like-button');
  title.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  card.querySelector('.cards__delete-button').addEventListener('click', () => card.remove());
  
  
  like.addEventListener('click', () => {
    like.classList.toggle('cards__like-button_active');
  })
  image.addEventListener('click', () => {
    imageLink.alt = title.textContent;
    imageLink.src = image.src;
    imageName.textContent = title.textContent;
    openPopup(popupImage);
  });
  return card;
}


