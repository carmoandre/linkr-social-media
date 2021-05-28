import { Link, useHistory } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

import Container from './Styles/Container'
import Banner from './Styles/Banner'
import Logo from './Styles/Logo'
import Form from './Styles/Form'

export default function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [boolean, setBoolean] = useState(false);

    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const UserStorage = localStorage.getItem("user");
    
    useEffect(() => {
        if (UserStorage) {
            setUser(JSON.parse(UserStorage))
            history.push("/timeline")
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Banner>
                <Logo>
                    <h1>linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </Logo>
            </Banner>
            <Form onSubmit={(e)=>sendData(e, email, password, setBoolean, setUser, history)}>
                <input placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" disabled={boolean}>Log In</button>
                <Link to="/sign-up">
                    <p>First time? Create an account!</p>
                </Link>
            </Form>
        </Container>
    )
}

function sendData (e, email, password, setBoolean, setUser, history) {
    e.preventDefault()
    setBoolean(true);
    const body = {"email": email, "password": password}
    
    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body)
    request.then(promise => {
        setUser(promise.data)
        setBoolean(false);
        history.push("/timeline");
        localStorage.setItem("user", JSON.stringify(promise.data))
        }
    );
    request.catch(() => {
        setBoolean(false)
        alert("Email/senha incorretos")
    });
    
    if(email==="" || password === "") {
        alert("Preencha todos os campos")
    }
}