// handle popups

const closePopupWithEsc = event => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const openPopup = popup => {
  const popupContainer = popup.querySelector('.popup__container');

  popup.classList.add('popup_opened');

  popupContainer.classList.remove('shrink');
  popupContainer.classList.add('grow');

  document.addEventListener('keydown', closePopupWithEsc);
}

const closePopup = popup => {
  const popupContainer = popup.querySelector('.popup__container');

  popup.classList.remove('popup_opened');

  popupContainer.classList.remove('grow');
  popupContainer.classList.add('shrink');

  document.removeEventListener('keydown', closePopupWithEsc);
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

  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    alt: cardNameInput.value
  };

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
  event.target.closest('.places__place').classList.remove('grow');
  event.target.closest('.places__place').classList.add('shrink');

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

initialCards.forEach(item => cardsList.append(createCard(item)));


// add event listeners

popups.forEach(popup => {
  popup.addEventListener('mousedown', event => {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

profileButton.addEventListener('click', () => {
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
