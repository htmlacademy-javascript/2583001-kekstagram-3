import {createDataPictire} from './miniatures.js';
import {setUserFormSubmit, onFormSubmitSuccess, onFormSubmitFail} from './form.js';
import {getData} from './api.js';
import {ALERT_SHOW_TIME} from './util.js';

const pictureContainer = document.querySelector('.pictures');

getData()
  .then((photos) => {
    createDataPictire(pictureContainer, photos);
  })
  .catch(() => {
    const dataError = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

    document.body.append(dataError);

    setTimeout(() => {
      dataError.remove();
    }, ALERT_SHOW_TIME);
  });

setUserFormSubmit(onFormSubmitSuccess, onFormSubmitFail);
