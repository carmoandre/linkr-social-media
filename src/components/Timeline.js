import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import Message from "./Message";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import UserContext from "../contexts/UserContext";
import InfiniteScroll from 'react-infinite-scroller';
import Loading from './Loading';
import useInterval from "./UseInterval";

export default function Timeline() {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState([]);
    const [text, setText] = useState("");
    const [hasMore, setHasMore] = useState(true);
    
    const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

    useEffect(() => {
        window.scrollTo(0, 0);
        myFollows();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function myFollows(){
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows";
        axios
            .get(url, config)
            .then(({ data }) => {
                setFollows(data.users)
            })
    }

    function renderPosts() {
        const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
        const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
        const url =
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts${query}`;
        axios
            .get(url, config)
            .then(({ data }) => {
                if (follows.length===0 && data.posts.length===0){
                    setText("Você não segue ninguém ainda, procure por perfis na busca")
                } else if (data.posts.length===0) {
                    setText("Nenhuma publicação encontrada");
                }
                setPosts([...posts, ...data.posts]);
                if (data.posts.length < 10) setHasMore(false);
            })
            .catch(() => {
                setText("Ocorreu um erro. Tente novamente")
            });
    }

    function refreshPosts(){
        const newestID = posts.length === 0 ? "" : posts[0].id;
        const query = posts.length === 0 ? "" : `?earlierThan=${newestID}`;
        const url =
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts${query}`;
        axios
            .get(url, config)
            .then(({ data }) => {
                setPosts([...data.posts, ...posts]);
            });
    }

    useInterval(() => {
        refreshPosts();
      }, 15000);

    return (
        <LayoutInterface pageTitle="timeline">
            <>
                <PostCreatorBox posts={posts} setPosts={setPosts}/>
                {posts.length === 0 ? <Message text={text}/> : ""}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>renderPosts()}
                    hasMore={hasMore}
                    loader={<Loading key="LoadingInfiniteScroll"/>}
                >
                        <Posts posts={posts} setPosts={setPosts}/>
                </InfiniteScroll>
            </>
        </LayoutInterface>
    );
}