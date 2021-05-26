import styled from "styled-components";

export default function Trending(){
    return(
        <Box>
            <Title>trending</Title>
            <Line></Line>
            <Hash>#javascript</Hash>
        </Box>
    );
}

const Box = styled.div`
    max-width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    @media (max-width: 500px){
        display: none;
    }
`;

const Title = styled.h1`
    color: #FFF;
    font-size: 27px;
    font-family: "Oswald";
    margin: 12px 0 15px 16px;
`;

const Line = styled.div`
    width: 100%;
    border: 1px solid #484848;
    margin-bottom: 18px;
`;

const Hash = styled.p`
    color: #FFF;
    font-size: 19px;
    font-family: "Lato";
    line-height: 23px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0 0 10px 16px;
`;