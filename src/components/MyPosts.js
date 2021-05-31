import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync } from '../helperFunctions/http/apiRequests';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';
import InfiniteScroll from 'react-infinite-scroller';

export default function MyPosts(){

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[user]);

  return (
    <LayoutInterface pageTitle="my posts">
      <InfiniteScroll
        pageStart={0}
        loadMore={()=>myOlderPostsLoader(user.user.id, posts, setPosts, setHasMore)}
        hasMore={hasMore}
        loader={<Loading key="LoadingInfiniteScroll"/>}
      >
        <Posts posts={posts} setPosts={setPosts}/>
      </InfiniteScroll>
    </LayoutInterface>
  );
}

function myOlderPostsLoader(userID, posts, setPosts, setHasMore){
  const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
  const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
  getUsersPostsAsync(userID, query)
  .then(({data})=>{
    setPosts([...posts, ...data.posts]);
    if (data.posts.length < 10) setHasMore(false);
  })
  .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}