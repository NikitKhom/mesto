import './index.css';
import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  initialCards,
  cardsBlock,
  profileName,
  profileJob,
  selectors
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


const profileInfo = new UserInfo({
  nameContainer: profileName,
  infoContainer: profileJob
});

function handleCardClick(name, link) {
  popupImage.open({name, link});
}

const newItemForm = new FormValidator(selectors, document.forms.newItemForm);
const profileForm =  new FormValidator(selectors, document.forms.profileForm);

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  submiter: (formData) => {
    profileInfo.setUserInfo({
      userName: formData.name,
      userInfo: formData.job
    })
    popupProfile.close();
  }
});




const popupNewItem = new PopupWithForm({
  popupSelector: '.popup_type_new-item',
  submiter: (formData) => {
    cardsList.addItem(createCard(formData));
    popupNewItem.close();
  }
});



const popupImage = new PopupWithImage('.popup_type_image');
popupProfile.setEventListeners();
popupNewItem.setEventListeners();
popupImage.setEventListeners();

newItemForm.enableValidation();
profileForm.enableValidation();


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
    }
  },
  cardsBlock
);

function createCard(item) {
  const cardElement = new Card(item.name, item.link, 'template', handleCardClick);
  return cardElement.generateCard();
}


editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', () => {
  newItemForm.makeButtonDisabled();
  newItemForm.resetValidation();
  popupNewItem.open();
});




function openProfilePopup() {
  const {info, name} = profileInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;
  profileForm.resetValidation();
  popupProfile.open();
}



  
  cardsList.renderItems();  
  
  

  


