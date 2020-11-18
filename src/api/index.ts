import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "@utils/localStorage";
import { BASE_URL } from "@config";

axios.defaults.headers.common["Content-Type"] = "application/json";
const debug = process.env.REACT_APP_ENV !== "production";

const onSuccess = async <T>(
  data: AxiosResponse<T>
): Promise<AxiosResponse<T>> => {
  // eslint-disable-next-line
  if (debug) console.log("onSuccess << data", data);
  return Promise.resolve<AxiosResponse<T>>(data);
};
const onSuccessAll = async <T>(
  data: AxiosResponse<T>[]
): Promise<AxiosResponse<T>[]> => {
  // eslint-disable-next-line
  if (debug) console.log("onSuccess << data", data);
  return Promise.resolve<AxiosResponse<T>[]>(data);
};
const onError = async (error: AxiosError): Promise<never> => {
  // eslint-disable-next-line
  if (debug) console.log("onError << error", error);
  return Promise.reject(error);
};

/**
 * AxiosRequestConfigをデフォルト値以外に書き換え
 * 対応パラメータ(必要に応じて追加)：headers,responseType
 * @param params
 */
const margeParam = (params: AxiosRequestConfig): AxiosRequestConfig => {
  const defaultRequestConfig = {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    responseType: "json"
  };
  return {
    headers: {
      ...defaultRequestConfig.headers,
      ...params.headers
    },
    responseType: params.responseType || defaultRequestConfig.responseType
  };
};

export default {
  get: async <T>(
    url: string,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const targetUrl = `${BASE_URL}${url}`;
    // eslint-disable-next-line
    if (debug) console.log(`GET ${targetUrl} >> ${JSON.stringify(params)}`);
    return axios
      .get<T>(targetUrl, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  post: async <T, D>(
    url: string,
    data?: D,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) {
      // eslint-disable-next-line
      console.log(
        `POST ${targetUrl} >> ${JSON.stringify({ params, data: data || {} })}`
      );
    }
    return axios
      .post<T>(targetUrl, data || {}, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  postAll: async <T, D>(
    posts: {
      url: string;
      data?: D;
      params?: AxiosRequestConfig;
    }[]
  ): Promise<AxiosResponse<T>[]> => {
    return axios
      .all(
        posts.map(({ url, data, params }) => {
          const targetUrl = `${BASE_URL}${url}`;
          if (debug) {
            // eslint-disable-next-line
            console.log(
              `POST ALL ${targetUrl} >> ${JSON.stringify({
                params,
                data: data || {}
              })}`
            );
          }
          return axios.post<T>(targetUrl, data || {}, margeParam(params || {}));
        })
      )
      .then(onSuccessAll)
      .catch(onError);
  },
  put: async <T, D>(
    url: string,
    data?: D,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const targetUrl = `${BASE_URL}${url}`;
    if (debug) {
      // eslint-disable-next-line
      console.log(
        `PUT ${targetUrl} >> ${JSON.stringify({ params, data: data || {} })}`
      );
    }
    return axios
      .put<T>(targetUrl, data || {}, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  },
  delete: async <T>(
    url: string,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const targetUrl = `${BASE_URL}${url}`;
    // eslint-disable-next-line
    if (debug) console.log(`DELETE ${targetUrl} >> ${JSON.stringify(params)}`);
    return axios
      .delete(targetUrl, margeParam(params || {}))
      .then(onSuccess)
      .catch(onError);
  }
};
