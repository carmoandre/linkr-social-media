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
