import './index.css';
import {
  editButton,
  nameInput,
  jobInput,
  addButton,
  cardsBlock,
  profileName,
  profileJob,
  selectors,
  avatar,
  changeAvatarButton,
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API';
const api = new API({token: '36dd83f2-042c-49c6-87f3-0e8edbb54688', cohortId: 'cohort-63'});


const profileInfo = new UserInfo({   //создание экземпляра класса для загрузки информациио пользователе
	avatarContainer: avatar,
	nameContainer: profileName,
	infoContainer: profileJob
 }, api);


profileInfo.setUserInfo();  //Вывод данных в соответствующие поля





const cardsList = new Section({                        //экземпляр класса для отображения карточек
	renderer: (item) => {
		cardsList.addItem(createCard(item));
	  }
	},
	cardsBlock, api);
cardsList.renderItems();                               //рэндер карточек


function createCard(card) {
	const cardElement = new Card(card, 'template', handleCardClick, popupSubmit, api);  // функция создание карточки
	return cardElement.generateCard();
 }


function handleCardClick(name, link) {            
  popupImage.open({name, link});
}


const newItemForm = new FormValidator(selectors, document.forms.newItemForm);        //подключение валидации
const profileForm =  new FormValidator(selectors, document.forms.profileForm);
const avatarForm = new FormValidator(selectors, document.forms.avatarForm);
avatarForm.enableValidation();
newItemForm.enableValidation();
profileForm.enableValidation();


const popupProfile = new PopupWithForm({                 //создание попапов для взаимодействия со страницей
  popupSelector: '.popup_type_profile',
  submiter: (formData) => {
	profileInfo.changeUserInfo({
		userName: formData.name,
		userInfo: formData.job
	})
	.then(res => {
		popupProfile.close();
	}) 
  	}
});


const popupNewItem = new PopupWithForm({
  popupSelector: '.popup_type_new-item',
  submiter: (formData) => {
	cardsList.saveItem(formData)
	.then(res => {
		popupNewItem.close();
		});
  	}
});



const popupAvatar = new PopupWithForm({
	popupSelector: '.popup_type_avatar',
	submiter: (formData) => {
		api.changeUserAvatar(formData.avatar)
		.then(res => {
			avatar.src = res.avatar;
			popupAvatar.close();
		})
		.catch(err => console.log(err));
	}
});


const popupSubmit = new Popup('.popup_type_submit');
const popupImage = new PopupWithImage('.popup_type_image');



popupSubmit.setEventListeners();                     //навешивание слушателей сабмита и закрытия
popupProfile.setEventListeners();
popupNewItem.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();




editButton.addEventListener('click', openProfilePopup);            //слушатели на кнопки открытия попапов
addButton.addEventListener('click', () => {
  newItemForm.makeButtonDisabled();
  newItemForm.resetValidation();
  popupNewItem.open();
});


changeAvatarButton.addEventListener('click',() => {
	avatarForm.makeButtonDisabled();
	avatarForm.resetValidation();
	popupAvatar.open();
});


function openProfilePopup() {
  const {info, name} = profileInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;
  profileForm.resetValidation();
  popupProfile.open();
}



  

  
  

  


