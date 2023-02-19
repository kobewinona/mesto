const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');

const footer = document.querySelector('.footer');

const placeTemplate = document.querySelector('#place').content;
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


// close popup

const closePopup = (event, element, overlay, container) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
    element.style.animation = 'fadeOut ease-out .4s forwards';
    overlay.style.opacity = '0';
    container.style.animation = 'scaleDown ease-out .2s forwards';

    const removePopup = () => {
      element.remove();
    }

    setTimeout(removePopup, 200);
  }
}


// handle form

const handleForm = (event, type, firstInput, secondInput) => {
  event.preventDefault();

  switch (type.name) {
    case 'edit-profile':
      nameProfile.textContent = firstInput.value;
      jobProfile.textContent = secondInput.value;
    break;
    case 'add-place':
      const card = {};
      card.name = firstInput.value;
      card.link = secondInput.value;

      placesList.prepend(createCard(card));
    break;
  }
}


// create popup

const createPopup = event => {
  const popupElement = popupTemplate.cloneNode(true);

  // popup window elements
  const popup = popupElement.querySelector('.popup');
  const popupOverlay = popup.querySelector('.popup__overlay');
  const popupTitle = popup.querySelector('.popup__title');

  // popup form elements
  const formElement = popup.querySelector('.popup__form');
  const popupFormContainer = popup.querySelector('.popup__form-container');
  const popupInputs = Array.from(popup.querySelectorAll('.popup__form-text'));
  const nameInput = formElement.querySelector('.popup__form-text_profile-name');
  const jobInput = formElement.querySelector('.popup__form-text_job');
  const placeNameInput = formElement.querySelector('.popup__form-text_place-name');
  const placeLinkInput = formElement.querySelector('.popup__form-text_place-link');

  // popup preview elements
  const popupPreviewContainer = popup.querySelector('.popup__preview-container');
  const popupPreviewPhoto = popup.querySelector('.popup__preview-photo');
  const popupPreviewCap = popup.querySelector('.popup__preview-cap');


  popup.style.animation = 'fadeIn ease-in .3s forwards';
  popupOverlay.style.opacity = '.5';
  popupFormContainer.style.animation = 'scaleUp ease-in .2s forwards';


  popup.addEventListener('click', event => {
    closePopup(event, popup, popupOverlay, popupFormContainer);
  });

  formElement.addEventListener('submit', event => {
    closePopup(event, popup, popupOverlay, popupFormContainer);
  });


  // choose popup type and add
  if (event.target === editButton) {
    const editInputs = popupInputs.filter(input => {
      const fields = ['profile-name', 'profile-job'];

      return fields.includes(input.name);
    })

    popupTitle.textContent = 'Редактировать профиль';
    popup.setAttribute('aria-label', 'Окно редактирования профиля.');
    formElement.setAttribute('name', 'edit-profile');

    popupInputs.forEach(input => input.remove());
    popupPreviewContainer.remove();

    editInputs.reverse().forEach(input => formElement.prepend(input));

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    formElement.addEventListener('submit', event => {
      handleForm(event, formElement, nameInput, jobInput);
    })

    return popup;
  } else if (event.target === addButton) {
    const addInputs = popupInputs.filter(input => {
      const fields = ['place-name', 'place-photo-link'];

      return fields.includes(input.name);
    })

    popupTitle.textContent = 'Новое место';
    popup.setAttribute('aria-label', 'Окно добавления нового места.');
    formElement.setAttribute('name', 'add-place');

    popupInputs.forEach(input => input.remove());
    popupPreviewContainer.remove();

    addInputs.reverse().forEach(input => formElement.prepend(input));

    formElement.addEventListener('submit', event => {
      handleForm(event, formElement, placeNameInput, placeLinkInput);
    })

    return popup;
  } else if (event.target.classList.contains('places__place-photo')) {
    popupOverlay.style.opacity = '.9';

    popupFormContainer.remove();

    popupPreviewCap.textContent = event.currentTarget.querySelector('.places__place-name').textContent;
    popupPreviewPhoto.src = event.currentTarget.querySelector('.places__place-photo').src;

    return popup;
  }
}

const showPopup = event => {
  const popup = createPopup(event);

  return footer.after(popup);
}

editButton.addEventListener('click', showPopup);
addButton.addEventListener('click', showPopup);


// create card

const createCard = (card) => {
  const placeElement = placeTemplate.cloneNode(true);

  const trashButton = placeElement.querySelector('.places__trash-button');
  const placeName = placeElement.querySelector('.places__place-name');
  const placePhoto = placeElement.querySelector('.places__place-photo');
  const likeButton = placeElement.querySelector('.places__like-button');
  const place = placeElement.querySelector('.places__place');

  place.style.animation = 'appear .2s ease-in forwards';

  placeName.textContent = card.name;
  placePhoto.src = card.link;

  trashButton.addEventListener('click', event => {
    const removeCard = () => {
      event.target.parentElement.parentElement.remove();
    }

    place.style.animation = 'disappear .2s ease-out forwards';

    setTimeout(removeCard, 200);
  })

  likeButton.addEventListener('click', event => {
    event.target.classList.toggle('places__like-button_active');
  });

  place.addEventListener('click', showPopup);

  return placeElement;
}


// load initial cards

initialCards.slice().forEach(card => placesList.append(createCard(card)));
