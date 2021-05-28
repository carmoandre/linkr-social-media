import { Link, useHistory } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

import Container from './Styles/Container'
import Banner from './Styles/Banner'
import Logo from './Styles/Logo'
import Form from './Styles/Form'

export default function SignUp () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState("");
    const [boolean, setBoolean] = useState(false)
    const history = useHistory()

    return (
        <Container>
            <Banner>
                <Logo>
                    <h1>linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </Logo>
            </Banner>
            <Form onSubmit={(e)=>sendData(e, email, password, username, picture, setBoolean, history)}>
                <input placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)}></input>
                <input placeholder="username" type="text" value={username} required onChange={e => setUsername(e.target.value)}></input>
                <input placeholder="picture url" type="url" value={picture} required onChange={e => setPicture(e.target.value)}></input>
                <button type="submit" disabled={boolean} >Sign Up</button>
                <Link to="/">
                    <p>Switch back to log in</p>
                </Link>
            </Form>
        </Container>
    )
}

function sendData (e, email, password, username, picture, setBoolean, history) {
    e.preventDefault()
    setBoolean(true)
    const body = {"email": email, "password": password, "username": username, "pictureUrl": picture}

    if(email==="" || password==="" || username==="" || picture ==="") {
        alert("Preencha todos os campos")
    }

    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body)
    request.then(promise => history.push("/"))
    request.catch(()=> alert("O e-mail inserido já está cadastrado"))
    request.finally(()=> setBoolean(false));
}