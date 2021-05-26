import Posts from './Posts/Posts';
import {useState, useEffect} from 'react';
import LayoutInterface from './LayoutInterface/LayoutInterface';
import { getUsersPostsAsync } from '../helperFunctions/http/apiRequests';
import {useHistory} from 'react-router-dom';
import isValidUserState from '../helperFunctions/isValidUserState';
import Loading from './Loading';

const mockUserState = {
  "token": "6a58d8fe-c3d4-4439-9f99-3cddf4f28430",
  "user": {
      "id": 7,
      "email": "teste@teste.com",
      "username": "teste",
      "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
  }
}

export default function MyPosts(){

  const [posts, setPosts] = useState([]);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const history = useHistory();
  useEffect(()=>{
    if (!isValidUserState(mockUserState)) return;
    const [token, id] = [mockUserState.token, mockUserState.user.id];
    getUsersPostsAsync(id, token)
    .then(({data})=>{
      setPosts(data.posts);
    })
    .catch((err) => alert(`Falha ao buscar posts erro ${err.response.status}`))
    .finally(() => setIsReadyToRender(true))
  },[])

  if (!isValidUserState(mockUserState)){
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