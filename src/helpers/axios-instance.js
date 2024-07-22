import axios from "axios";

export const axiosInstance = () => {
    return axios.create({ baseURL: 'https://localhost:8080' });
}
