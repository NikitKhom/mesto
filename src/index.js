import './pages/index.css';
import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  initialCards,
  cardsBlock,
  selectors
} from '../src/utils/constants.js'
import FormValidator from '../src/components/FormValidator.js';
import Card from '../src/components/Card.js';
import Section from '../src/components/Section.js';
import PopupWithForm from '../src/components/PopupWithForm.js';
import PopupWithImage from '../src/components/PopupWithImage.js';
import UserInfo from '../src/components/UserInfo.js';


const profileInfo = new UserInfo({
  userName: 'Жак-Ив Кусто', 
  userInfo: 'Исследователь океанов'
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
    const card = new Card(formData.name, formData.link, 'template', handleCardClick);
    cardsList.addItem(card.generateCard());
    popupNewItem.close();
    newItemForm.makeButtonDisabled();
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
    const card = new Card(item.name, item.link, 'template', handleCardClick);
    cardsList.addItem(card.generateCard());
    }
  },
  cardsBlock
);


editButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', () => {
  popupNewItem.open();
});




function openProfilePopup() {
  nameInput.value = profileInfo.getUserInfo().name;
  jobInput.value = profileInfo.getUserInfo().info;
  profileForm.resetValidation();
  popupProfile.open();
}



  
  cardsList.renderItems();  
  
  

  


