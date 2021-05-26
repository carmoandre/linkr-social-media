import styled from "styled-components";
import PostCreatorBox from "./PostCreatorBox";

export default function GenericPage() {
    return (
        <BackgroundDiv>
            <div>
                <PostCreatorBox />
            </div>
        </BackgroundDiv>
    );
}

const BackgroundDiv = styled.div`
    background-color: #333;
    width: 100vw;
    height: 100vh;
    padding: 20px;
`;
