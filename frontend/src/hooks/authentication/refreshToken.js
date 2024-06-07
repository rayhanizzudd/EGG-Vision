import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom";
import api from "../../lib/apiConfig.js"


export function refreshToken(){
    const [tokenData, setTokenData] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState();
    const [role, setRole] = useState();
    const [exp, setExp] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await api.get("token");
                if (response.status === 200) {
                    setTokenData(response.data.accessToken);
                    const decoded = jwtDecode(response.data.accessToken);
                    setUsername(decoded.username);
                    setUserId(decoded.userId)
                    setRole(decoded.role)
                    setExp(decoded.exp);
                } else {
                    console.log("disini erornya")
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.log("disini erornya 2")
                navigate('/login')
            }
        };
        refresh();
    }, []);


    return {
        tokenData, username, exp, error, userId, role
    }

}