import api from "../../lib/apiConfig.js"
import {useNavigate} from "react-router-dom";

export function logout(){
    const navigate = useNavigate();
    const out = async () => {
        try {
            await api.delete('logout');
            navigate('/')
        }
        catch (e){
            console.log(e)
        }
    }

    return {
        out
    }
}