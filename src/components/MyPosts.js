import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync } from '../helperFunctions/http/apiRequests';
import {useHistory} from 'react-router-dom';
import isValidUserState from '../helperFunctions/isValidUserState';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';

export default function MyPosts(){

  const [posts, setPosts] = useState([]);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  
  const { user } = useContext(UserContext);
  const history = useHistory();
  useEffect(()=>{
    if (!isValidUserState(user)) return;
    const [token, id] = [user.token, user.user.id];
    getUsersPostsAsync(id, token)
    .then(({data})=>{
      setPosts(data.posts);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response.status}`))
    .finally(() => setIsReadyToRender(true))
  },[user])

  if (!isValidUserState(user)){
    history.push("/")
  }
  
  return (
    <LayoutInterface pageTitle="my posts">
      {
        isReadyToRender 
        ? <Posts posts={posts}/>
        : <Loading />
      }
    </LayoutInterface>
  );
}