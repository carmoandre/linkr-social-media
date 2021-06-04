import styled from "styled-components";
import axios from "axios";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import Caption from "./Caption";
import ArticlePreview from "./LinkContent/ArticlePreview";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import Modal from "react-modal";
import ReactModal from "react-modal";
import Likes from "./Likes";
import {
    StyledModal,
    ModalText,
    GoBackButton,
    ConfirmButton,
} from "./StyledModal";
import EmbeddedYoutube from "./LinkContent/EmbeddedYoutube";
import Comments from "./Comments";
import { MdLocationOn } from "react-icons/md";
import MapModal from "../../MapModal/MapModal";
var getYoutubeID = require("get-youtube-id");

ReactModal.defaultStyles.overlay.zIndex = 5;

Modal.setAppElement(document.querySelector(".root"));

export default function Post(props) {
    const { postID, originalPoster, likes, linkProps } = props;
    const [caption, setCaption] = useState(props.caption);
    const { post, posts, setPosts } = props;
    const { user, userFollows } = useContext(UserContext);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [onEdition, setOnEdition] = useState(false);
    const [editedText, setEditedText] = useState(caption);
    const permission = user.user.id === originalPoster.id;
    const [like, setLike] = useState(true);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [commentsList, setCommentsList] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [showModal, setShowModal] = useState(false);

    const likesProps = {
        like,
        user,
        postID,
        setLike,
        post,
        posts,
        setPosts,
        likes,
    };

    function toggleEdition() {
        onEdition ? setOnEdition(false) : setOnEdition(true);
        setEditedText(caption);
    }

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
            const indexOfPost = posts.indexOf(post);
            posts.splice(indexOfPost, 1);
            setPosts([...posts]);
        });

        request.catch((error) => {
            setDisabled(false);
            toggleModal();
            alert(
                "Não foi possível excluir o post. Tente novamente mais tarde."
            );
        });
    }

    function postComment() {
        if (newComment === "") {
            return;
        }
        const body = {
            text: newComment,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/comment`,
            body,
            config
        );

        request.then((response) => {
            setNewComment("");
            setCommentsList([
                ...commentsList,
                {
                    text: newComment,
                    user: {
                        id: user.user.id,
                        username: user.user.username,
                        avatar: user.user.avatar,
                    },
                },
            ]);
        });

        request.catch((error) => {
            alert(
                "Não foi possível publicar o comentário. Por favor, tente novamente mais tarde."
            );
        });
    }

    function checkFollow(authorID) {
        return userFollows.find((followed) => followed.id === authorID);
    }

    const youtubeID = getYoutubeID(linkProps.href);
    return (
        <>
            <CommentsWrapper>
                <PostWrapper>
                    <section className="post--avatarAndLikes">
                        <Link
                            className="avatarAndLikes--link"
                            to={`/user/${originalPoster.id}`}
                        >
                            <img
                                src={originalPoster.avatar}
                                alt={originalPoster.name}
                            />
                        </Link>

                        <Likes likesProps={likesProps} />
                        <Comments
                            postID={postID}
                            commentsVisible={commentsVisible}
                            setCommentsVisible={setCommentsVisible}
                            commentsList={commentsList}
                            setCommentsList={setCommentsList}
                        />
                    </section>
                    <section className="post--body">
                        <header>
                            <NameAndLocation>
                                <Link to={`/user/${originalPoster.id}`}>
                                    {originalPoster.name}
                                </Link>
                                {post.geolocation ? (
                                    <MdLocationOn
                                        onClick={() => setShowModal(true)}
                                    />
                                ) : (
                                    ""
                                )}
                                {post.geolocation && showModal ? (
                                    <MapModal
                                        opName={originalPoster.name}
                                        setShowModal={setShowModal}
                                        lat={Number(post.geolocation.latitude)}
                                        lng={Number(post.geolocation.longitude)}
                                    />
                                ) : (
                                    ""
                                )}
                            </NameAndLocation>
                            <EditAndEraseHolder permission={permission}>
                                <MdModeEdit
                                    onClick={toggleEdition}
                                    color="#white"
                                    size="16"
                                />
                                <MdDelete
                                    onClick={toggleModal}
                                    color="white"
                                    size="16"
                                />
                            </EditAndEraseHolder>
                        </header>
                        <Caption
                            caption={caption}
                            setCaption={setCaption}
                            onEdition={onEdition}
                            toggleEdition={toggleEdition}
                            editedText={editedText}
                            setEditedText={setEditedText}
                            postID={postID}
                        />
                        {youtubeID === null ? (
                            <ArticlePreview linkProps={linkProps} />
                        ) : (
                            <EmbeddedYoutube
                                postID={postID}
                                youtubeID={youtubeID}
                                linkProps={linkProps}
                            />
                        )}
                    </section>
                </PostWrapper>
                {commentsVisible &&
                    commentsList.map((comment) => (
                        <>
                            <PostCommentBox key={comment.id}>
                                <img
                                    src={comment.user.avatar}
                                    alt={comment.user.username}
                                />
                                <ReadCommentDiv>
                                    <strong>
                                        {comment.user.username}{" "}
                                        <span>
                                            {comment.user.id === originalPoster.id
                                                ? "• post’s author"
                                                : checkFollow(comment.user.id)
                                                ? "• following"
                                                : ""}
                                        </span>
                                    </strong>
                                    <p>{comment.text}</p>
                                </ReadCommentDiv>
                            </PostCommentBox>
                            <SeparatorLine />
                        </>
                    ))}
                {commentsVisible && (
                    <PostCommentBox>
                        <img src={user.user.avatar} alt={user.user.username} />
                        <InputDiv>
                            <input
                                type="text"
                                placeholder="write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <SendIcon onClick={postComment} />
                        </InputDiv>
                    </PostCommentBox>
                )}
            </CommentsWrapper>
            {modalIsOpen
                ?
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
                :""
            }
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

    svg {
        cursor: pointer;
    }

    width: 100%;
    display: flex;

    color: white;
    background-color: #171717;

    border-radius: 16px;
    padding: 18px;
    gap: 18px;

    @media (max-width: 430px) {
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
        width: 67px;

        .avatarAndLikes--link {
            margin-bottom: 19px;
        }

        img {
            object-fit: cover;
            overflow: hidden;
            border-radius: 50%;
            display: block;

            height: 50px;
            width: 50px;

            @media (max-width: 430px) {
                height: 40px;
                width: 40px;
                margin-bottom: 17px;
            }
        }

        p {
            font-size: 11px;
            line-height: 13px;

            @media (max-width: 430px) {
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
            @media (max-width: 430px) {
                font-size: 17px;
                line-height: 20px;
            }
        }
    }
`;

const NameAndLocation = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;

    a {
        display: inline-block;
        max-width: 230px;
        word-wrap: break-word;
    }

    svg {
        cursor: pointer;
    }
`;

const EditAndEraseHolder = styled.div`
    width: 40px;
    display: ${(props) => (props.permission ? "flex" : "none")};
    justify-content: space-between;
`;

const CommentsWrapper = styled.div`
    background: #1e1e1e;
    border-radius: 16px;
    margin-bottom: 25px;
`;

const PostCommentBox = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 25px;
    font-size: 14px;
    line-height: 17px;
    font-family: "Lato", sans-serif;

    img {
        object-fit: cover;
        overflow: hidden;
        border-radius: 50%;
        display: block;

        height: 39px;
        width: 39px;
        min-width: 39px;

        @media (max-width: 430px) {
            height: 30px;
            width: 30px;
            min-width: 30px;
        }
    }

    input {
        height: 39px;
        width: 100%;

        background: #252525;
        border-radius: 8px;
        border: none;
        font-family: "Lato", sans-serif;
        color: #acacac;
        padding-left: 15px;
    }

    input::placeholder {
        color: #575757;
    }

    strong {
        color: #f3f3f3;
    }

    span {
        color: #565656;
    }

    p {
        color: #acacac;
    }
`;

const SendIcon = styled(FiSend)`
    width: 20px;
    height: 20px;
    color: #f3f3f3;
    margin: 0 17px;
`;

const InputDiv = styled.div`
    width: 100%;
    background: #252525;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-left: 15px;
`;

const ReadCommentDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

const SeparatorLine = styled.div`
    margin: 0 25px;
    height: 1px;
    background-color: #353535;
`;
