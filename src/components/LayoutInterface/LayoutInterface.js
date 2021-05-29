import Header from "../Header";
import Trending from "../Trending";
import styled from "styled-components"
import {useState} from 'react';

export default function LayoutInterface({pageTitle, children}){
    const [showMenu, setShowMenu] = useState(false);

    return(
        <Main onClick={()=>{if(showMenu) setShowMenu(false)}}>
            <Header showMenu={showMenu} setShowMenu={setShowMenu}/>
            <Title>{pageTitle}</Title>
            <Content>
              <Box>
                {children}
              </Box>
              <Trending />
            </Content>
        </Main>
    );
}

const Main = styled.div`
    --center-box-padding: 0px 26px 0 26px;
    --center-box-max-width: 937px;
    width: 100%;
    background: #333333;
    min-height: 100vh;
    margin-top: 72px;
    padding-top: 53px;
    padding-bottom: 40px;
    @media (max-width: 430px){
      padding-top: 15px;
    }
`;

const Title = styled.div`
    width: 100%;
    max-width: var(--center-box-max-width);
    color: #FFF;
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    font-weight: bold;
    padding: var(--center-box-padding);
    margin: 0 auto;

    @media (max-width: 430px){
      padding-left: 17px;
      padding-right: 17px;
      font-size: 33px;
      line-height: 49px;
    }
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

    @media (max-width: 430px){
      padding-left: 0;
      padding-right: 0;
      margin-top: 13px;
    }
`;

const Box = styled.div`
    flex: 1 1 611px;

    @media (max-width: 768px){
      flex: 1 1 768;
    }

    & > * + * {
        margin-top: 29px;
    }

    @media (max-width: 430px){
        & > * + * {
            margin-top: 16px;
        }
    }
`;
