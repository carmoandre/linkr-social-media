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
                    <Ps>

                    </Ps>
                </Left>
                <Trending />

            </Box>
        </Body>
    );
}

const Body = styled.body`
    position: absolute;
    background: #333333;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const Title = styled.div`
    width: 65%;
    color: #FFF;
    font-family: "Oswald";
    font-size: 43px;
    line-height: 64px;
    margin: 125px auto 0 auto;
`;

const Box = styled.div`
    width: 65%;
    height: 100%;
    margin: 43px auto 0 auto;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    width: 65%;
`;

const Publi = styled.div`
    width: 100%;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 29px;
`;

const Ps = styled.div`
    width: 100%;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
`;