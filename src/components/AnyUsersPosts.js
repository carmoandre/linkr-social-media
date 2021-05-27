import Posts from './Posts/Posts';
import {useState, useEffect, useContext} from 'react';
import { useParams, useHistory} from 'react-router-dom';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync, getUserInfoAsync } from '../helperFunctions/http/apiRequests';
import isValidUserState from '../helperFunctions/isValidUserState';
import Loading from './Loading';
import UserContext from '../contexts/UserContext';

export default function AnyUsersPosts(){

  const [posts, setPosts] = useState([]);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const [targetUserName, setTargetUserName] = useState(null);

  const {id:targetId} = useParams();
  
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(()=>{
    if (!isValidUserState(user)) return;
    window.scrollTo(0, 0);
    const [token] = [user.token];
    const usersPostsAsync = getUsersPostsAsync(targetId, token)
    const usersInfoAsync = getUserInfoAsync(targetId, token)

    Promise.all([usersPostsAsync, usersInfoAsync])
    .then(([usersPosts, usersInfo])=>{
      setPosts(usersPosts.data.posts);
      setTargetUserName(usersInfo.data.user.username);
    })
    .catch((err)=>{
      alert(`Falha ao buscar posts erro ${err.response.status}`)
    })
    .finally(()=>{
      setIsReadyToRender(true);
    })
  },[user, targetId])

  if (!isValidUserState(user)){
    history.push("/");
  }
  
  const pageTitle = targetUserName !== null ? `${targetUserName}’s posts` : <>&nbsp;</>;
  return (
    <LayoutInterface pageTitle={pageTitle}>
      {
        isReadyToRender 
        ? <Posts posts={posts} setPosts={setPosts}/>
        : <Loading />
      }
    </LayoutInterface>
  );
}