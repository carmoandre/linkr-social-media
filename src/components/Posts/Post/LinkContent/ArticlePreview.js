import styled from "styled-components";

export default function ArticlePreview({ linkProps }) {
  const { href, title, description, srcImage } = linkProps;

  return (
    <PreviewWrapper>
      <ul className="preview--textList">
        <li className="textList--title">{title}</li>
        <li className="textList--description">{description}</li>
        <li className="textList--domain">
          <a className="domain--link" href={href}>
            {href}
          </a>
        </li>
      </ul>

      <picture>
        <a href={href}><img src={srcImage} alt={title} /></a>
      </picture>
    </PreviewWrapper>
  );
}

const PreviewWrapper = styled.article`
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
      color: #cecece;
      @media (max-width: 375px) {
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 4px;
      }
    }

    .textList--description {
      color: #9b9595;

      margin-bottom: 13px;
      font-size: 11px;
      line-height: 13px;
      @media (max-width: 375px) {
        font-size: 9px;
        line-height: 11px;
        margin-bottom: 4px;
      }
    }

    .textList--domain {
      color: #cecece;

      font-size: 11px;
      line-height: 13px;
      @media (max-width: 375px) {
        font-size: 9px;
        line-height: 11px;
      }

      .domain--link {
        word-break: break-all;
      }
    }
  }
`;
