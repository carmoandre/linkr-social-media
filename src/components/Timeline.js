import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import UserContext from "../contexts/UserContext";

export default function Timeline(){
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState(false);
    
    useEffect(() => {
        renderPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function renderPosts(){
        const token = user.token;
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts";
        const config = {
            headers:{
            Authorization: `Bearer ${token}`
            }
        }
        axios
            .get(url, config)
            .then(({data})=>{
            if (data.length===0){
                alert("Nenhum post encontrado");
            }else{
                setPosts(data.posts);
            }
            })
            .catch(() => alert("Houve uma falha ao obter os posts. Por favor, atualize a página"));
    }

    return(
        <LayoutInterface pageTitle="timeline">
            <>
                <PostCreatorBox renderPosts={renderPosts}/>
                {posts===false ? <Loading /> : <Posts posts={posts} />}
            </>
        </LayoutInterface>
    );
}