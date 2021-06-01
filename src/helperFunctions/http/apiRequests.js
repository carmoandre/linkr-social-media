import axios from 'axios';
import axiosConfig from './axiosConfig';

export function getHashtagPostsAsync(token, hashtag, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts${query}`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function getFollowingPostsAsync(token, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts${query}`;
  const config = axiosConfig(token);
  return axios.get(url, config);
}

export function getUsersPostsAsync(token, userID, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userID}/posts${query}`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function getUsersLikesAsync(token, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked${query}`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function getUserInfoAsync(token, userID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userID}`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

export function likePostAsync(token, postID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/like`;
  const config = axiosConfig(token);
  return axios.post(url, {}, config);
}

export function dislikePostAsync(token, postID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/dislike`;
  const config = axiosConfig(token);
  return axios.post(url, {}, config);
}
