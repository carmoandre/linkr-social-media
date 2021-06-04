import ReactModal from "react-modal";
import styled from "styled-components";
import Modal from "react-modal"


ReactModal.defaultStyles.overlay.zIndex = 5;
Modal.setAppElement(document.querySelector(".root"));

export default function PreviewModal ({showModal, setShowModal, href}) {

    function closemodal () {
        setShowModal(false)
    }
    if(showModal) {
        return (
                <ModalDiv   isOpen={showModal}
                            onRequestClose={closemodal}>
                    <Button href={href} target="_blank">Open in a new tab</Button>
                    <Close onClick={closemodal}>x</Close>
                    <Iframe name="modalURL" src={href}/>
                </ModalDiv>
        )
    }
    else{
        return(<> </>)}
}

const ModalDiv = styled(ReactModal)`
    width: 70vw;
    height: 85vh;
    background: #333333;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 7vh;
    left: 15vw;
    position: relative;
    padding: 62px 20px 20px 20px;

    @media (max-width: 430px) {
        width: 100%;
        top: 0;
        left: 0;
        height: 100vh;
        border-radius: 0;
    }
`

const Button = styled.a`
    width: 138px;
    height: 31px;
    background: #1877F2;
    color: #fff;
    border-radius: 5px;
    border: none;
    font-family: lato, sans-serif;
    font-weight: 700;
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 23px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 430px) {
    }
`
const Close = styled.button`
    background: none;
    position: absolute;
    right: 20px;
    top: 15px;
    color: #fff;
    border: none;
    font-family: lato, sans-serif;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;

    @media (max-width: 430px) {
    }
`

const Iframe = styled.iframe `
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: white;

    @media (max-width: 430px) {
    }
    `
