import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useHistory } from "react-router-dom";

export default function Trending(){
    const { user } = useContext(UserContext);
    const [trendings, setTrendings] = useState(false);
    const [hashtag, setHashtag] = useState("");
    const history = useHistory();

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
            .catch(() => alert("Houve uma falha nas trendings. Por favor, atualize a página"));
    }

    function searchHashtag(e){
        e.preventDefault();
        history.push(`/hashtag/${hashtag}`)
    }
    
    return(
        <Box>
            <Title>trending</Title>
            <Line></Line>
            {trendings!==false && trendings.hashtags.map(t => (
                    <TrendingTopics key={t.id}>
                        # <Link to={`/hashtag/${t.name}`}>{t.name}</Link>
                    </TrendingTopics>
            ))}
            <Form onSubmit={searchHashtag}>
                <Input placeholder="type a hashtag" value={hashtag} onChange={e => setHashtag(e.target.value)}></Input>
                <span>#</span>
            </Form>
        </Box>
    );
}

const Box = styled.div`
    flex: 1 1.3 301px;
    height: 441px;
    background: #171717;
    border-radius: 16px;
    @media (max-width: 768px){
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
    margin-bottom: 12px;
`;

const TrendingTopics = styled.p`
    color: #FFF;
    font-size: 19px;
    font-family: "Lato";
    line-height: 23px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0 0 9px 16px;
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-top: 16px;
    position: relative;

    span{
        position: absolute; 
        display: block; 
        left: 15px; 
        top: 7px; 
        z-index: 1;
        color: #FFF;
        font: bold 19px "Lato";
    }
`;

const Input = styled.input`
    background: #252525;
    border: none;
    border-radius: 8px;
    width: 269px;
    height: 35px;
    font: 16px "Lato";
    padding-left: 24px;
    color: #FFF;
    display: block;

    ::placeholder{
        font-style: italic;
    }

    :focus{
        outline: 0;
    }
`;