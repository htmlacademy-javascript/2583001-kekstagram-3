import {openBigPicture} from './full-picture.js';

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const comparePhotos = (photoA, photoB) => {
  const commentsCountA = photoA.comments.length;
  const commentsCountB = photoB.comments.length;
  return commentsCountB - commentsCountA;
};

const createDataPicture = (pictureContainer, similarPhotos) => {
  const similarPhotoFragment = document.createDocumentFragment();
  const allPictures = pictureContainer.querySelectorAll('.picture');

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

  allPictures.forEach((picture) => {
    picture.remove();
  });

  pictureContainer.appendChild(similarPhotoFragment);
};

export {createDataPicture, comparePhotos};
