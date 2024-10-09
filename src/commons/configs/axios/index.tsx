import Axios from 'axios';
import { CMS_URL } from 'commons/configs/Constants';

const baseAxios = Axios.create({
  baseURL: CMS_URL + 'api/',
  timeout: 60000,
  maxRedirects: 5,
});

export const updateToken = (accessToken: string): void => {
  if (accessToken) {
    baseAxios.defaults.headers.common['Authorization'] = 'JWT ' + accessToken;
  } else {
    baseAxios.defaults.headers.common['Authorization'] = null;
    delete baseAxios.defaults.headers.common['Authorization'];
  }
};

export default baseAxios;
