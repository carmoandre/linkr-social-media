import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import UserContext from "../contexts/UserContext";

export default function Timeline() {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState(false);
    const [follows, setFollows] = useState([]);
    const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

    useEffect(() => {
        window.scrollTo(0, 0);
        myFollows();
        renderPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function myFollows(){
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows";
        axios
            .get(url, config)
            .then(({ data }) => {
                setFollows(data)
            })
    }

    function renderPosts() {
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts";
        axios
            .get(url, config)
            .then(({ data }) => {
                if (follows.length===0){
                    alert("Você não segue ninguém ainda, procure por perfis na busca")
                } else if (data.posts.length===0) {
                    alert("Nenhuma publicação encontrada");
                } else {
                    setPosts(data.posts);
                }
            })
            .catch(() => {
                alert("Ocorreu um erro. Tente novamente")
            });
    }

    return (
        <LayoutInterface pageTitle="timeline">
            <>
                <PostCreatorBox renderPosts={renderPosts} />
                {posts === false ? (
                    ""
                ) : (
                    <Posts posts={posts} setPosts={setPosts}/>
                )}
            </>
        </LayoutInterface>
    );
}