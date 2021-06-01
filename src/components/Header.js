import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BiChevronDown, BiChevronUp, BiSearch } from "react-icons/bi";
import UserContext from "../contexts/UserContext";
import Navbar from "./Navbar";

export default function Header({ showMenu, setShowMenu }) {
    const { user } = useContext(UserContext);
    const [searchResults, setSearchResults] = useState(null);

    function searchUsers(keyword) {
        if (keyword === "") {
            setSearchResults(null);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${keyword}`,
            config
        );

        request.then((response) => {
            console.log(response.data.users);
            setSearchResults(sortResults(response.data.users));
        });
        request.catch((error) => {
            alert(
                "Não foi possível buscar por usuários. Por favor, tente novamente mais tarde."
            );
        });
    }

    function sortResults(list) {
        return list.sort((x, y) =>
            x.isFollowingLoggedUser === y.isFollowingLoggedUser
                ? 0
                : x.isFollowingLoggedUser
                ? -1
                : 1
        );
    }

    return (
        <>
            <Title>
                <Link to="/timeline">
                    <h1>linkr</h1>
                </Link>
                <SearchBox>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            placeholder="Search for people and friends"
                            minLength={3}
                            debounceTimeout={300}
                            onChange={(e) => {
                                searchUsers(e.target.value);
                            }}
                        />
                        <SearchButton />
                    </SearchBar>

                    {searchResults ? (
                        <ResultsHolder>
                            {searchResults.map((user) => (
                                <UserLink
                                    key={user.id}
                                    to={`/user/${user.id}`}
                                    user={user}
                                >
                                    <UserRoundedIMG user={user} />
                                    <p>
                                        {user.username}{" "}
                                        {user.isFollowingLoggedUser ? (
                                            <span> • following</span>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                </UserLink>
                            ))}
                        </ResultsHolder>
                    ) : (
                        ""
                    )}
                </SearchBox>
                <div>
                    {showMenu ? (
                        <BiChevronUp
                            onClick={(e) => setShowMenu(!showMenu)}
                            color="#FFF"
                            size="50px"
                            cursor="pointer"
                        />
                    ) : (
                        <BiChevronDown
                            onClick={(e) => setShowMenu(!showMenu)}
                            color="#FFF"
                            size="50px"
                            cursor="pointer"
                        />
                    )}
                    <img
                        onClick={(e) => setShowMenu(!showMenu)}
                        src={user.user.avatar}
                        alt={user.user.username}
                    />
                </div>
            </Title>
            {<Navbar showMenu={showMenu} setShowMenu={setShowMenu} />}
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
    top: 0;
    left: 0;

    @media (max-width: 430px) {
        padding-left: 17px;
    }

    h1 {
        font-family: "Passion One";
        font-size: 49px;
        line-height: 54px;
        color: #fff;
        cursor: pointer;
    }

    img {
        width: 53px;
        height: 53px;
        object-fit: cover;
        border-radius: 50%;
        user-select: none;
        cursor: pointer;
    }
`;

const SearchBox = styled.div`
    position: absolute;
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
    @media (max-width: 430px) {
        margin-top: 72px;
        width: 93%;
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
    @media (max-width: 430px) {
        margin-top: 72px;
    }
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
