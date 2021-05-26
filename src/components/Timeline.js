import Header from "./Header";
import styled from "styled-components"
import Trending from "./Trending";

export default function Timeline(){
    return(
        <Body>
            <Header />
            <Title>timeline</Title>
            <Box>
                <Left>
                    <Publi>

                    </Publi>

                    <Ps>

                    </Ps>
                </Left>
                <Trending />
            </Box>
        </Body>
    );
}

const Body = styled.main`
    background: #333333;
    width: 100%;
    height: 100%;
    min-height: 100vh;
`;

const Title = styled.div`
    width: 937px;
    color: #FFF;
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    padding-top: 125px;
    margin: 0 auto 0 auto;

    @media (max-width: 375px){
        margin: 91px 0 0 26px;
    }
`;

const Box = styled.div`
    width: 937px;
    height: 100%;
    margin: 43px auto 0 auto;
    display: flex;

    @media (max-width: 375px){
        width: 100%;
        margin-top: 19px;
    }
`;

const Left = styled.div`
    width: 611px;
    margin-right: 25px;

    @media (max-width: 375px){
        width: 100%;
        margin-right: 0;
    }

`;

const Publi = styled.div`
    width: 100%;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 29px;

    @media (max-width: 375px){
        border-radius: 0;
    }
`;

const Ps = styled.div`
    width: 100%;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;

    @media (max-width: 375px){
        border-radius: 0;
    }
`;