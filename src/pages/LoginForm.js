import {useState} from "react";
import {useNavigate} from "react-router";

const LoginForm = () => {

    const navigate = useNavigate();

    const [logInformation, setLogInformation] = useState({});

    const onChange = (e) => {
        setLogInformation({
            ...logInformation,
            [e.target.name]: e.target.value
        })
    }

    const onLoginAttempt = (e) => {
        e.preventDefault();

        const {username, password} = logInformation;

        if (username === 'jhow' || password === '123') {
            navigate("/dashboard");
        }
    }

    return (
        <div className="login-page">
            <div>{logInformation.loggedIn ? 'Logado' : 'Deslogado'}</div>
            <div className="form">
                <form className="login-form">
                    <input name="username" type="text" placeholder="Username" onChange={onChange}/>
                    <input name="password" type="password" placeholder="Senha" onChange={onChange}/>
                    <button type="submit" onClick={onLoginAttempt}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;