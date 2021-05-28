import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import React from "react";
import ReactTooltip from "react-tooltip";
import {useState} from 'react';
import {likePostAsync, dislikePostAsync} from '../../../helperFunctions/http/apiRequests';

export default function Likes({likesProps}){
  const { user } = likesProps;

  const [likes, setLikes] = useState(likesProps.likes);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser(likes, user));
  const [isWaiting, setIsWaiting] = useState(false);
  const likeBuffer = [{
    data: {
      post : likes
    }
  }];

  const toggleLike = () => !isWaiting && toggleLikeAsync(likesProps, isLiked, setIsLiked, likes, setLikes, setIsWaiting, likeBuffer);
  
  ReactTooltip.rebuild();
  const tooltip = getTooltip(likes, user);

  return (
    <>
      {isLiked 
        ? <IoHeartSharp style={{userSelect: "none"}} onClick={toggleLike} color="red" size="20" />
        : <IoHeartOutline style={{userSelect: "none"}} onClick={toggleLike} color="white" size="20" />
      }
      <ReactTooltip place="bottom" type="light" effect="solid" />
      <p style={{cursor: "default"}} data-tip={tooltip}>{likes.length} likes</p>
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
    if (numberOfotherPeople === 1) tooltip = `${person1}, ${person2} e outra pessoa`;
    else tooltip = `${person1}, ${person2} e outras ${numberOfotherPeople} pessoas`;
  } else {
    tooltip += person1 ? person1 : "";
    tooltip += person2 ? ` e ${person2}` : "";
  }

  return tooltip;
}

function isLikedByCurrentUser(likes, user){
  const idsOfLikes = likes.map(like=>like["user.id"] || like.userId || like.id);
  return idsOfLikes.includes(user.user.id);
}

function toggleLikeAsync(likesProps , isLiked, setIsLiked, likes, setLikes, setIsWaiting, likeBuffer){
  function localToggle(){
    const userLike = {
      userId: user.user.id,
      username : user.user.username
    }

    setIsLiked(!isLiked);
    isLiked 
      ? setLikes(likes.filter(like=> (like["user.username"] || like.username) !== user.user.username))
      : setLikes([userLike, ...likes]);
  }

  function setLastValidResponse(){
    setIsWaiting(true);
    for (let i=likeBuffer.length-1; i>=0; i--){
      if (likeBuffer[i].hasOwnProperty("data")){
        const responseLikes = likeBuffer[i].data.post.likes;
        setIsLiked(isLikedByCurrentUser(responseLikes, user));
        setLikes(responseLikes);
        likeBuffer[0] = likeBuffer[i];
        break;
      }
    }
    likeBuffer.splice(1,likeBuffer.length);
    setIsWaiting(false);
  }
  
  const { user, postID } = likesProps;
  
  localToggle();

  const requestId = likeBuffer.length+1;
  likeBuffer[requestId] = false;
  const request = isLiked 
    ? dislikePostAsync(postID, user.token)
    : likePostAsync(postID, user.token);
  request.then(response => {
    likeBuffer[requestId] = response;
  })
  .catch(err=>{
    likeBuffer[requestId] = err;
  })
  .finally(()=>{
    if (likeBuffer.reduce((acc,elem)=>acc&&elem, true)){
      setLastValidResponse();
    }
  })
}
