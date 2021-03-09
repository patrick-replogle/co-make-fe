import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('coMakeToken');

    return axios.create({
        baseURL: 'https://co-make-be.herokuapp.com/api',
        headers: {
            Authorization: token,
        },
    });
};
