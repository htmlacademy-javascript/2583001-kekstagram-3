import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_COUNT = 140;

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const fileUploadControl = document.querySelector('.img-upload__input');
const previewWindow = document.querySelector('.img-upload__overlay');
const closePreviewButton = document.querySelector('.img-upload__cancel');
const imgForm = document.querySelector('.img-upload__form');

const textHashtags = imgForm.querySelector('.text__hashtags');
const textDescription = imgForm.querySelector('.text__description');


const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const closePreview = () => {
  previewWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

const openPreview = () => {
  previewWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

closePreviewButton.addEventListener('click', closePreview);
fileUploadControl.addEventListener('change', openPreview);

const getHashtags = (value) => {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return [];
  }

  const hashtags = trimmedValue.split(' ');
  return hashtags;
};

const validateHashtagCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateHashtagText = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((elem) => HASHTAG_PATTERN.test(elem));
};

const validateHashtagRepeat = (value) => {
  const hashtags = getHashtags(value);
  const hashtagsLowerCase = hashtags.map((tag) => tag.toLowerCase());
  return new Set(hashtagsLowerCase).size === hashtags.length;
};

const validateTextDescription = (value) => value.length <= MAX_DESCRIPTION_COUNT;

pristine.addValidator(
  textHashtags,
  validateHashtagText,
  'Введён невалидный хэштег'
);

pristine.addValidator(
  textHashtags,
  validateHashtagCount,
  'Можно указать не больше 5 хэштегов'
);

pristine.addValidator(
  textHashtags,
  validateHashtagRepeat,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  textDescription,
  validateTextDescription,
  'Длина комментария не может составлять больше 140 символов'
);

imgForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const onTextFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

textHashtags.addEventListener('keydown', onTextFieldKeydown);
textDescription.addEventListener('keydown', onTextFieldKeydown);
