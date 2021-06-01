import Header from "../Header";
import Trending from "../Trending";
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Follow from "../Follow";
import axios from "axios";

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

export default function LayoutInterface({pageTitle, children, userData}){

  const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(UserContext)
  const [followList, setFollowList] = useState()
  const [usernames, setUsernames] = ([])
  const [followStatus, setFollowStatus] = useState()

  const config = {headers: {"Authorization": `Bearer ${user.token}`}}

  useEffect(() => {
    const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", config)
    request.then(response => {
      setFollowList(response.data.users)
    })

    if(followList !== undefined) {
    followList.map(element => setUsernames(...usernames, element.username))

    if(usernames.includes(userData.usernames)) {
        setFollowStatus(true)
    }
    else{
        setFollowList(false)
    }}
    }
  ,[])


    return(
        <Main onClick={()=>{if(showMenu) setShowMenu(false)}}>
            <Header showMenu={showMenu} setShowMenu={setShowMenu}/>
            <Title>{pageTitle}
                {userData !== undefined
                  ? pageTitle !== "my posts" && pageTitle !== "my likes" && pageTitle !== `${user.user.username}’s posts`
                    ? <Follow userData={userData} followStatus={followStatus} setFollowList={setFollowStatus}/>
                    : <> </> 
                : <> </>}
              </Title>
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
    display: flex;
    justify-content: space-between;
    align-items: center;

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
