import styled from 'styled-components';
import { Link } from "react-router-dom"

export default function SignUp () {
    return (
        <Container>
            <Banner>
                <Logo>
                    <h1>linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </Logo>
            </Banner>
            <Form>
                <input placeholder="e-mail"></input>
                <input placeholder="password"></input>
                <input placeholder="username"></input>
                <input placeholder="picture url"></input>
                <button>Sign Up</button>
                <Link to="/" exact>
                    <p>Switch back to log in</p>
                </Link>
            </Form>
        </Container>
    )
}

//styled components

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

const Form = styled.div `
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