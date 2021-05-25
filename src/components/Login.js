import styled from 'styled-components';

export default function Login () {
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
                <button>Login</button>
                <p>First time? Create an account!</p>
            </Form>
        </Container>
    )
}

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
    align-items: center;`