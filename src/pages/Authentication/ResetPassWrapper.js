
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const ResetPassWrapper = () => {
    const navigate = useNavigate()
    const params = useParams();

    // Access the data from the route
    const token = params.token;
    const userId = params.userId;

    useEffect(() => {
        navigate('/reset_password', { state: { token, userId } })
    }, [token, userId])
    return (
        <>
        </>
    );
}

export default ResetPassWrapper;