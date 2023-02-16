const placeTemplate = document.querySelector('#place').content;
const placesList = document.querySelector('.places__list');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.popup__form-submit');

const formElement = popup.querySelector('.popup__form');
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


// load initial cards

const places = initialCards.map(card => {
  const placeElement = placeTemplate.cloneNode(true);

  const trashButton = placeElement.querySelector('.places__trash-button');
  const placeName = placeElement.querySelector('.places__place-name');
  const placePhoto = placeElement.querySelector('.places__place-photo');
  const likeButton = placeElement.querySelector('.places__like-button');

  placeName.textContent = card.name;
  placePhoto.src = card.link;

  trashButton.addEventListener('click', event => {
    event.target.parentElement.parentElement.remove();
  })

  likeButton.addEventListener('click', event => {
    event.target.classList.toggle('places__like-button_active');
  });

  return placeElement;
})

places.forEach(place => placesList.append(place))


// open and close popup

const handlePopup = event => {
  if (event.target.classList.contains('profile__edit-button')) {
    popup.style.animation = 'fadeIn ease-in .3s forwards';

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  } else if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    popup.style.animation = 'fadeOut ease-out .4s forwards';
  }
}


// handle form input

const handleFormSubmit = event => {
    event.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    handlePopup(event);
}


// event listeners

editButton.addEventListener('click', handlePopup);

popup.addEventListener('click', handlePopup);

formElement.addEventListener('submit', handleFormSubmit);
