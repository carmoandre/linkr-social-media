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
import ReactModal from "react-modal";

Modal.setAppElement(document.querySelector(".root"));

export default function Post(props) {
    const { postID, renderPosts, originalPoster, caption, likes, linkProps } =
        props;
    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const permission = user.user.id === originalPoster.id;

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

const StyledModal = styled(ReactModal)`
    top: 50vh;
    left: 50vw;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 597px;
    height: 262px;
    background: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0 110px 0 110px;

    div {
        display: flex;
    }

    @media (max-width: 375px) {
        width: 350px;
        height: 170px;
        padding: 0 30px 0 30px;
    }
`;

const ModalText = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #ffffff;
    margin-bottom: 40px;

    @media (max-width: 375px) {
        margin-left: 5px;
        margin-bottom: 30px;
        line-height: 30px;
        font-size: 20px;
        padding: 0 35px 0 35px;
    }
`;

const GoBackButton = styled.button`
    width: 134px;
    height: 37px;
    background: #ffffff;
    color: #1877f2;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    margin-right: 27px;

    @media (max-width: 375px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877f2;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;

    @media (max-width: 375px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;
