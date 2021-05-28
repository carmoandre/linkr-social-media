import styled from "styled-components";
import axios from "axios";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Caption from "./Caption";
import ArticlePreview from "./LinkContent/ArticlePreview";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import ReactTooltip from "react-tooltip";
import UserContext from "../../../contexts/UserContext";
import Modal from "react-modal";
import ReactModal from "react-modal";
import {
    StyledModal,
    ModalText,
    GoBackButton,
    ConfirmButton,
} from "./StyledModal";

ReactModal.defaultStyles.overlay.zIndex = 5;

Modal.setAppElement(document.querySelector(".root"));

export default function Post(props) {
    const { postID, renderPosts, originalPoster, caption, likes, linkProps } =
        props;
    const {post, posts, setPosts} = props;
    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const permission = user.user.id === originalPoster.id;
    const [like, setLike] = useState(true);

    console.log(post.likes)

    function toggleModal() {
        modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
    }

    function erase() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}`,
            config
        );

        setDisabled(true);

        request.then((response) => {
            setDisabled(false);
            toggleModal();
            renderPosts();
        });

        request.catch((error) => {
            setDisabled(false);
            toggleModal();
            alert(
                "Não foi possível excluir o post. Tente novamente mais tarde."
            );
        });
    }


    function likePost(){
        const config = {
        headers:{
            Authorization: `Bearer ${user.token}`
            }
        }
        
        let request;
        
        if (like){
          request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/like`, {}, config)
          setLike(false)
        } else{
          request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/dislike`, {}, config)
          setLike(true)
        }
    
        request.then(response => {
          post.likes = response.data.post.likes;
          setPosts([...posts]);
        })
    }
        
    function text(){
        if (post.likes.length=0){
            return "";
        } else if (post.likes.length=1){
            return `${posts[postID].likes[0]["user.username"]} curtiu`;
        } else if (post.likes.length=2){
            return `${posts[postID].likes[0]["user.username"]} e mais 1 pessoa`;
        } else{
            return `${posts[postID].likes[0]["user.username"]} e mais ${post.likes.length-1} pessoas`;
        }
    }

    return (
        <>
            <PostWrapper>
                <section className="post--avatarAndLikes">
                    <Link to={`/user/${originalPoster.id}`}>
                        <img
                            src={originalPoster.avatar}
                            alt={originalPoster.name}
                        />
                    </Link>
                    {
                        like 
                        ? <IoHeartOutline onClick={likePost} color="white" size="20" data-tip="sdgsdg"/> 
                        : <IoHeartSharp onClick={likePost} color="red" size="20"/>
                    }
                    <ReactTooltip place="bottom" type="light" effect="solid"/> 
                    <p>{likes.length} likes</p>
                </section>
                <section className="post--body">
                    <header>
                        <Link to={`/user/${originalPoster.id}`}>
                            {originalPoster.name}
                        </Link>
                        <EditAndEraseHolder permission={permission}>
                            <MdModeEdit color="#white" size="16" />
                            <MdDelete
                                onClick={toggleModal}
                                color="white"
                                size="16"
                            />
                        </EditAndEraseHolder>
                    </header>
                    <Caption caption={caption} />
                    <ArticlePreview linkProps={linkProps} />
                </section>
            </PostWrapper>
            <StyledModal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                contentLabel="Erase Modal"
            >
                <ModalText>
                    {disabled
                        ? "Excluindo..."
                        : `Tem certeza que deseja excluir essa publicação?`}
                </ModalText>
                <div>
                    <GoBackButton disabled={disabled} onClick={toggleModal}>
                        Não, voltar
                    </GoBackButton>
                    <ConfirmButton disabled={disabled} onClick={erase}>
                        Sim, excluir
                    </ConfirmButton>
                </div>
            </StyledModal>
        </>
    );
}

const PostWrapper = styled.li`
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    font-family: "Lato", sans-serif;

    width: 100%;
    display: flex;

    color: white;
    background-color: #171717;

    border-radius: 16px;
    padding: 18px;
    gap: 18px;

    @media (max-width: 375px) {
        border-radius: 0;
        padding: 15px;
        gap: 14px;
    }

    .post--avatarAndLikes {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
        flex-grow: 0;
        flex-shrink: 0;

        width: 50px;
        @media (max-width: 375px) {
            width: 40px;
        }

        img {
            object-fit: cover;
            overflow: hidden;
            border-radius: 50%;
            display: block;

            height: 50px;
            width: 50px;
            margin-bottom: 19px;

            @media (max-width: 375px) {
                height: 40px;
                width: 40px;
                margin-bottom: 17px;
            }
        }

        p {
            font-size: 11px;
            line-height: 13px;

            @media (max-width: 375px) {
                font-size: 9px;
                line-height: 11px;
            }
        }
    }

    .post--body {
        flex-shrink: 1;
        flex-grow: 1;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 7px;

            font-size: 19px;
            line-height: 23px;
            @media (max-width: 375px) {
                font-size: 17px;
                line-height: 20px;
            }
        }
    }
`;

const EditAndEraseHolder = styled.div`
    width: 40px;
    display: ${(props) => (props.permission ? "flex" : "none")};
    justify-content: space-between;
`;
