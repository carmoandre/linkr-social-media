import styled from "styled-components";
import PostCreatorBox from "./PostCreatorBox";

export default function PostsColumn(){
    return(
        <Box>
            <CreatePubli>
                <PostCreatorBox />
            </CreatePubli>

            <Posts>

            </Posts>
        </Box>
    );
}

const Box = styled.div`
    width: 611px;
    margin-right: 25px;
`;

const CreatePubli = styled.div`
    width: 100%;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 29px;
`;

const Posts = styled.div`
    width: 100%;
    height: 276px;
    background: #171717;
    border-radius: 16px;
    margin-bottom: 16px;
`;