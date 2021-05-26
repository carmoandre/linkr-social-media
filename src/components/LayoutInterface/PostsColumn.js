import styled from "styled-components";
import PostCreatorBox from "../PostCreatorBox";

export default function PostsColumn(){
    return(
        <Box>
            <PostCreatorBox />
            <Posts />
        </Box>
    );
}

const Box = styled.div`
    width: 100%;
    max-width: 611px;
    & > * + * {
        margin-top: 29px;
    }
`;

const Posts = styled.div`
    width: 100%;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
`;