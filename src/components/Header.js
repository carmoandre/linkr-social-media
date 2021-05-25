import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Header(){
    const [showMenu, setShowMenu] = useState(false);
    
    return(
        <>
            <Title>
                <Link to="/">
                    <h1>Linkr</h1>
                </Link>
                <div>
                    {showMenu ? <BiChevronUp onClick={() => setShowMenu(!showMenu)} color="#FFF" size="50px" cursor="pointer" /> : <BiChevronDown onClick={() => setShowMenu(!showMenu)} color="#FFF" size="50px" cursor="pointer" />}               
                    <img src="https://blog.cobasi.com.br/wp-content/uploads/2020/06/Ropuinhas_pug.png" alt=""/>
                </div>
            </Title>
            {showMenu && <Navbar />}
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
        border-radius: 50%;
    }
`;
