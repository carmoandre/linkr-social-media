import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import { useEffect, useState, useContext } from "react";
import Loading from "./Loading";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import {getFollowingPostsAsync} from '../helperFunctions/http/apiRequests';
import InfiniteScroll from 'react-infinite-scroller';
import UserContext from "../contexts/UserContext";

export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useContext(UserContext);
    const token = user.token;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [user]);

    return (
        <LayoutInterface pageTitle="timeline">
            <>
                <PostCreatorBox/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>followingOlderPostsLoader(token, posts, setPosts, setHasMore)}
                    hasMore={hasMore}
                    loader={<Loading key="LoadingInfiniteScroll"/>}
                >
                    <Posts posts={posts} setPosts={setPosts}/>
                </InfiniteScroll>
            </>
        </LayoutInterface>
    );
}

function followingOlderPostsLoader(token, posts, setPosts, setHasMore){
    const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
    const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
    getFollowingPostsAsync(token, query)
    .then(({data})=>{
        setPosts([...posts, ...data.posts]);
        if (data.posts.length < 10) setHasMore(false);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}