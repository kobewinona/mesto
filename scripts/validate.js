// handle input error state

const showInputError = (formElement, inputElement, errorMessage, validationOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationOptions.inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, validationOptions) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationOptions.inputErrorClass);
  errorElement.textContent = '';
}

const toggleInputError = (formElement, inputElement, validationOptions) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationOptions);
  } else {
    hideInputError(formElement, inputElement, validationOptions);
  }
}


// handle submit button state

const enableSubmitButton = (buttonElement, validationOptions) => {
  buttonElement.classList.remove(validationOptions.disabledSubmitClass);
  buttonElement.removeAttribute('disabled');
}

const disableSubmitButton = (buttonElement, validationOptions) => {
  buttonElement.classList.add(validationOptions.disabledSubmitClass);
  buttonElement.setAttribute('disabled', '');
}

const toggleSubmitButton = (inputList, buttonElement, validationOptions) => {
  const isValid = inputList.every(input => {
    return input.validity.valid;
  })

  if (isValid) {
    enableSubmitButton(buttonElement, validationOptions);
  } else {
    disableSubmitButton(buttonElement, validationOptions);
  }
}


// add event listeners

const setEventListeners = (formElement, inputList, buttonElement, validationOptions) => {
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleInputError(formElement, inputElement, validationOptions);
      toggleSubmitButton(inputList, buttonElement, validationOptions);
    })
  })
}


// enable validation

const enableValidation = validationOptions => {
  const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));

  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const submitButton = formElement.querySelector(validationOptions.submitSelector);

    formElement.addEventListener('submit', event => {
      event.preventDefault();

      disableSubmitButton(submitButton, validationOptions);
    })

    setEventListeners(formElement, inputList, submitButton, validationOptions);

    disableSubmitButton(submitButton, validationOptions);
  })
}
