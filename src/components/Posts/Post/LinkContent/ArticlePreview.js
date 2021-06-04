import { useState } from "react";
import styled from "styled-components";
import PreviewModal from "./PreviewModal";


export default function ArticlePreview({ linkProps }) {
  const { href, title, description, srcImage } = linkProps;
  const [showModal, setShowModal] = useState(false)


  function openModal () {
    setShowModal(prev => !prev);
  }

  return (
    <>
    <PreviewWrapper onClick={openModal}>
      <ul className="preview--textList">
        <li className="textList--title">{title}</li>
        <li className="textList--description">{description}</li>
        <li className="textList--domain">{href}</li>
      </ul>

      <picture>
        <img src={srcImage} alt={title} />
      </picture>
    </PreviewWrapper>
    <PreviewModal showModal={showModal} setShowModal={setShowModal} href={href}/>
    </>
  );
}

const PreviewWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  picture {
    width: 30%;
    height: auto;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .preview--textList {
    padding: 20px;
    width: 70%;

    .textList--title {
      margin-bottom: 5px;
      font-size: 16px;
      line-height: 19px;
      word-break: break-word;
      color: #cecece;
      @media (max-width: 430px) {
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 4px;
      }
    }

    .textList--description {
      color: #9b9595;
      word-break: break-word;
      margin-bottom: 13px;
      font-size: 11px;
      line-height: 13px;
      @media (max-width: 430px) {
        font-size: 9px;
        line-height: 11px;
        margin-bottom: 4px;
      }
    }

    .textList--domain {
      color: #cecece;
      word-break: break-all;
      font-size: 11px;
      line-height: 13px;
      @media (max-width: 430px) {
        font-size: 9px;
        line-height: 11px;
      }
    }
  }
`;
