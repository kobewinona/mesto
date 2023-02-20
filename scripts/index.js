const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');

const footer = document.querySelector('.footer');

const popup = document.querySelectorAll('.popup');
const closeButton = document.querySelector('.popup__close-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const addPlacePopup = document.querySelector('.popup_type_add-place');
const placePreviewPopup = document.querySelector('.popup_type_place-preview');

const editProfileForm = document.querySelector('.popup__form_edit-profile');
const addPlaceForm = document.querySelector('.popup__form_add-place');
const nameInput = document.querySelector('.popup__form-text_profile-name');
const jobInput = document.querySelector('.popup__form-text_job');
const placeNameInput = document.querySelector('.popup__form-text_place-name');
const placeLinkInput = document.querySelector('.popup__form-text_place-link');

const placePreviewPhoto = document.querySelector('.popup__preview-photo');
const placePreviewCap = document.querySelector('.popup__preview-cap');

const placeTemplate = document.querySelector('#place').content;

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


// handle popup

const closePopup = (event, type) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    type.classList.remove('popup_opened');
  }
}

const openPopup = type => {
  type.classList.add('popup_opened');
}


// handle form

const handleEditForm = (event, type) => {
  event.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopup(event, type);
}

const handleAddForm = (event, type) => {
  event.preventDefault();

  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;

  placesList.prepend(createCard(card));

  closePopup(event, type);
}


// handle card

const deleteCard = event => {
  const removeCard = () => {
    event.target.parentElement.parentElement.remove();
  }

  event.target.parentElement.style.animation = 'disappear .2s ease-out forwards';

  setTimeout(removeCard, 200);
}

const addLike = event => {
  event.target.classList.toggle('places__like-button_active');
}

const createCard = card => {
  const placeElement = placeTemplate.cloneNode(true);

  const trashButton = placeElement.querySelector('.places__trash-button');

  const placeName = placeElement.querySelector('.places__place-name');
  placeName.textContent = card.name;

  const placePhoto = placeElement.querySelector('.places__place-photo');
  placePhoto.src = card.link;

  const likeButton = placeElement.querySelector('.places__like-button');
  const place = placeElement.querySelector('.places__place');

  place.style.animation = 'appear .2s ease-in forwards';

  trashButton.addEventListener('click', event => {
    deleteCard(event);
  })

  likeButton.addEventListener('click', event => {
    addLike(event);
  });

  placePhoto.addEventListener('click', () => {
    placePreviewPhoto.src = placePhoto.src;
    placePreviewCap.textContent = placeName.textContent;

    openPopup(placePreviewPopup);
  });

  return placeElement;
}


// load initial cards

initialCards.slice().forEach(card => placesList.append(createCard(card)));


// event listeners

popup.forEach(element => {
  element.addEventListener('click', event => {
    closePopup(event, element);
  });
})

editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(editProfilePopup);
});

addButton.addEventListener('click', () => {
  placeNameInput.value = '';
  placeLinkInput.value = '';

  openPopup(addPlacePopup);
});

editProfileForm.addEventListener('submit', event => {
  handleEditForm(event, editProfilePopup);
})

addPlaceForm.addEventListener('submit', event => {
  handleAddForm(event, addPlacePopup);
})
