import Posts from './Posts/Posts';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function MyPosts(){

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const token = "6a58d8fe-c3d4-4439-9f99-3cddf4f28430";
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts"
    const config = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .get(url, config)
      .then(({data})=>setPosts(data.posts))
      .catch((err)=> console.log(err));
  },[])

  return (
    <>
      {
        posts.length === 0 
        ? ""
        : <Posts posts={posts}/>
      }

    </>
  );
}