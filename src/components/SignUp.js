import styled from 'styled-components';

export default function SignUp () {
    return (
        <Container>
            <Banner>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </Banner>
            <Form>
                <input placeholder="e-mail"></input>
                <input placeholder="password"></input>
                <input placeholder="username"></input>
                <input placeholder="picture url"></input>
                <button>Sign Up</button>
                <p>Switch back to log in</p>
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

const Form = styled.div `
    width: 35%;
    height: 100vh;
    background: #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;`