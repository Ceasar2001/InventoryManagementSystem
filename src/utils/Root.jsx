import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';

const Root = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            if(user.role === 'admin'){
                navigate('/admin/dashboard');
            } else if (user.role === 'staff'){
                navigate('/staff/dashboard');
            } else {
                navigate('/login');
            }
        }else{
            navigate('/login');
        }
    }, [user, navigate]);

    return null;
}

export default Root;