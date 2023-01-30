let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__form-submit');

let formElement = document.querySelector('.popup__form');
let formInput = formElement.querySelectorAll('.popup__form-text');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


// opening and closing of popup

function togglePopup() {
  popup.classList.toggle('popup_opened');
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

popup.addEventListener('click', handlePopup);
editButton.addEventListener('click', handlePopup);
closeButton.addEventListener('click', handlePopup);
submitButton.addEventListener('click', handlePopup);


// handling form input

formInput[0].value = document.querySelector('.profile__name').textContent;
formInput[1].value = document.querySelector('.profile__job').textContent;

function handleFormSubmit (event) {
    event.preventDefault();

    profileName.textContent = formInput[0].value;
    profileJob.textContent = formInput[1].value;
}

formElement.addEventListener('submit', handleFormSubmit);
