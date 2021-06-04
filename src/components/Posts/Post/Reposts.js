import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import {
    StyledModal,
    ModalText,
    GoBackButton,
    ConfirmButton,
} from "./StyledModal";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import axios from "axios";

export default function Reposts(props){
    const { posts } = props;
    const { user } = useContext(UserContext);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    
    function toggleModal() {
        modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
    }
    
    function repost(){
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const body = {};
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/ID_DO_POST/share`
        
        axios
            .get(url, body, config)
    }

    return (
        <>
            <MenuWrapper>
                <RepostIcon onClick={toggleModal}></RepostIcon>
                <p>re-pos</p>
            </MenuWrapper>
            <StyledModal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                contentLabel="Erase Modal"
            >
                <ModalText>
                    {disabled
                        ? ""
                        : `Do you want to re-post this link?`}
                </ModalText>
                <div>
                    <GoBackButton disabled={disabled} onClick={toggleModal}>
                        No, cancel
                    </GoBackButton>
                    <ConfirmButton disabled={disabled} onclick={repost}>
                        Yes, share!
                    </ConfirmButton>
                </div>
            </StyledModal>
        </>
    );
}

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

const RepostIcon = styled(BiRepost)`
    width: 22px;
    height: 22px;
`;