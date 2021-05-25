import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

export default function SignUp () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState("");
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
            <Form>
                <input placeholder="e-mail" type="email" value={email} required onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="password" type="password" value={password} required onChange={e => setPassword(e.target.value)}></input>
                <input placeholder="username" type="text" value={username} required onChange={e => setUsername(e.target.value)}></input>
                <input placeholder="picture url" type="url" value={picture} required onChange={e => setPicture(e.target.value)}></input>
                <button onClick={() => sendData(email, password, username, picture, setBoolean, user, setUser, history)} disabled={boolean} >Sign Up</button>
                <Link to="/">
                    <p>Switch back to log in</p>
                </Link>
            </Form>
        </Container>
    )
}

function sendData (email, password, username, picture, setBoolean, user, setUser, history) {
    const body = {"email": email, "password": password, "username": username, "pictureUrl": picture}

    setBoolean(true)
    if(email==="" || password==="" || username==="" || picture ==="") {
        alert("Preencha todos os campos")
    }

    const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body)
    request.then(promise => {history.push("/")})
    request.catch(()=> alert("O e-mail inserido já está cadastrado"))
}


//styled components (fazer um componente disso aqui)

const Container = styled.div `
    width: 100%;
    display: flex;`

const Banner = styled.div `
    width: 65%;
    height: 100vh;
    background: #151515;
    display: flex;
    justify-content: center;`

const Logo = styled.div `
    width: 442px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
        h1 {
            font-family: 'Passion One', cursive;
            font-weight: 700;
            font-size: 106px;
            color: #fff;
        }
        h2 {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 43px;
            color: #fff;
        }`

const Form = styled.form `
    width: 35%;
    height: 100vh;
    background: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
        input {
            width: 80%;
            height: 65px;
            font-family:'Oswald', sans-serif;
            font-size: 27px;
            font-weight: 700;
            margin-bottom: 13px;
            border-radius: 6px;
            border: none;
            padding-left: 17px;
            color: #9F9F9F;
        }
        button {
            width: 80%;
            height: 65px;
            background: #1877F2;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-family:'Oswald', sans-serif;
            font-weight: 700;
            font-size: 27px;
            margin-bottom: 22px;
        }
        p {
            color: #fff;
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 20px;
            text-decoration: underline;
        }`