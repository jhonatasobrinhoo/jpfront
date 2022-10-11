import {useState} from "react";
import {saveContact} from "../apis/contactsService";
import {useAuth} from "../contexts/auth/AuthContext";

const Status = {
    LOGIN: 'LOGIN',
    REGISTERING: 'REGISTERING',
    REGISTERED: 'REGISTERED',
}

const LoginForm = () => {
    const {login} = useAuth();

    const [logInformation, setLogInformation] = useState({});
    const [status, setStatus] = useState(Status.LOGIN);

    const onChange = (e) => {
        setLogInformation({
            ...logInformation,
            [e.target.name]: e.target.value
        })
    }

    const onLoginAttempt = (e) => {
        e.preventDefault();

        const {username, password} = logInformation;

        if (username === 'jhow' && password === '123') {
            login({
                username,
                admin: true
            });
        }
    }

    const onClick = (e, status) => {
        e.preventDefault();

        setStatus(status);
    }

    const onClickRegister = async (e) => {
        e.preventDefault();

        await saveContact({
            name: logInformation.nameRegistration,
            email: logInformation.emailRegistration,
            whatsapp: logInformation.whatsappRegistration,
        });

        setStatus(Status.REGISTERED);
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" style={{display: status === Status.LOGIN ? 'block ' : 'none'}}>
                    <input name="username" type="text" placeholder="Username" onChange={onChange}/>
                    <input name="password" type="password" placeholder="Senha" onChange={onChange}/>
                    <button type="submit" onClick={onLoginAttempt}>Login</button>
                    <p className="message">Tem interesse mas não tem uma conta? <a href="#" onClick={e => onClick(e, Status.REGISTERING)}>Registre-se já!</a></p>
                </form>
                <form className="register-form" style={{display: status === Status.REGISTERING ? 'block ' : 'none'}}>
                    <input name="nameRegistration" type="text" placeholder="Nome" onChange={onChange}/>
                    <input name="emailRegistration" type="email" placeholder="Email" onChange={onChange}/>
                    <input name="whatsappRegistration" type="text" placeholder="WhatsApp" onChange={onChange}/>
                    <button onClick={onClickRegister}>Registrar-se</button>
                    <p className="message">Já tem uma conta? <a href="#" onClick={e => onClick(e, Status.LOGIN)}>Login</a></p>
                </form>
                <div style={{display: status === Status.REGISTERED ? 'block ' : 'none'}}>
                    <p>Obrigado por se registrar.</p>
                    <p><b>Entraremos em contato o mais rápido possível!</b></p>
                    <br/>
                    <button onClick={e => onClick(e, Status.LOGIN)}>Voltar ao início</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;