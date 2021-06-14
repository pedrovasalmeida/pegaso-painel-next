import axios from 'axios';

let baseURL = '/api';
let baseURLSSR = `${process.env.NEXT_PUBLIC_LOCAL_URL_APP}/api`;

export const api = axios.create({
  baseURL,
});

export const apiSsr = axios.create({
  baseURL: baseURLSSR,
});
