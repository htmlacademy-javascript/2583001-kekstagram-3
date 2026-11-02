import {openBigPicture} from './full-picture.js';

const userPhotos = document.querySelector('.pictures__title');
userPhotos.classList.remove('visually-hidden');

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createDataPictire = (pictureContainer, similarPhotos) => {
  const similarPhotoFragment = document.createDocumentFragment();

  similarPhotos.forEach((photo) => {
    const {url, description, comments, likes} = photo;
    const photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    similarPhotoFragment.appendChild(photoElement);
  });

  pictureContainer.appendChild(similarPhotoFragment);
};

export {createDataPictire};
