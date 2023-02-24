selectors = {};
const showInputError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(selectors.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(selectors.errorClass);
}

const hideInputError = (formElement, formInput) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(selectors.inputErrorClass);
    formError.classList.remove(selectors.errorClass);
    formError.textContent = '';
  };    

const checkInputValidity = (formElement, formInput) => {
    if (!formInput.validity.valid) {
      showInputError(formElement, formInput, formInput.validationMessage);
    } else {
      hideInputError(formElement, formInput);
    }
  };

  const hasInvalidInput = (inputList) => {

    return inputList.some((formInput) => {
        return !formInput.validity.valid;
    })
    };


const makeButtonDisabled = (buttonElement) => {
  buttonElement.classList.add(selectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const makeButtonActive = (buttonElement) => {
  buttonElement.classList.remove(selectors.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const removeInputInvalidClass = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector)); 
  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput);
  });
}

const resetValidation = (formElement , buttonElement) => {
  removeInputInvalidClass(formElement);
  makeButtonActive(buttonElement);
} 

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      makeButtonDisabled(buttonElement);
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };     




  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
            checkInputValidity(formElement, formInput);
            toggleButtonState(inputList, buttonElement);
          });
    });
    };  


    const enableValidation = (object) => {
        selectors = Object.assign({}, object);;
        const formList = Array.from(document.querySelectorAll(selectors.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
              });
            setEventListeners(formElement);
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









