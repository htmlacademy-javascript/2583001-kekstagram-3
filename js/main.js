const DESCRIPTION_PHOTO = [
  'Всем привет!',
  'Оцените фотографию!',
  'Какой прекрасный день!',
  'Моя любимая фотография',
  'Поделитесь и вы своим фото',
  'Просто оставлю это здесь',
  'Как вам такой кадр?',
  'Немного красоты в вашу ленту',
  'Поймал удачный момент',
  'Хочу поделиться этим моментом',
  'Один из лучших дней!',
  'Как вам фотография?',
  'Маленький момент большого счастья',
  'Без лишних слов',
  'Пусть это останется здесь',
  'Сегодня отличный день!',
  'Немного хорошего настроения',
  'Этот момент стоит запомнить',
  'Что скажете?',
  'Просто хорошее фото'
];

const NAMES = [
  'Иван',
  'Артем',
  'Мария',
  'Марина',
  'Маша',
  'Юлия',
  'Александр',
  'Екатерина',
  'Анастасия',
  'Дарья'
];

const TEXT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;

const MIN_NUMBER_LIKES_PHOTO = 15;
const MAX_NUMBER_LIKES_PHOTO = 200;

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();

const createPhotoComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(TEXT_MESSAGE),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => {
  const randomCountComments = getRandomInteger(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
  const id = generatePhotoId();
  const comments = [];
  for (let i = 0; i < randomCountComments; i++) {
    comments.push(createPhotoComment());
  }
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes: getRandomInteger(MIN_NUMBER_LIKES_PHOTO, MAX_NUMBER_LIKES_PHOTO),
    comments: comments
  };
};

// eslint-disable-next-line no-unused-vars
const similarPhotoDescriptions = Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);
