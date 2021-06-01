import axios from "axios";
import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import LocationOption from './LocationOption';

export default function PostCreatorBox(props) {
    const { posts, setPosts } = props;
    const { user } = useContext(UserContext);
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Publish");
    const [geolocation, setGeolocation] = useState(null);
    console.log(geolocation);

    function publish(event) {
        event.preventDefault();
        const body = {
            text,
            link,
        };
        if (geolocation !== null){
            body.geolocation = geolocation;
        }

        console.log(body);

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
            //handling race condition with future implementation of requests on a setInterval
            if(response.data.post.id > posts[0].id){
                console.log(response.data.post);
                setPosts([response.data.post, ...posts]);
            }
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
                <Footer>
                    <LocationOption geolocation={geolocation} setGeolocation={setGeolocation}/>
                    <PublishButton disabled={disabled}>{buttonText}</PublishButton>
                </Footer>
            </InputFields>
        </FormHolder>
    );
}

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
`;

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

    @media (max-width: 430px) {
        height: 164px;
        border-radius: 0;
        padding: 10px 15px 12px 15px;
    }
`;

const UserRoundedIMG = styled.img`
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    background: url(${(props) => props.user.user.avatar});
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 50%;

    @media (max-width: 430px) {
        display: none;
    }
`;

const InputFields = styled.div`
    width: 100%;
    height: 100%;
    margin-left: 18px;
    display: flex;
    flex-direction: column;

    & > p {
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        margin: 6px 0 8px 0;
        color: #707070;
    }

    @media (max-width: 430px) {
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

    @media (max-width: 430px) {
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
    cursor: pointer;

    @media (max-width: 430px) {
        height: 22px;
    }
`;
