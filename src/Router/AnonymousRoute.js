import { useNavigate } from "react-router-dom";

export default function AnonymousRoute({ element }) {
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate()

    if (user === undefined || user === null || user === 'null') {
        navigate('/login')
    } else {
        navigate('/profile')
    }
}