
const showInputError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add('popup__text-field_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, formInput) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove('popup__text-field_type_error');
    formError.classList.remove('popup__input-error_active');
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


const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_inactive');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__save-button_inactive');
      buttonElement.removeAttribute('disabled');
    }
  };     

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text-field'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((formInput) => {
        formInput.addEventListener('input', function () {
            checkInputValidity(formElement, formInput);
            toggleButtonState(inputList, buttonElement);
          });
    });
    };  

    const enableValidation = () => {
        const formList = Array.from(document.querySelectorAll('.popup__form'));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
              });
              const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));

              fieldsetList.forEach((fieldSet) => {
                setEventListeners(fieldSet);
              });  
            });
        };
    
        enableValidation();









