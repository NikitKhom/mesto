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
  changeAvatarButton
} from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API';
const api = new API({token: '36dd83f2-042c-49c6-87f3-0e8edbb54688', cohortId: 'cohort-63'});
const apiInfo = api.getUserInfo();
const profileInfo = new UserInfo({   //создание экземпляра класса для загрузки информациио пользователе
	avatarContainer: avatar,
	nameContainer: profileName,
	infoContainer: profileJob
 });

apiInfo
.then(res => {
	profileInfo.setUserInfo(res);
})
.catch(err => console.log(err))

function handleCardRemove(card, cardId) {         //создание хендлеров для карточки
	popupSubmit.setConfirmListener(card, cardId);
	popupSubmit.open();
}

function toggleLike(card, likesContainer, likeButton) {
	likesContainer.textContent = card.likes.length;
	likeButton.classList.toggle('cards__like-button_active');
}

function handleLikeToggler(likeButton, cardId, likesContainer) {
	if (!likeButton.classList.contains('cards__like-button_active')) {
		api
		.putLike(cardId)
		.then(res => {
			toggleLike(res, likesContainer, likeButton);
		})
		.catch(err => console.log(err));
	}
	else {
		api
		.deleteLike(cardId)
		.then(res => {
			toggleLike(res, likesContainer, likeButton);
		})
		.catch(err => console.log(err));
	}
}

const cardsList = new Section({                         //cоздание списка карточек
	renderer: () => {
		const apiCards = api.getCards();
		Promise.all([apiInfo, apiCards])
		.then(values => {
			values[1].forEach(item => {
				cardsList.addItem(createCard(item, values[0]._id));
			});
		})
		.catch(err => console.log(err));
	  }
	},
	cardsBlock);
cardsList.renderItems();                            //рендер карточек

function createCard(card, ownerId) {
	const cardElement = new Card(card, ownerId,  'template', {handleCardClick, handleCardRemove, handleLikeToggler});  // функция создание карточки
	return cardElement.generateCard();
}

function handleCardClick(name, link) {            
  popupImage.open({name, link});
}

const validatorAddCard = new FormValidator(selectors, document.forms.newItemForm);        //подключение валидации
const validatorEditProfile =  new FormValidator(selectors, document.forms.profileForm);
const validatorEditAvatar = new FormValidator(selectors, document.forms.avatarForm);
validatorEditAvatar.enableValidation();
validatorAddCard.enableValidation();
validatorEditProfile.enableValidation();

const popupProfile = new PopupWithForm({                 //создание попапов для взаимодействия со страницей
  popupSelector: '.popup_type_profile',
  submiter: (formData) => {
	validatorEditProfile.disableSubmitButton();
	popupProfile.renderLoading();
	api
    .changeUserInfo({
		userName: formData.name,
		userInfo: formData.job
	})
    .then(res => {
        profileInfo.setUserInfo(res);
    })
	.then(res => {
		popupProfile.close();
	}) 
    .catch(err => console.log(err));
    }
});

const popupNewItem = new PopupWithForm({
  popupSelector: '.popup_type_new-item',
  submiter: (formData) => {
	validatorAddCard.disableSubmitButton();
	popupNewItem.renderLoading();
	api
    .addCard({cardName: formData.name, cardLink: formData.link})
    .then(res => {
        cardsList.renderItems();
    })
	.then(res => {
		popupNewItem.close();
		})
    .catch(err => console.log(err));
  	}
});

const popupAvatar = new PopupWithForm({
	popupSelector: '.popup_type_avatar',
	submiter: (formData) => {
		validatorEditAvatar.disableSubmitButton();
		popupAvatar.renderLoading();
		api.changeUserAvatar(formData.avatar)
		.then(res => {
			avatar.src = res.avatar;
			popupAvatar.close();
		})
		.catch(err => console.log(err));
	}
});

const popupSubmit = new PopupWithConfirmation({
	popupSelector: '.popup_type_confirm',
	confirmer: (card, cardId) => {
		api
		.deleteCard(cardId)
		.then(res => {
			card.remove();
			popupSubmit.close();
		})
		.catch(err => console.log(err));
	}
});

const popupImage = new PopupWithImage('.popup_type_image');

popupSubmit.setEventListeners();                     //навешивание слушателей сабмита и закрытия
popupProfile.setEventListeners();
popupNewItem.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();

editButton.addEventListener('click', openProfilePopup);            //слушатели на кнопки открытия попапов
addButton.addEventListener('click', () => {
  validatorAddCard.makeButtonDisabled();
  validatorAddCard.resetValidation();
  popupNewItem.open();
});

changeAvatarButton.addEventListener('click',() => {
	validatorEditAvatar.makeButtonDisabled();
	validatorEditAvatar.resetValidation();
	popupAvatar.open();
});

function openProfilePopup() {
  const {info, name} = profileInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;
  validatorEditProfile.resetValidation();
  popupProfile.open();
}



  

  
  

  


