const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;

const footer = document.querySelector('.footer');

const popupTemplate = document.querySelector('#popup').content;

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


// create card

const createCard = (card) => {
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

  return placesList.prepend(placeElement);
}


// load initial cards

const places = initialCards.slice().reverse().forEach(card => createCard(card))


// create popup

const createPopup = event => {
  const popupElement = popupTemplate.cloneNode(true);

  const popup = popupElement.querySelector('.popup');
  const popupContainer = popup.querySelector('.popup__container');
  const popupTitle = popup.querySelector('.popup__title');
  const popupInputs = Array.from(popup.querySelectorAll('.popup__form-text'));
  const closeButton = popup.querySelector('.popup__close-button');

  const formElement = popup.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__form-text_profile-name');
  const jobInput = formElement.querySelector('.popup__form-text_job');
  const placeNameInput = formElement.querySelector('.popup__form-text_place-name');
  const placePhotoInput = formElement.querySelector('.popup__form-text_place-link');

  const editInputs = popupInputs.filter(input => {
    const fields = ['profile-name', 'profile-job'];

    return fields.includes(input.name);
  })

  const addInputs = popupInputs.filter(input => {
    const fields = ['place-name', 'place-photo-link'];

    return fields.includes(input.name);
  })

  popup.style.animation = 'fadeIn ease-in .3s forwards';
  popupContainer.style.animation = 'scaleUp ease-in .2s forwards';

  const closePopup = event => {
    if (event.target === event.currentTarget || event.target === closeButton) {
      popup.style.animation = 'fadeOut ease-out .4s forwards';
      popupContainer.style.animation = 'scaleDown ease-out .2s forwards';

      const removePopup = () => {
        popup.remove();
      }

      setTimeout(removePopup, 200);
    }
  }

  popup.addEventListener('click', closePopup);


  // edit popup

  if (event.target === editButton) {
    popupTitle.textContent = 'Редактировать профиль';
    popup.setAttribute('aria-label', 'Окно редактирования профиля.');

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    popupInputs.forEach(input => input.remove());

    formElement.prepend(editInputs[0], editInputs[1]);

    const handleFormSubmit = event => {
      event.preventDefault();

      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;

      closePopup(event);
    }

    formElement.addEventListener('submit', handleFormSubmit);
  }

    // add popup

    if (event.target === addButton) {
      popupTitle.textContent = 'Новое место';
      popup.setAttribute('aria-label', 'Окно добавления нового места.');

      popupInputs.forEach(input => input.remove());

      formElement.prepend(addInputs[0], addInputs[1]);

      const handleFormSubmit = event => {
        event.preventDefault();

        console.log('added');

        const card = {
            name: 'bochka',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        };

        console.log(card);

        createCard(card);

        closePopup(event);
      }

      formElement.addEventListener('submit', handleFormSubmit);
    }

  footer.after(popupElement);
}


// event listeners

editButton.addEventListener('click', createPopup);
addButton.addEventListener('click', createPopup);
