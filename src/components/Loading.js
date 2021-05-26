import React from 'react';
import ReactLoading from 'react-loading';
import styled from "styled-components";

export default function Loading(){
    return(
        <Box>
            <h1>loading...</h1>
            <ReactLoading type="cubes" color="#171717" height={150} width={120} />
        </Box>
    );
}

const Box = styled.div`
    width: 611px;
    margin-top: 50px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        color: #FFF;
        font-family: "Lato";
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.05em;
    }
`;