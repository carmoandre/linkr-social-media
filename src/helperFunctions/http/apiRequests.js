import axios from 'axios';
import axiosConfig from './axiosConfig';

export function getHashtagPostsAsync(hashtag, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts${query}`;
  const config = axiosConfig();
  return axios.get(url,config);
}

export function getFollowingPostsAsync(query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts${query}`;
  const config = axiosConfig();
  return axios.get(url, config);
}

export function getUsersPostsAsync(userID, query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userID}/posts${query}`;
  const config = axiosConfig();
  return axios.get(url,config);
}

export function getUsersLikesAsync(query){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked${query}`;
  const config = axiosConfig();
  return axios.get(url,config);
}

export function getUserInfoAsync(userID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userID}`;
  const config = axiosConfig();
  return axios.get(url,config);
}

export function likePostAsync(postID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/like`;
  const config = axiosConfig();
  return axios.post(url, {}, config);
}

export function dislikePostAsync(postID){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/dislike`;
  const config = axiosConfig();
  return axios.post(url, {}, config);
}
