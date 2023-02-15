const placeTemplate = document.querySelector('#place').content;
const placesList = document.querySelector('.places__list');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.popup__form-submit');
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelectorAll('.popup__form-text');
const nameInput = formElement.querySelector('.popup__form-text_name');
const jobInput = formElement.querySelector('.popup__form-text_job');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// loading of initial cards

const places = initialCards.map(card => {
  const placeElement = placeTemplate.cloneNode(true);

  const placeName = placeElement.querySelector('.places__place-name');
  const placePhoto = placeElement.querySelector('.places__place-photo');

  placeName.textContent = card.name;
  placePhoto.src = card.link;

  return placeElement;
})

places.forEach(place => placesList.append(place))


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
