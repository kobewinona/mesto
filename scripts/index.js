const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const cardPopup = document.querySelector('.popup_type_add-place');
const cardPreviewPopup = document.querySelector('.popup_type_place-preview');

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');

const cardsList = document.querySelector('.places__list');

const footer = document.querySelector('.footer');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__form-text_profile-name');
const jobInput = profileForm.querySelector('.popup__form-text_job');

const cardForm = document.forms['add-place'];
const cardNameInput = cardForm.querySelector('.popup__form-text_place-name');
const cardLinkInput = cardForm.querySelector('.popup__form-text_place-link');

const cardPreviewPhoto = document.querySelector('.popup__preview-photo');
const cardPreviewCap = document.querySelector('.popup__preview-cap');

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


// handle popups

const closePopup = popup => {
  popup.classList.remove('popup_opened');

  popup.querySelector('.popup__container').style.animation = 'shrink .2s ease-out forwards';
}

const openPopup = popup => {
  popup.classList.add('popup_opened');

  popup.querySelector('.popup__container').style.animation = 'grow .2s ease-in forwards';
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


// handle cards

const deleteCard = event => {
  const removeCard = () => {
    event.target.closest('li').remove();
  }

  event.target.closest('li').style.animation = 'shrink .2s ease-out forwards';

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
  card.closest('li').style.animation = 'grow .2s ease-in forwards';


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
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  openPopup(profilePopup);
})

cardButton.addEventListener('click', () => {
  openPopup(cardPopup);
})

profileForm.addEventListener('submit', handleProfileForm);

cardForm.addEventListener('submit', handleCardForm);
