import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import { useParams} from 'react-router-dom';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync, getUserInfoAsync } from '../helperFunctions/http/apiRequests';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroller';
import UserContext from "../contexts/UserContext";
import axios from 'axios';

export default function AnyUsersPosts(){
  const { user, SetUserFollows } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [targetUserName, setTargetUserName] = useState(null);
  const {id:targetId} = useParams();
  const [hasMore, setHasMore] = useState(true);
  const token = user.token;

  const pageTitle = targetUserName !== null ? `${targetUserName}’s posts` : <>&nbsp;</>;

  useEffect(()=>{
    window.scrollTo(0, 0);
    setPosts([]);
    setHasMore(true);
    getUserInfoAsync(token, targetId)
    .then(({data})=>setTargetUserName(data.user.username))
    .catch((err)=>alert(`Falha ao buscar posts erro ${err.response.status}`))
  },[token, targetId]);

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
  const query = posts.length === 0 ? "" : `?offset=${posts.length}`;
  getUsersPostsAsync(token, userID, query)
  .then(({data})=>{
    setPosts([...posts, ...data.posts]);
    if (data.posts.length < 10) setHasMore(false);
  })
  .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}