import styled from 'styled-components';

const Container = styled.div `
    width: 100%;
    display: flex;
    
    @media (max-width: 430px) {
        width: 100%;
        flex-direction:column;
        height: 100vh;
    }`
    
export default Container;