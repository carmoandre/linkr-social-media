import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import UserContext from "../contexts/UserContext";
import Navbar from "./Navbar";
import {
    SearchBox,
    SearchBar,
    SearchInput,
    SearchButton,
    ResultsHolder,
    UserLink,
    UserRoundedIMG,
} from "./StyledSearch";

export default function Header({ showMenu, setShowMenu }) {
    const { user } = useContext(UserContext);
    const [searchResults, setSearchResults] = useState(null);
    const [searchInputValue, setSearchInputValue] = useState("");

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
                            value={searchInputValue}
                            onChange={(e) => {
                                setSearchInputValue(e.target.value);
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
                                    onClick={()=>{
                                        setSearchResults(null);
                                        setSearchInputValue("")
                                    }}
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
