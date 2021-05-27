import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Caption({ caption }) {

  function CaptionFragment({ fragment }) {
    return /^#[áàâãéèêíïóôõöúçña-z0-9]+$/i.test(fragment) ? (
      <Link className="caption--link-hashtag" to={`/hashtag/${fragment.slice(1,)}`}>
        {fragment}
      </Link>
    ) : (
      fragment
    );
  }

  const fragmentList =
    typeof caption === "string" ? caption.split(/((?<=[\s\n])#[áàâãéèêíïóôõöúçña-z0-9]+(?=[\s\n])|(?<=[\s\n])#[áàâãéèêíïóôõöúçña-z0-9]+$|^#[áàâãéèêíïóôõöúçña-z0-9]+(?=[\s\n])|^#[áàâãéèêíïóôõöúçña-z0-9]+$)/i) : [];

  console.log(fragmentList);
  return (
    <CaptionWrapper>
      {fragmentList.map((fragment, i) => (
        <CaptionFragment key={i} fragment={fragment} />
      ))}
    </CaptionWrapper>
  );
}

const CaptionWrapper = styled.p`

  color: #b7b7b7;
  margin-bottom: 13px;
  word-break: break-word;

  font-size: 17px;
  line-height: 20px;
  @media (max-width: 375px){
    font-size: 15px;
    line-height: 18px;
  }

  .caption--link-hashtag {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
`;
