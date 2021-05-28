import axios from 'axios';
import axiosConfig from './axiosConfig';

export function getHashtagPostsAsync(hashtag, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function getUsersPostsAsync(id, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function getUserInfoAsync(id, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function likePostAsync(id, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`;
  const config = axiosConfig(token);
  return axios.post(url, {}, config);
}

export function dislikePostAsync(id, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`;
  const config = axiosConfig(token);
  return axios.post(url, {}, config);
}


// function likePost(props , like, setLike, setLikes){

//   const { user, postID } = props;

//   const config = {
//   headers:{
//       Authorization: `Bearer ${user.token}`
//       }
//   }
  
//   let request;

//   if (like){
//     request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/dislike`, {}, config)
//   } else{
//     request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/like`, {}, config)
//   }

//   request.then(response => {
//     setLike(!like);
//     setLikes(response.data.post.likes);
//   })
// }