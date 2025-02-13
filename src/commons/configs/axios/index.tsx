import Axios from 'axios';
import { CMS_URL } from 'commons/constants/Constants';

const baseAxios = Axios.create({
  baseURL: CMS_URL + 'api/',
  timeout: 60000,
  maxRedirects: 5,
});

export default baseAxios;
