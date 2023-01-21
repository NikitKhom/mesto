let content = document.querySelector('.page');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let saveButton = content.querySelector('.popup__save-button');
let exitButton = content.querySelector('.popup__close-button');

//Кнопка edit открывает popup
editButton.addEventListener('click', function(){
    popup.classList.remove('popup_hidden');
});

//Оюъявляю соответствующие параметры страницы и popup
let name = content.querySelector('.popup__text-field_name');
let info = content.querySelector('.popup__text-field_info');
let profileName = content.querySelector('.profile__name');
let profileInfo = content.querySelector('.profile__personal-info');
name.value = profileName.textContent;
info.value = profileInfo.textContent;


//Кнопка сохранения
saveButton.addEventListener('click', function() {
    profileName.textContent = name.value;
    profileInfo.textContent = info.value;
    popup.classList.add('popup_hidden');
});

//Кнопка выхода
exitButton.addEventListener('click', function() {
    popup.classList.add('popup_hidden');
    name.value = profileName.textContent;
    info.value = profileInfo.textContent;
});




