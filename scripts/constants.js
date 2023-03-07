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
const inputList = Array.from(profileForm.querySelectorAll('.form__input'));

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
