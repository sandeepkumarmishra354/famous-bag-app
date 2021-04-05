import axios, { AxiosRequestConfig } from 'axios';

export interface ApiResponse {
    status: number,
    message: string,
    payload: {
        data: any,
        opcode: number
    }
};

const consumer_key = "ck_fd5ad9de17436ffbc72e2772f9f3da6870de8a97";
const consumer_secret = "cs_f41a61a6195939ba0b1536ff46729da0fa0a4465";

const BaseUrl = 'https://sgcreation.in/wp-json/wc/v3';
const BaseUrlAuth = 'https://sgcreation.in/wp-json/wp/v3/users';
const TimeOut = 10 * 1000;//10 seconds

const axiosConfig: AxiosRequestConfig = {
    timeout: TimeOut,
    responseType: 'json',
    validateStatus: (status) => true,
};

const requestInterceptor = async (config: AxiosRequestConfig) => {
    config.params = {
        consumer_key,
        consumer_secret,
    };
    return config;
}

export const ApiAuth = axios.create({
    baseURL: BaseUrlAuth,
    ...axiosConfig
});
export const ApiNormal = axios.create({
    baseURL: BaseUrl,
    ...axiosConfig
});

//Add request interceptors
ApiAuth.interceptors.request.use(requestInterceptor, (err) => {
    return Promise.reject(err);
});

//Add request interceptors
ApiNormal.interceptors.request.use(requestInterceptor, (err) => {
    return Promise.reject(err);
});