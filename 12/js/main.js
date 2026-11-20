import {createDataPicture, comparePhotos} from './miniatures.js';
import {setUserFormSubmit, onFormSubmitSuccess, onFormSubmitFail} from './form.js';
import {getData} from './api.js';
import {ALERT_SHOW_TIME, getRandomInteger, debounce} from './util.js';

const NUMBER_RANDOM_PHOTOS = 10;

const pictureContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

getData()
  .then((photos) => {
    createDataPicture(pictureContainer, photos);

    const debounceResult = debounce((filteredPhotos) => {
      createDataPicture(pictureContainer, filteredPhotos);
    });

    imgFilters.classList.remove('img-filters--inactive');

    filterDefaultButton.addEventListener('click', () => {
      const activeFilterButton = imgFilters.querySelector('.img-filters__button--active');
      activeFilterButton.classList.remove('img-filters__button--active');
      filterDefaultButton.classList.add('img-filters__button--active');

      debounceResult(photos);
    });

    filterRandomButton.addEventListener('click', () => {
      const activeFilterButton = imgFilters.querySelector('.img-filters__button--active');
      activeFilterButton.classList.remove('img-filters__button--active');
      filterRandomButton.classList.add('img-filters__button--active');

      const photosArray = photos.slice();
      const randomPhotosArray = [];

      for (let i = 0; i < NUMBER_RANDOM_PHOTOS && photosArray.length > 0; i++) {
        const randomIndex = getRandomInteger(0, photosArray.length - 1);
        const deletePhotosArray = photosArray.splice(randomIndex, 1);
        randomPhotosArray.push(deletePhotosArray[0]);
      }

      debounceResult(randomPhotosArray);
    });

    filterDiscussedButton.addEventListener('click', () => {
      const activeFilterButton = imgFilters.querySelector('.img-filters__button--active');
      activeFilterButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.add('img-filters__button--active');

      debounceResult(photos.slice().sort(comparePhotos));
    });
  })
  .catch(() => {
    const dataError = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

    document.body.append(dataError);

    setTimeout(() => {
      dataError.remove();
    }, ALERT_SHOW_TIME);
  });

setUserFormSubmit(onFormSubmitSuccess, onFormSubmitFail);
