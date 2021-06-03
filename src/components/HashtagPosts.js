import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import { useParams} from 'react-router-dom';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getHashtagPostsAsync } from '../helperFunctions/http/apiRequests';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';
import InfiniteScroll from 'react-infinite-scroller';

export default function MyPosts(){

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const {hashtag} = useParams();
  const { user } = useContext(UserContext);
  const token = user.token;

  useEffect(()=>{
    window.scrollTo(0, 0);
    setPosts([]);
    setHasMore(true);
  },[user, hashtag]);

  return (
    <LayoutInterface pageTitle={`#${hashtag}`}>
      <InfiniteScroll
        pageStart={0}
        loadMore={()=>hashtagOlderPostsLoader(token, hashtag, posts, setPosts, setHasMore)}
        hasMore={hasMore}
        loader={<Loading key="LoadingInfiniteScroll"/>}
      >
        <Posts posts={posts} setPosts={setPosts}/>
      </InfiniteScroll>
    </LayoutInterface>
  );
}

function hashtagOlderPostsLoader(token, hashtag, posts, setPosts, setHasMore){
  const query = posts.length === 0 ? "" : `?offset=${posts.length}`;
  getHashtagPostsAsync(token, hashtag, query)
  .then(({data})=>{
    setPosts([...posts, ...data.posts]);
    if (data.posts.length < 10) setHasMore(false);
  })
  .catch((err) => alert(`Falha ao buscar posts erro ${err.response && err.response.status}`))
}