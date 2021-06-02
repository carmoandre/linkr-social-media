import axios from "axios";
import styled from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";

export default function Comments(props) {
    const {
        postID,
        commentsVisible,
        setCommentsVisible,
        commentsList,
        setCommentsList,
    } = props;
    const { user } = useContext(UserContext);

    useEffect(() => {
        getComments();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function getComments() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}/comments`,
            config
        );

        request.then((response) => {
            setCommentsList(response.data.comments);
        });
        request.catch((error) => {
            alert(
                "Comentários não carregados. Por favor, tente novamente mais tarde."
            );
        });
    }

    function toggleComments() {
        commentsVisible ? setCommentsVisible(false) : setCommentsVisible(true);
    }

    return (
        <MenuWrapper>
            <ChatOutline onClick={toggleComments} />
            <p>{commentsList ? commentsList.length : 0} comments</p>
        </MenuWrapper>
    );
}

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

const ChatOutline = styled(IoChatbubblesOutline)`
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
`;
