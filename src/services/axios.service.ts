import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '../stores/store';
import { get, set } from 'lodash';
import { authenticateActions } from '../stores/slices/authenticate.slice';

export function createAxiosInstance(baseURL = process.env.REACT_APP_URL_API) {
  const language = localStorage.getItem('language') || 'vi';
  return Axios.create({
    timeout: 60000,
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-localization': language,
    },
  });
}

const axiosInstance = createAxiosInstance();

export function addRequestInterceptor(instance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
      const state = store.getState();
      const accessToken = get(state, 'authenticate.token');
      if (accessToken) {
        set(config, 'headers.Authorization', `Bearer ${accessToken}`);
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return instance;
}

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error?.response?.data?.message === 'Tài khoản không được xác thực.') {
      store.dispatch({
        type: authenticateActions.postLoginSuccess.type,
      });
      sessionStorage.clear();
    }
    return Promise.reject(error);
  },
);

export default addRequestInterceptor(axiosInstance);
