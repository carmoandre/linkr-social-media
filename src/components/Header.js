import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useContext } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Header({showMenu, setShowMenu}){
    const { user } = useContext(UserContext);

    return(
        <>
            <Title>
                <Link to="/timeline">
                    <h1>linkr</h1>
                </Link>
                <div>
                    {showMenu 
                        ? <BiChevronUp 
                            onClick={(e) => setShowMenu(!showMenu)} 
                            color="#FFF" 
                            size="50px" 
                            cursor="pointer" 
                        /> : <BiChevronDown 
                            onClick={(e) => setShowMenu(!showMenu)} 
                            color="#FFF" 
                            size="50px" 
                            cursor="pointer" 
                        />}               
                    <img
                        onClick={(e) => setShowMenu(!showMenu)}
                        src={user.user.avatar} 
                        alt={user.user.username}
                    />
                </div>
            </Title>
            {<Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>}
        </>
    );
}

const Title = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px 0 26px;
    position: fixed;
    z-index: 2;
    top:0;
    left:0;

    @media (max-width: 430px){
        padding-left: 17px;
    }

    h1{
        font-family: 'Passion One';
        font-size: 49px;
        line-height: 54px;
        color: #FFF;
        cursor: pointer;
    }

    img{
        width: 53px;
        height: 53px;
        object-fit: cover;
        border-radius: 50%;
        user-select: none;
        cursor: pointer;
    }
`;
