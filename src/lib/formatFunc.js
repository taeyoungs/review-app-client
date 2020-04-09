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

export const sortArray = (array, best) => {
  if (best) {
    array.sort(function (a, b) {
      if (a.views < b.views) {
        return 1;
      }
      if (a.views > b.views) {
        return -1;
      }
      return 0;
    });
  } else {
    array.sort(function (a, b) {
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      if (d1 < d2) {
        return 1;
      }
      if (d1 > d2) {
        return -1;
      }
      return 0;
    });
  }

  return array;
};

export const checkEdit = (payload) => {
  // 현재 비밀번호 - password
  // 변경할 비밀번호 - newP
  // 비밀번호 확인 - newP2
  // payload = {newP, newP2, confirm}

  const { newP, newP2, username } = payload;

  if (username === '') {
    alert('이름을 입력해주세요.');
    return false;
  }

  if (newP === '' && newP2 === '') {
    return true;
  }

  if (newP !== '' && newP2 === '') {
    alert('비밀번호 확인을 입력해주세요.');
    return false;
  } else if (newP === '' && newP2 !== '') {
    alert('변경하실 비밀번호를 입력해주세요.');
    return false;
  } else if (newP !== '' && newP2 !== '') {
    if (newP === newP2) {
      return true;
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
  }
};
