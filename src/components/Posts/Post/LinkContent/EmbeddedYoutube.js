import styled from "styled-components";

const myUrl = "https://www.youtube.com/embed/tgbNymZ7vqY";

export default function EmbeddedYoutube({ url }) {
  return (
    <YoutubeWrapper>
      <IFrameWrapper>
        <iframe src={myUrl} />
      </IFrameWrapper>
      <a href={myUrl}>{myUrl}</a>
    </YoutubeWrapper>
  );
}

const YoutubeWrapper = styled.article`
  a {
    color: #b7b7b7;
    text-decoration: none;
    display: inline-block;
    word-break: break-all;

    font-size: 17px;
    line-height: 20px;
    @media (max-width: 375px){
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const IFrameWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  margin-bottom: 5px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
