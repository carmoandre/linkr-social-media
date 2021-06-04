import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import Loading from "./Loading";
import Posts from "./Posts/Posts";
import InfiniteScroll from 'react-infinite-scroller';
import {getUsersLikesAsync} from '../helperFunctions/http/apiRequests';
import axios from 'axios';

export default function MyLikes () {
    const { user, SetUserFollows } = useContext(UserContext);

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const token = user.token;

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const url =
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows";
        axios.get(url, config).then(({ data }) => {
            SetUserFollows(data.users);
        });
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
    <LayoutInterface pageTitle="my likes">
        <InfiniteScroll
            pageStart={0}
            loadMore={()=>myOlderLikesPostsLoader(token, posts, setPosts, setHasMore)}
            hasMore={hasMore}
            loader={<Loading key="LoadingInfiniteScroll"/>}
        >
        <Posts posts={posts} setPosts={setPosts}/>
        </InfiniteScroll>
    </LayoutInterface>
    );
}

function myOlderLikesPostsLoader(token, posts, setPosts, setHasMore){
    const query = posts.length === 0 ? "" : `?offset=${posts.length}`;
    getUsersLikesAsync(token, query)
    .then(({data})=>{
        setPosts([...posts, ...data.posts]);
        if (data.posts.length < 10) setHasMore(false);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}