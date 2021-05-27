import Header from "../Header";
import Trending from "../Trending";
import styled from "styled-components"

// LayoutInterface eh um componente opinionado que espera 1 child dentro 
// dele e um nome de pagina passado como prop pageTitle
// o componente renderiza o layout padronizado da pagina e inclui a child na coluna principal

// como usar LayoutInterface :
// <LayoutInterface pageTitle="nome da pagina">
//   <componente que vai dentro de Box (pode incluir a caixa de adicionar novo post) />
// </LayoutInterface>
// exemplo:
// <LayoutInterface pageTitle="timeline">
//   <PostCreatorBox />
//   <Posts posts={posts} />
// </LayoutInterface>

export default function LayoutInterface({pageTitle, children}){
    return(
        <Main>
            <Header />
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
    background: #333333;
    min-height: 100vh;
    margin-top: 72px;
    padding-top: 53px;
    padding-bottom: 40px;
    @media (max-width: 375px){
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

    @media (max-width: 375px){
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

    @media (max-width: 375px){
      padding-left: 0;
      padding-right: 0;
      margin-top: 13px;
    }
`;

const Box = styled.div`
    width: 100%;
    max-width: 611px;
    & > * + * {
        margin-top: 29px;
    }

    @media (max-width: 375px){
        & > * + * {
            margin-top: 16px;
        }
    }
`;
