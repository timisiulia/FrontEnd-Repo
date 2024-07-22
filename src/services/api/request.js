import axios from 'axios';
import Cookies from "universal-cookie/lib";

const BASE_URL = 'http://localhost:8080';

const cookie = new Cookies();

const getAuthenticationToken = () => {
  try {
    const cookieee = cookie.get('access_token');
    return cookieee

  } catch {
    return null;
  }
};

export function request() {
  const token = getAuthenticationToken();

  if (!token) {
    return axios.create({
      baseURL: BASE_URL,
    });
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
