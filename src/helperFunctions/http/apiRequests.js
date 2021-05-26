import axios from 'axios';
import axiosConfig from './axiosConfig';

export function getHashtagPosts(hashtag, token){
  const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`;
  const config = axiosConfig(token);
  return axios.get(url,config);
}

