import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React from "react";
import ReactTooltip from "react-tooltip";
import {useState} from 'react';
import {likePostAsync, dislikePostAsync} from '../../../helperFunctions/http/apiRequests';

export default function Likes({likesProps}){
  const { user , posts, setPosts} = likesProps;

  const [likes, setLikes] = useState(likesProps.likes);
  const [isLiked, setIsLikeD] = useState(isLikedByCurrentUser(likes, user));
  
  const toggleLike = () => toggleLikeAsync(likesProps, isLiked, setIsLikeD, likes, setLikes, posts, setPosts);
  
  const tooltip = getTooltip(likes, user);

  return (
    <>
      {isLiked 
        ? <>
            <IoHeartSharp onClick={toggleLike} color="red" size="20" data-tip={tooltip} />
            <ReactTooltip  place="bottom" type="light" effect="solid" />
          </>
        : 
          <>
            <IoHeartOutline onClick={toggleLike} color="white" size="20" data-tip={tooltip} />
            <ReactTooltip  place="bottom" type="light" effect="solid" />
          </>
      }

      <p>{likes.length} likes</p>
    </>
  );
}

function getTooltip(likes, user){
  const whoLikedList = likes.map((like) => like["user.username"] || like.username);

  const orderedWhoLikedList = !isLikedByCurrentUser(likes, user)
    ? whoLikedList
    : ["Você", ...whoLikedList.filter(username=>username !== user.user.username)];

  let tooltip = "";
  const person1 = orderedWhoLikedList[0];
  const person2 = orderedWhoLikedList[1];
  const numberOfotherPeople = orderedWhoLikedList.slice(2,).length;

  if (numberOfotherPeople > 0){
    tooltip = `${person1}, ${person2} e outras ${numberOfotherPeople} pessoas`;
  } else {
    tooltip += person1 ? person1 : "";
    tooltip += person2 ? ` e ${person2}` : "";
  }

  return tooltip;
}

function isLikedByCurrentUser(likes, user){
  const idsOfLikes = likes.map(like=>like["user.id"]);
  return idsOfLikes.includes(user.user.id);
}

function toggleLikeAsync(likesProps , isLiked, setIsLikeD, likes, setLikes, posts, setPosts){
  const { user, postID } = likesProps;
  const request = isLiked 
    ? dislikePostAsync(postID, user.token) 
    : likePostAsync(postID, user.token);

  request.then(response => {
    setIsLikeD(!isLiked);
    setLikes([...likes]);
    setPosts([...posts]);
  });
}
