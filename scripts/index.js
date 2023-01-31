let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__form-submit');
let formElement = document.querySelector('.popup__form');
let formInput = formElement.querySelectorAll('.popup__form-text');
let nameInput = formElement.querySelector('.popup__form-text_name');
let jobInput = formElement.querySelector('.popup__form-text_job');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let editButton = document.querySelector('.profile__edit-button');


// opening and closing of popup

function togglePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function handlePopup(event) {
  if (popup.classList.contains('popup_opened')) {
    if (event.target === event.currentTarget) {
      popup.style.animation = 'fadeOut ease-out .2s';
      popupContainer.style.animation = 'scaleDown ease-out .2s';

      setTimeout(togglePopup, 200);
    }
  } else {
    popup.style.animation = 'fadeIn ease-in .2s';
    popupContainer.style.animation = 'scaleUp ease-in .2s';

    togglePopup();
  }
}


// handling form input

function handleFormSubmit (event) {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    handlePopup(event);
}


// event listeners

popup.addEventListener('click', handlePopup);
editButton.addEventListener('click', handlePopup);
closeButton.addEventListener('click', handlePopup);

formElement.addEventListener('submit', handleFormSubmit);
