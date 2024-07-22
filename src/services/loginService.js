import {axiosInstance} from "../helpers/axios-instance";


const loginAction = (inputs) => {
    const { email, password } = inputs;

    const res = axiosInstance().post('/login', { email, password })
}
