import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import Loading from "./Loading";
import Posts from "./Posts/Posts";
import InfiniteScroll from 'react-infinite-scroller';
import {getUsersLikesAsync} from '../helperFunctions/http/apiRequests';

export default function MyLikes () {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useContext(UserContext);
    const token = user.token;

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[user]);

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
    const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
    const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
    getUsersLikesAsync(token, query)
    .then(({data})=>{
        setPosts([...posts, ...data.posts]);
        if (data.posts.length < 10) setHasMore(false);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}