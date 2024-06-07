import { useState } from 'react';
import {useNavigate } from "react-router-dom";
import api from "../../lib/apiConfig"


export function auth() {
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('');
    const [authError, setAuthError] = useState(false)

    const loginUser = async (login, callback) => {
        if (login.username === "" || login.password === ""){
            callback("Form Harus Diisi Secara Lengkap")
            return;
        }
        try {
            const response = await api.post('login', login);
            console.log(response)
            const accessToken = response.data.accessToken
            console.log('Login Berhasil', response.data)
            response.data.role == 'admin' ? navigate('../dashboard/'):navigate('/home') 
        } catch (error) {
            if (error.response.status === 404) {
                callback(error.response.data.msg);
            } else if (error.response.status === 400) {
                callback(error.response.data.msg);
            } else {
                callback(error.response.data.msg);
            }
        }
    };

    return {
        accessToken,
        loginUser,
        authError
    };
}