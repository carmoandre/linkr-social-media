import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React from "react";
import ReactTooltip from "react-tooltip";
import {useState} from 'react';
import {likePostAsync, dislikePostAsync} from '../../../helperFunctions/http/apiRequests';

export default function Likes({likesProps}){
  const { user } = likesProps;

  const [likes, setLikes] = useState(likesProps.likes);
  const [isLiked, setIsLikeD] = useState(isLikedByCurrentUser(likes, user));
  
  const toggleLike = () => toggleLikeAsync(likesProps, isLiked, setIsLikeD, setLikes);

  return (
    <>
    {isLiked 
      ? <IoHeartSharp onClick={toggleLike} color="red" size="20"/>
      : <IoHeartOutline onClick={toggleLike}  color="white" size="20" data-tip="sdgsdg"/>
    }
      <ReactTooltip place="bottom" type="light" effect="solid"/> 
      <p>{likes.length} likes</p>
    </>
  );
}

function isLikedByCurrentUser(likes, user){
  const idsOfLikes = likes.map(like=>like["user.id"]);
  return idsOfLikes.includes(user.user.id);
}

function toggleLikeAsync(likesProps , isLiked, setIsLikeD, setLikes){
  const { user, postID } = likesProps;
  const request = isLiked 
    ? dislikePostAsync(postID, user.token) 
    : likePostAsync(postID, user.token);

  request.then(response => {
    setIsLikeD(!isLiked);
    setLikes(response.data.post.likes);
  });
}
