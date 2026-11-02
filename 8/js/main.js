import {createDataPictire} from './miniatures.js';
import {photos} from './data.js';

const pictureContainer = document.querySelector('.pictures');

createDataPictire(pictureContainer, photos);
