import axios from 'axios';

let IP = 'https://dev.api.aimhi.ai/';

export const Login = value => {
  let data = {
    username: value.username,
    password: value.password,
    method: 'login',
  };

  return axios({
    url: IP + 'session/login',
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const userData = async (user_id, accessToken) => {
  return axios({
    url: IP + 'account/user/info',
    data: {user_id},
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      // "Drive-Token": token,
    },
  });
};
