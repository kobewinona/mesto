const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const cardPopup = document.querySelector('.popup_type_add-place');
const cardPreviewPopup = document.querySelector('.popup_type_place-preview');
const cardPreviewPhoto = cardPreviewPopup.querySelector('.popup__preview-photo');
const cardPreviewCap = cardPreviewPopup.querySelector('.popup__preview-cap');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.form__input_type_profile-name');
const jobInput = profileForm.querySelector('.form__input_type_profile-job');

const cardForm = document.forms['add-place'];
const cardNameInput = cardForm.querySelector('.form__input_type_place-name');
const cardLinkInput = cardForm.querySelector('.form__input_type_place-link');

const cardsList = document.querySelector('.places__list');

const footer = document.querySelector('.footer');

const cardTemplate = document.querySelector('#card').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горный хребет: заснеженный на переднем плане и покрытый зеленью на заднем плане.'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Заснеженное озеро, окруженное халмами и деревьми.'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Каскад домов панельного плана спального района в вечернее время.'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Приближенный вид на подножье с редко растущей зеленью на переднем плане и заснеженной горной вершиной на заднем плане.'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Вид на железную дорогу, уходящую за горзинт, окруженную лесом.'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Вид спереди на скалистый берег заледеневшего озера Байкал.'
  }
];

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;


// handle popups

const closePopupWithEsc = event => {
  if (event.key === 'Escape') {
    closePopup(event.currentTarget);
  }
}

const openPopup = popup => {
  popup.classList.add('popup_opened');

  if (popup.querySelector('.popup__container').classList.contains('shrink')) {
    popup.querySelector('.popup__container').classList.remove('shrink');
  }

  popup.querySelector('.popup__container').classList.add('grow');

  const changeFocus = () => {
    popup.focus();
  }

  setTimeout(changeFocus, 200);

  popup.addEventListener('keydown', closePopupWithEsc);
}

const closePopup = popup => {
  popup.classList.remove('popup_opened');

  if (popup.querySelector('.popup__container').classList.contains('grow')) {
    popup.querySelector('.popup__container').classList.remove('grow');
  }

  popup.querySelector('.popup__container').classList.add('shrink');

  popup.removeEventListener('keydown', closePopupWithEsc);
}


// handle forms

const handleProfileForm = event => {
  event.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(profilePopup);
}

const handleCardForm = event => {
  event.preventDefault();

  const card = {};
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value;
  card.alt = cardNameInput.value;

  cardsList.prepend(createCard(card));

  closePopup(cardPopup);

  event.target.reset();
}


// enable validation

const validationOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  ErrorMessageClass: 'form__input-error',
  submitSelector: '.form__submit',
  disabledSubmitClass: 'form__submit_disabled',
}

enableValidation(validationOptions);


// handle cards

const deleteCard = event => {
  if (event.target.closest('li').classList.contains('grow')) {
    event.target.closest('li').classList.remove('grow');
  }

  event.target.closest('li').classList.add('shrink');

  const removeCard = () => {
    event.target.closest('li').remove();
  }

  setTimeout(removeCard, 200);
}

const toggleLike = event => {
  event.target.classList.toggle('places__like-button_active');
}

const createCard = item => {
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector('.places__place');
  const cardName = cardElement.querySelector('.places__place-name');
  const cardPhoto = cardElement.querySelector('.places__place-photo');
  const likeCardButton = cardElement.querySelector('.places__like-button');
  const deleteCardButton = cardElement.querySelector('.places__trash-button');


  cardName.textContent = item.name;
  cardPhoto.src = item.link;
  cardPhoto.alt = item.alt;

  if (card.closest('li').classList.contains('shrink')) {
    card.closest('li').classList.remove('shrink');
  }

  card.closest('li').classList.add('grow');


  deleteCardButton.addEventListener('click', deleteCard);

  likeCardButton.addEventListener('click', toggleLike);

  cardPhoto.addEventListener('click', () => {
    cardPreviewPhoto.src = cardPhoto.src;
    cardPreviewPhoto.alt = cardPhoto.alt;
    cardPreviewCap.textContent = cardName.textContent;

    openPopup(cardPreviewPopup);
  });

  return cardElement;
}


// load initial cards

initialCards.slice().forEach(item => cardsList.append(createCard(item)));


// add event listeners

popups.forEach(popup => {
  popup.addEventListener('mousedown', event => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    } else if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

profileButton.addEventListener('click', () => {
  const inputList = Array.from(profileForm.querySelectorAll('.form__input'));

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  inputList.forEach(inputElement => {
    toggleInputError(profileForm, inputElement, validationOptions);
  })

  openPopup(profilePopup);
})

cardButton.addEventListener('click', () => {
  openPopup(cardPopup);
})

profileForm.addEventListener('submit', handleProfileForm);

cardForm.addEventListener('submit', handleCardForm);
