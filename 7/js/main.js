import {createDataPictire} from './miniatures.js';
import {photos} from './data.js';
import {initFullPicture} from './full-picture.js';

const pictureContainer = document.querySelector('.pictures');

createDataPictire(pictureContainer, photos);
initFullPicture(photos);
