import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function PostCreatorBox() {
    // const { user, setUser } = useContext(UserContext);
    /*************************
     * Abaixo atribuição temporária até que o componente seja integrado;
     ******************************************/
    const user = { avatar: "https://i.gifer.com/1KhG.gif" };
    console.log(user);
    return (
        <FormHolder id="postForm">
            <UserRoundedIMG user={user} />
            <InputFields>
                <p>O que você tem pra favoritar hoje?</p>
                <LinkInput type="url" placeholder="http://..." />
                <TextBox
                    form="postForm"
                    placeholder="Muito irado esse link falando de #javascript"
                />
                <PublishButton>Publicar</PublishButton>
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

    /*
    height: 164px;
    border-radius: none;
    padding: 10px 15px 12px 15px;
    */
`;

const UserRoundedIMG = styled.img`
    width: 50px;
    height: 50px;
    background: url(${(props) => props.user.avatar});
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 27px;
    margin-right: 18px;
    /*
    display: none
    */
`;

const InputFields = styled.div`
    width: 100%;
    height: 100%;
    background-color: pink;
    display: flex;
    flex-direction: column;

    & > p {
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        margin: 5px 0 7px 0;
        color: #707070;
    }

    /*
    width: 100%;
    margin: 0;
    padding: 0;
    & > p {
        font-size: 17px;
        line-height: 20px;
        margin-top: 0;
        margin: 5px auto 7px auto;
    }
    */
`;

const LinkInput = styled.input`
    height: 30px;
    width: 100%;
    margin-bottom: 5px;
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
    /*
    height: 47px;
    */
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
`;
