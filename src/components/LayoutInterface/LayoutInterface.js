import Header from "../Header";
import PostsColumn from "./PostsColumn";
import Trending from "../Trending";
import styled from "styled-components"

export default function TimeLine(){
  
  return (
    <LayoutInterface pageTitle="TimeLine">
        <PostsColumn />
        <Trending />
    </LayoutInterface>
  );
}


function LayoutInterface({pageTitle, children}){
    return(
        <Main>
            <Header />
            <Title>{pageTitle}</Title>
            <Content>
              {children}
            </Content>
        </Main>
    );
}

const Main = styled.div`
    --center-box-padding: 0px 26px 0 26px;
    --center-box-max-width: 937px;
    background: #333333;
    min-height: 100vh;
    margin-top: 72px;
    padding-top: 53px;
`;

const Title = styled.div`
    width: 100%;
    max-width: var(--center-box-max-width);
    color: #FFF;
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    padding: var(--center-box-padding);
    margin: 0 auto;
`;

const Content = styled.div`
    width: 100%;
    max-width: var(--center-box-max-width);
    margin: 43px auto 0 auto;
    padding: var(--center-box-padding);
    display: flex;
    gap: 25px;

    & > * {
      flex-grow: 1;
      flex-shrink: 1;
    }

    @media (max-width: 375px){
      padding-left: 0;
      padding-right: 0;
    }
`;