import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync } from '../helperFunctions/http/apiRequests';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

export default function MyPosts(){
  const { user, SetUserFollows } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const token = user.token;

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[user]);

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
    <LayoutInterface pageTitle="my posts">
      <InfiniteScroll
        pageStart={0}
        loadMore={()=>myOlderPostsLoader(token, user.user.id, posts, setPosts, setHasMore)}
        hasMore={hasMore}
        loader={<Loading key="LoadingInfiniteScroll"/>}
      >
        <Posts posts={posts} setPosts={setPosts}/>
      </InfiniteScroll>
    </LayoutInterface>
  );
}

function myOlderPostsLoader(token, userID, posts, setPosts, setHasMore){
  const query = posts.length === 0 ? "" : `?offset=${posts.length}`;
  getUsersPostsAsync(token, userID, query)
  .then(({data})=>{
    setPosts([...posts, ...data.posts]);
    if (data.posts.length < 10) setHasMore(false);
  })
  .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}