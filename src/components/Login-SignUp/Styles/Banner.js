import styled from 'styled-components';

const Banner = styled.div `
    width: 65%;
    height: 100vh;
    background: #151515;
    display: flex;
    justify-content: center;

    @media (max-width: 375px) {
        width: 100%;
        height: 175px;
        flex-direction: column;
        align-items: center;
    }`
    
export default Banner;