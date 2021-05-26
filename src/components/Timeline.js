import Header from "./Header";
import PostsColumn from "./PostsColumn";
import Trending from "./Trending";
import styled from "styled-components"
import { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";

export default function Timeline(){
    // const { user, setUser } = useContext(UserContext);
    const [showPosts, setShowPosts] = useState(true);
    
    useEffect(() => {
        renderPosts();
    }, []);
    
    function renderPosts(){

        const config = {
            headers: {
                // Authorization: `Bearer ${user.token}`,
            },
        };

    //     const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);
    //     request.then(response => {
    //         const res = response.data;
    //         if (res.length===0){
    //             alert("Nenhum post encontrado");
    //         }else{
    //             setShowPosts(res);
    //         }
    //     })
    //     request.catch(error => {
    //         alert("Houve uma falha ao obter os posts. Por favor, atualize a página")
    //     })
}
    

    return(
        <Main>
            <Header />
            <Title>timeline</Title>
            <Content>
                {showPosts===false ? <Loading /> : <PostsColumn />}
                <Trending />
            </Content>
        </Main>
    );
}

const Main = styled.div`
    background: #333333;
    width: 100%;
    height: 100%;
    min-height: 100vh;
`;

const Title = styled.div`
    width: 937px;
    color: #FFF;
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    padding-top: 125px;
    margin: 0 auto 0 auto;
`;

const Content = styled.div`
    width: 937px;
    height: 100%;
    margin: 43px auto 0 auto;
    display: flex;
`;