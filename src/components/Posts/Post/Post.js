import styled from "styled-components";
import { IoHeartOutline } from "react-icons/io5";
import Caption from "./Caption";
import ArticlePreview from './LinkContent/ArticlePreview';

export default function Post({originalPoster, caption, likes, linkProps}) {
  return (
    <PostWrapper>
      <section className="post--avatarAndLikes">
        <img src={originalPoster.avatar} alt={originalPoster.name} />
        <IoHeartOutline color="white" size="20" />
        <p>{likes.length} likes</p>
      </section>
      <section className="post--body">
        <header>
          {originalPoster.name}&nbsp;
        </header>
        <Caption caption={caption} />
        <ArticlePreview linkProps={linkProps}/>
      </section>
    </PostWrapper>
  );
}

const PostWrapper = styled.li`
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: inherit;
  }

  width: 100%;
  display: flex;

  color: white;
  background-color: #171717;

  border-radius: 16px;
  padding: 18px;
  gap: 18px;

  @media (max-width: 375px){
    border-radius: 0;
    padding: 15px;
    gap: 14px;
  }

  .post--avatarAndLikes {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: white;
    flex-grow: 0;
    flex-shrink: 0;

    width: 50px;
    @media (max-width: 375px){
      width: 40px;
    }

    img {
      object-fit: cover;
      overflow: hidden;
      border-radius: 50%;
      display: block;

      height: 50px;
      width: 50px;
      margin-bottom: 19px;
      
      @media (max-width: 375px){
        height: 40px;
        width: 40px;
        margin-bottom: 17px;
      }
    }

    p {
      font-size: 11px;
      line-height: 13px;

      @media (max-width: 375px){
        font-size: 9px;
        line-height: 11px;
      }
    }
  }

  .post--body {
    flex-shrink: 1;
    flex-grow: 1;

    header {
      display: flex;
      align-items: center;
      margin-bottom: 7px;

      font-size: 19px;
      line-height: 23px;
      @media (max-width: 375px){
        font-size: 17px;
        line-height: 20px;
      }
    }
  }
`;
