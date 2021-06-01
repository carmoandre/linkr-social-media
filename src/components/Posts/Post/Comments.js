import axios from "axios";
import styled from "styled-components";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";

export default function Comments({
    postID,
    commentsVisible,
    setCommentsVisible,
}) {
    const { user } = useContext(UserContext);
    const [commentsList, setCommentsList] = useState(0);

    useEffect(() => {
        getComments();
    }, []);

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
            console.log(response.data);
            setCommentsList(response.data.comments);
        });
        request.catch((error) => {
            console.log(error);
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
            <p>{commentsList ? commentsList.length : "X"} comments</p>
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
