import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { BiSearch } from "react-icons/bi";

import { Link } from "react-router-dom";

const SearchBox = styled.div`
    position: fixed;
    margin: auto;
    top: 13px;
    left: 0;
    right: 0;
    width: 37%;
    max-height: 360px;
    overflow: hidden;
    background-color: #e7e7e7;
    margin: 0 auto;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 3;
    @media (max-width: 430px) {
        margin-top: 72px;
        width: 93%;
        max-height: 290px;
        z-index: 2;
    }
`;

const SearchBar = styled.div`
    background: #ffffff;
    width: 100%;
    height: 45px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 11px 15px 11px 17px;
`;

const SearchInput = styled(DebounceInput)`
    width: 100%;
    height: 45px;
    border: none;
    border-radius: 8px;
    font-family: "Lato", sans-serif;
    font-size: 19px;
    line-height: 23px;
`;

const SearchButton = styled(BiSearch)`
    width: 21px;
    min-width: 21px;
    height: 21px;
    color: #c6c6c6;
    margin-left: 15px;
`;

const ResultsHolder = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 6px 0 15px 0;
    ::-webkit-scrollbar-track {
        background-color: #f4f4f4;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background: #f4f4f4;
    }
    ::-webkit-scrollbar-thumb {
        background: #dad7d7;
    }
`;

const UserLink = styled(Link)`
    display: flex;
    align-items: center;
    font-family: "Lato", sans-serif;
    padding-left: 17px;
    margin: 8px 0;

    p {
        color: #515151;
    }

    span {
        color: #c5c5c5;
    }
`;

const UserRoundedIMG = styled.img`
    width: 39px;
    height: 39px;
    flex-shrink: 0;
    background: url(${(props) => props.user.avatar});
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 12px;
`;

export {
    SearchBox,
    SearchBar,
    SearchInput,
    SearchButton,
    ResultsHolder,
    UserLink,
    UserRoundedIMG,
};
