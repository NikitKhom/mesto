export class FormValidator {
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
    }


    _showInputError(formInput) {
        this._formError = this._formElement.querySelector(`.${formInput.id}-error`);
        formInput.classList.add(this._selectors.inputErrorClass);
        this._formError.textContent = formInput.validationMessage;
        this._formError.classList.add(this._selectors.errorClass);
    }
    
    _hideInputError(formInput) {
        this._formError = this._formElement.querySelector(`.${formInput.id}-error`);
        formInput.classList.remove(this._selectors.inputErrorClass);
        this._formError.classList.remove(this._selectors.errorClass);
        this._formError.textContent = '';
      };    
    
    _checkInputValidity(formInput) {
        if (!formInput.validity.valid) {
          this._showInputError(formInput);
        } else {
          this._hideInputError(formInput);
        }
      };
    
    _hasInvalidInput() {
        return this._inputList.some((formInput) => {
            return !formInput.validity.valid;
        })
    };
    
    
    makeButtonDisabled() {
        this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
        }
    
    _makeButtonActive() {
        this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
        }
    
    _removeInputInvalidClass() {
        this._inputList.forEach((formInput) => {
            this._hideInputError(formInput);
        });
        }
    
    resetValidation() {
        this._removeInputInvalidClass();
        this._makeButtonActive();
    } 
    
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.makeButtonDisabled();
        } else {
            this._makeButtonActive();
        }
      }     
    
    
    
    
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
        this._toggleButtonState();

        this._inputList.forEach((formInput) => {

            formInput.addEventListener('input', () => {
                this._checkInputValidity(formInput);
                this._toggleButtonState();
            });
        });
    }
    
    
    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            });
        this._setEventListeners();
        };

}



