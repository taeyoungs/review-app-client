import { toAuthApi } from 'api';
import storage from './storage';

export const onLoginCallback = async (result) => {
  console.log(result);

  const payload = {
    tokenId: result.tokenId,
  };

  try {
    await toAuthApi.googleLogin(payload).then((res) => {
      if (res.status === 200) {
        storage.set('userInfo', res.data);
        alert('로그인 완료');
        window.location.href = '/';
      }
    });
  } catch (error) {
    console.log(error);
  }
};
