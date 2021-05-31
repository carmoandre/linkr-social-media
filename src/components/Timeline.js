import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import {getFollowingPostsAsync} from '../helperFunctions/http/apiRequests';
import InfiniteScroll from 'react-infinite-scroller';

export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LayoutInterface pageTitle="my posts">
            <>
                <PostCreatorBox/>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={()=>followingOlderPostsLoader(posts, setPosts, setHasMore)}
                    hasMore={hasMore}
                    loader={<Loading key="LoadingInfiniteScroll"/>}
                >
                    <Posts posts={posts} setPosts={setPosts}/>
                </InfiniteScroll>
            </>
        </LayoutInterface>
    );
}

function followingOlderPostsLoader(posts, setPosts, setHasMore){
    const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
    const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
    getFollowingPostsAsync(query)
    .then(({data})=>{
        setPosts([...posts, ...data.posts]);
        if (data.posts.length < 10) setHasMore(false);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}