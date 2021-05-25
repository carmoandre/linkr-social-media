import styled from "styled-components";

export default function Trending(){
    return(
        <Box>
            <Title>trending</Title>
            <Line></Line>
        </Box>
    );
}

const Box = styled.div`
    position: fixed;
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    z-index: 1;
    right: calc((100vw - 864px)/2);
`;

const Title = styled.h1`
    color: #FFF;
    font-size: 27px;
    font-family: "Oswald";
    margin-top: 9px;
    margin-left: 16px; 
`;

const Line = styled.div`
    width: 100%;
`;