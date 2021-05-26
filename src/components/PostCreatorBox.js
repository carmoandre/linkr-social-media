import axios from "axios";
import styled from "styled-components";
//import { useContext, useState } from "react";
import { useState } from "react";
//import UserContext from "../contexts/UserContext";

export default function PostCreatorBox() {
    // const { user, setUser } = useContext(UserContext);
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Publish");
    /*************************
     * Abaixo constante temporária até que o componente seja integrado;
     ******************************************/
    const user = {
        token: "e5de92ce-3ab2-4b85-985f-f17d27ec7aaa",
        user: {
            avatar: "https://st.depositphotos.com/1766887/1279/i/600/depositphotos_12798739-stock-photo-egyptian-papyrus.jpg",
        },
    };
    //console.log(user);

    function publish(event) {
        event.preventDefault();
        const body = {
            text,
            link,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
            body,
            config
        );

        setDisabled(true);
        setButtonText("Publishing...");

        request.then((response) => {
            setLink("");
            setText("");
            setDisabled(false);
            setButtonText("Publish");
            //comando para atualizar lista de posts da timeline
            //tirar comentário quando a decisão de como essa função vai chegar
            // a esse componente for tomada
            //renderPosts();
        });

        request.catch((error) => {
            alert("Houve um erro ao publicar seu link");
            setDisabled(false);
            setButtonText("Publish");
        });
    }
    return (
        <FormHolder id="postForm" onSubmit={publish}>
            <UserRoundedIMG user={user} />
            <InputFields>
                <p>O que você tem pra favoritar hoje?</p>
                <LinkInput
                    type="url"
                    required
                    disabled={disabled}
                    placeholder="http://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <TextBox
                    form="postForm"
                    disabled={disabled}
                    placeholder="Muito irado esse link falando de #javascript"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <PublishButton disabled={disabled}>{buttonText}</PublishButton>
            </InputFields>
        </FormHolder>
    );
}

const FormHolder = styled.form`
    width: 100%;
    height: 209px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 16px 22px 16px 18px;
    display: flex;
    font-family: Lato;
    font-weight: 300;

    @media (max-width: 375px) {
        height: 164px;
        border-radius: 0;
        padding: 10px 15px 12px 15px;
    }
`;

const UserRoundedIMG = styled.img`
    width: 50px;
    height: 50px;
    background: url(${(props) => props.user.user.avatar});
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 27px;
    margin-right: 18px;

    @media (max-width: 375px) {
        display: none;
    }
`;

const InputFields = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > p {
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        margin: 6px 0 8px 0;
        color: #707070;
    }

    @media (max-width: 375px) {
        width: 100%;
        margin: 0;
        padding: 0;
        & > p {
            font-size: 17px;
            line-height: 20px;
            margin-top: 0;
            margin: 5px auto 7px auto;
        }
    }
`;

const LinkInput = styled.input`
    height: 30px;
    width: 100%;
    margin-bottom: 6px;
    background: #efefef;
    border: none;
    border-radius: 5px;
    font-family: Lato;
    font-weight: 300;
    padding-left: 13px;
`;

const TextBox = styled.textarea`
    height: 66px;
    border: none;
    background: #efefef;
    border-radius: 5px;
    font-family: Lato;
    font-weight: 300;
    padding-left: 12px;
    resize: none;

    @media (max-width: 375px) {
        height: 47px;
    }
`;

const PublishButton = styled.button`
    border: none;
    width: 112px;
    height: 31px;
    background: #1877f2;
    border-radius: 5px;
    color: #fff;
    font-family: Lato;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    margin: auto 0 0 auto;

    @media (max-width: 375px) {
        height: 22px;
    }
`;
