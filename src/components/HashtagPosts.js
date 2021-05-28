import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import { useParams, useHistory} from 'react-router-dom';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getHashtagPostsAsync } from '../helperFunctions/http/apiRequests';
import isValidUserState from '../helperFunctions/isValidUserState';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';

export default function AnyUsersPosts(){

  const [posts, setPosts] = useState([]);
  const [isReadyToRender, setIsReadyToRender] = useState(false);

  const {hashtag} = useParams();
  
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(()=>{
    if (!isValidUserState(user)) return;
    window.scrollTo(0, 0);
    const [token] = [user.token];

    getHashtagPostsAsync(hashtag, token)
    .then(({data})=>{
      setPosts(data.posts);
    })
    .catch((err)=>{
      alert(`Falha ao buscar posts erro ${err.response.status}`)
    })
    .finally(()=>{
      setIsReadyToRender(true);
    })

  },[user, hashtag])

  if (!isValidUserState(user)){
    history.push("/");
  }
  
  return (
    <LayoutInterface pageTitle={`#${hashtag}`}>
      {
        isReadyToRender 
        ? <Posts posts={posts} setPosts={setPosts}/>
        : <Loading />
      }
    </LayoutInterface>
  );
}