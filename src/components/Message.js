import React from 'react';
import styled from "styled-components";
import { CgUserAdd } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaRegSadTear, FaLongArrowAltRight } from "react-icons/fa";

export default function Message(props){
    const {text} = props;

    if (text!==""){
        return(
            <Box>
                <h1>{text}</h1>
                {text === "Você não segue ninguém ainda, procure por perfis na busca" 
                    ? <span><BiSearchAlt2 color="white" size={25} />   <FaLongArrowAltRight color="white" size={25} />   <CgUserAdd color="white" size={30} /></span>
                    : <FaRegSadTear color="white" size={30}/>
                }
            </Box>
        );
    } else {
        return "";
    }
}

const Box = styled.div`
    width: 100%;
    margin-top: 50px;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h1{
        color: #FFF;
        font-family: "Lato";
        font-weight: 700;
        font-size: 20px;
        letter-spacing: 0.05em;
        margin-bottom: 10px;
    }
`;