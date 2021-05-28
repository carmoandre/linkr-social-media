import styled from 'styled-components';

const Logo = styled.div `
    width: 442px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 430px) {
        width: 70%;
        align-items: center;
        height: 175px;
    }

        h1 {
            font-family: 'Passion One', cursive;
            font-weight: 700;
            font-size: 106px;
            color: #fff;

            @media (max-width: 430px) {
                font-size: 76px;
            }
        }
        h2 {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 43px;
            color: #fff;

            @media (max-width: 430px) {
                font-size: 23px;
                text-align: center;
            }
        }`

export default Logo;