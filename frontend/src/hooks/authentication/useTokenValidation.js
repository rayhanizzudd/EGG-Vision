import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useTokenValidation(tokenData, exp,role,page, props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (role != page){
            navigate('/')
        }

        if (!tokenData) {
            navigate({props});
        } else {
            try {
                if (exp < Date.now() / 1000) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/login');
            }
        }
    }, [tokenData, exp, navigate]);
}