const AVATAR_NAMES = [
  'BatFace',
  'Bear',
  'Bird',
  'Bull',
  'Butterfly',
  'Cat',
  'Chicken',
  'Crab',
  'Dog',
  'Dolphin',
  'Elephant',
  'Fish',
  'Frog',
  'Giraffe',
  'Horse',
  'Kangaroo',
  'Lion',
  'Panda',
  'Snail',
  'Turtle',
];

export const AVATAR_TYPES = AVATAR_NAMES.map((avatarName, idx) => ({
  id: idx,
  name: avatarName,
}));
