export const formatDate = (createdAt) => {
  const now = Date.now();
  const date = new Date(createdAt);

  const number = (now - date) / 1000;

  let result = '';

  if (number < 60) {
    result = '방금 전';
  } else if (number >= 60 && number < 3600) {
    result = `${Math.floor(number / 60)}분 전`;
  } else if (number >= 3600 && number < 3600 * 24) {
    result = `${Math.floor(number / 3600)}시간 전`;
  } else if (number >= 3600 * 24 && number < 3600 * 24 * 30) {
    result = `${Math.floor(number / (3600 * 24))}일 전`;
  } else if (number >= 3600 * 24 * 30 && number < 3600 * 24 * 365) {
    result = `${Math.floor(number / (3600 * 24 * 30))}달 전`;
  } else if (number >= 3600 * 24 * 365) {
    result = `${Math.floor(number / (3600 * 24 * 365))}년 전`;
  }

  return result;
};
