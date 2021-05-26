import { Link, useHistory } from "react-router-dom"
import { useContext, useState } from "react"
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

import Container from './Styles/Container'
import Banner from './Styles/Banner'
import Logo from './Styles/Logo'
import Form from './Styles/Form'

export default function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [boolean, setBoolean] = useState(false)

    const { user, setUser } = useContext(UserContext)
    const history = useHistory()

    return (
        <Container>
            <Banner>
                <Logo>
                    <h1>linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </Logo>
            </Banner>
            <Form onSubmit={(e)=>e.preventDefault()}>
                <input placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)}></input>
                <button onClick={() => sendData(email, password, setBoolean, user, setUser, history)} disabled={boolean}>Log In</button>
                <Link to="/sign-up">
                    <p>First time? Create an account!</p>
                </Link>
            </Form>
        </Container>
    )
}

function sendData (email, password, setBoolean, user, setUser, history) {

    const body = {"email": email, "password": password}
    
    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body)
    request.then(promise => {
        setUser(promise.data)
        history.push("/timeline")
        console.log("logou")
        }
    )
    request.catch(() => alert("Email/senha incorretos"))

    setBoolean(true)
    if(email==="" || password === "") {
        alert("Preencha todos os campos")
    }
}