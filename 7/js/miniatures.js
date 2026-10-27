const userPhotos = document.querySelector('.pictures__title');
userPhotos.classList.remove('visually-hidden');

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoFragment = document.createDocumentFragment();

const createDataPictire = (pictureContainer, similarPhotos) => {
  similarPhotos.forEach(({url, description, likes, comments}) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    similarPhotoFragment.appendChild(photoElement);
  });

  pictureContainer.appendChild(similarPhotoFragment);
};

export {createDataPictire};
