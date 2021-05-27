import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Trending(){
    const { user } = useContext(UserContext);
    const [trendings, setTrendings] = useState(false);

    useEffect(() => {
        renderTrendings();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    function renderTrendings(){
        const token = user.token;
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending";
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        axios
            .get(url, config)
            .then(({data})=>{
                setTrendings(data)
            })
            .catch(() => alert("Houve uma falha as trendings. Por favor, atualize a página"));
    }
    
    return(
        <Box>
            <Title>trending</Title>
            <Line></Line>
            {trendings!==false && trendings.hashtags.map(t => (
                    <TrendingTopics key={t.id}>
                        #<Link to={`/hashtag/${t.name}`}>{t.name}</Link>
                    </TrendingTopics>
            ))}
        </Box>
    );
}

const Box = styled.div`
    max-width: 301px;
    width: 100%;
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

const TrendingTopics = styled.p`
    color: #FFF;
    font-size: 19px;
    font-family: "Lato";
    line-height: 23px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0 0 10px 16px;
`;