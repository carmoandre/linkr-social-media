import { BiRepost } from "react-icons/bi";
import styled from 'styled-components';

export default function RepostDrawer({post}){
  return (
    <DrawerWrapper>
            <BiRepost size="20"/>
            <span>Re-posted by <strong>{post.repostedBy.username}</strong></span>
    </DrawerWrapper>
  );
}

const DrawerWrapper = styled.div`
  svg {
    margin-right: 5px;
    position: relative;
    top: 1px;
  }

  font-family: Lato, 'sans-serif';
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: normal;
  font-style: normal;
  padding: 11px 13px;
`;