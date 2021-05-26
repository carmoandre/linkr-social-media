import styled from 'styled-components';

const Form = styled.form `
width: 35%;
height: 100vh;
background: #333333;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media (max-width: 375px) {
    width: 100%;
    justify-content: unset;
    padding: 40px 0 0 0;
}

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

        @media (max-width: 375px) {
            width: 90%;
        }
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

        @media (max-width: 375px) {
            width: 90%;
        }
    }
    p {
        color: #fff;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 20px;
        text-decoration: underline;
    }`

export default Form;
