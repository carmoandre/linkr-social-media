import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import TextareaAutosize from "react-textarea-autosize";

export default function Caption(props) {
    const {
        caption,
        onEdition,
        toggleEdition,
        editedText,
        setEditedText,
        postID,
    } = props;
    const { user } = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);
    const [editableCaption, setEditableCaption] = useState(caption);
    const inputRef = useRef(null);

    function handleKeyDown(event) {
        if (event.key === "Escape") {
            toggleEdition();
        }
        if (event.key === "Enter") {
            postEdition();
        }
    }
    useEffect(() => {
        if (onEdition) {
            inputRef.current.focus();
        }
    }, [onEdition]);

    function postEdition() {
        const body = {
            text: editedText,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.put(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postID}`,
            body,
            config
        );

        setDisabled(true);

        request.then((response) => {
            setDisabled(false);
            setEditableCaption(editedText);
            toggleEdition();
        });

        request.catch((error) => {
            alert("Não foi possível salvar as alterações.");
            setDisabled(false);
        });
    }

    function CaptionFragment({ fragment }) {
        return /^#[áàâãéèêíïóôõöúçña-z0-9]+$/i.test(fragment) ? (
            <Link
                className="caption--link-hashtag"
                to={`/hashtag/${fragment.slice(1)}`}
            >
                {fragment}
            </Link>
        ) : (
            fragment
        );
    }

    const fragmentList =
        typeof editableCaption === "string"
            ? editableCaption.split(
                  /((?<=[\s\n])#[áàâãéèêíïóôõöúçña-z0-9]+(?=[\s\n])|(?<=[\s\n])#[áàâãéèêíïóôõöúçña-z0-9]+$|^#[áàâãéèêíïóôõöúçña-z0-9]+(?=[\s\n])|^#[áàâãéèêíïóôõöúçña-z0-9]+$)/i
              )
            : [];

    return (
        <CaptionWrapper>
            {onEdition ? (
                <EditionField
                    ref={inputRef}
                    disabled={disabled}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            ) : (
                fragmentList.map((fragment, i) => (
                    <CaptionFragment key={i} fragment={fragment} />
                ))
            )}
        </CaptionWrapper>
    );
}

const CaptionWrapper = styled.p`
    color: #b7b7b7;
    margin-bottom: 13px;
    word-break: break-word;

    font-size: 17px;
    line-height: 20px;
    @media (max-width: 375px) {
        font-size: 15px;
        line-height: 18px;
    }

    .caption--link-hashtag {
        font-weight: bold;
        color: white;
        text-decoration: none;
    }
`;

const EditionField = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    background: #efefef;
    border-radius: 5px;
    font-family: Lato;
    font-weight: 300;
    padding: 12px;
    resize: none;
`;
