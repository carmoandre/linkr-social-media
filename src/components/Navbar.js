import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import {useContext} from 'react';

export default function Navbar({showMenu}){
    const {setUser} = useContext(UserContext);
    function logOut(){
        localStorage.clear();
        setUser(undefined);
    }

    return(
        <Box showMenu={showMenu} >
            <Link to="/my-posts">
                My posts
            </Link>
            <Link to="/my-likes">
                My likes
            </Link>
            <Link to="/" onClick={logOut}>
                Logout
            </Link>
        </Box>
    );
}

const Box = styled.nav`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 72px;
    right: 0;
    width: 130px;
    background-color: #171717;
    color: #FFF;
    font-size: 17px;
    border-bottom-left-radius: 20px;

    z-index: 1;
    top: ${({showMenu})=>showMenu?"72px":"-58px"};

    transition: top 150ms ease-in-out;

    overflow: hidden;

    a{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 11px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-family: Lato, sans-serif;
        font-weight: 700;
        font-size: 17px;

        :nth-child(3){
            border-bottom-left-radius: 20px;
            padding-bottom: 8px;
        }

        :hover{
            background-color: ${({showMenu})=>showMenu?"#3d3d3d":"none"};
        }

        :nth-child(3):hover{
            background-color: ${({showMenu})=>showMenu?"#b33232":"none"};
        }

        &&&{
            background-color: none;
        }
    }
`;
