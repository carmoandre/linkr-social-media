import styled from "styled-components";
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { MdModeEdit, MdDelete } from "react-icons/md";
import Caption from "./Caption";
import ArticlePreview from "./LinkContent/ArticlePreview";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement(document.getElementById("root"));

export default function Post(props) {
    const { postID, originalPoster, caption, likes, linkProps } = props;
    const { user } = useContext(UserContext);
    const [permission, setPermission] = useState(false);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const subtitle = "teste de modal";

    setPermission(user.user.id === originalPoster.id);

    function toggleModal() {
        modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
    }

    function afterOpenModal() {
        console.log("efeito de abertura da modal");
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

        request.then((response) => {
            console.log(response.data);
        });

        request.catch((error) => {
            console.log(error);
        });
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
                    <IoHeartOutline color="white" size="20" />
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
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={toggleModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
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
