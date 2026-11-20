import {isEscapeKey} from './util.js';

const IMG_COMMENT_SIZE = 35;
const COMMENTS_STEP = 5;

let currentComments = [];
let displayedCommentsCount = 0;

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createImgComment = (comment) => {
  const newImgComment = document.createElement('img');
  newImgComment.classList.add('social__picture');

  newImgComment.src = comment.avatar;
  newImgComment.alt = comment.name;
  newImgComment.width = IMG_COMMENT_SIZE;
  newImgComment.height = IMG_COMMENT_SIZE;

  return newImgComment;
};

const createParagraphComment = (comment) => {
  const newTextComment = document.createElement('p');
  newTextComment.classList.add('social__text');

  newTextComment.textContent = comment.message;

  return newTextComment;
};

const createComments = (comments) => {
  for (let i = 0; i < comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const newImgComment = createImgComment(comments[i]);
    const newParagraphComment = createParagraphComment(comments[i]);

    newComment.append(newImgComment, newParagraphComment);
    commentsList.append(newComment);
  }
};

const showNextComments = () => {
  const nextPartComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP);
  createComments(nextPartComments);
  displayedCommentsCount += nextPartComments.length;
  bigPicture.querySelector('.social__comment-shown-count').textContent = displayedCommentsCount;
  if (displayedCommentsCount === currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;

  currentComments = photo.comments;
  displayedCommentsCount = 0;
  commentsList.replaceChildren();

  showNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', showNextComments);

export {openBigPicture};
