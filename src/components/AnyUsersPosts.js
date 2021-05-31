import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import { useParams} from 'react-router-dom';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync, getUserInfoAsync } from '../helperFunctions/http/apiRequests';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroller';
import UserContext from "../contexts/UserContext";

export default function AnyUsersPosts(){

  const [posts, setPosts] = useState([]);
  const [targetUserName, setTargetUserName] = useState(null);
  const {id:targetId} = useParams();
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);
  const token = user.token;

  const pageTitle = targetUserName !== null ? `${targetUserName}’s posts` : <>&nbsp;</>;

  useEffect(()=>{
    window.scrollTo(0, 0);
    getUserInfoAsync(token, targetId)
    .then(({data})=>setTargetUserName(data.user.username))
    .catch((err)=>alert(`Falha ao buscar posts erro ${err.response.status}`))
  },[user, targetId]);

  return (
    <LayoutInterface pageTitle={pageTitle}>
      <InfiniteScroll
        pageStart={0}
        loadMore={()=>userOlderPostsLoader(token, targetId, posts, setPosts, setHasMore)}
        hasMore={hasMore}
        loader={<Loading key="LoadingInfiniteScroll"/>}
      >
        <Posts posts={posts} setPosts={setPosts}/>
      </InfiniteScroll>
    </LayoutInterface>
  );
}

function userOlderPostsLoader(token, userID, posts, setPosts, setHasMore){
  const oldestID = posts.length === 0 ? "" : posts[posts.length-1].id;
  const query = posts.length === 0 ? "" : `?olderThan=${oldestID}`;
  getUsersPostsAsync(token, userID, query)
  .then(({data})=>{
    setPosts([...posts, ...data.posts]);
    if (data.posts.length < 10) setHasMore(false);
  })
  .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}