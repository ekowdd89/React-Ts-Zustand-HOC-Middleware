import { useAuthStore } from "../../store/authStore"
import { useNavigate } from 'react-router-dom';
export const SignIn = () => {
    const {user, login} = useAuthStore();
    const navigate = useNavigate();

    const onLogin = () => {
        login("admin")
        navigate("/dashboard")
    }
    return (
        <>

            <div>SignIn {user ?? "no user"} </div>

            <button onClick={onLogin}>Login</button>

        </>

    )
}