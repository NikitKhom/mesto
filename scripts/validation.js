
const showInputError = (formElement, formInput, errorMessage, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(errorClass);
}

const hideInputError = (formElement, formInput, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    formError.textContent = '';
  };    

const checkInputValidity = (formElement, formInput, inputErrorClass, errorClass) => {
    if (!formInput.validity.valid) {
      showInputError(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, formInput, inputErrorClass, errorClass);
    }
  };

  const hasInvalidInput = (inputList) => {

    return inputList.some((formInput) => {
        return !formInput.validity.valid;
    })
    };


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };     

  const setEventListeners = (formElement, object) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
            checkInputValidity(formElement, formInput, object.inputErrorClass, object.errorClass);
            toggleButtonState(inputList, buttonElement, object.inactiveButtonClass);
          });
    });
    };  

    const enableValidation = (object) => {
        const formList = Array.from(document.querySelectorAll(object.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
              });
            setEventListeners(formElement, object);
            });
        };
    


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__text-field_type_error',
    errorClass: 'popup__input-error_active'
  });









