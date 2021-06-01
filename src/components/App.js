import { BrowserRouter, Switch, Route, useHistory, useLocation} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import SignUp from "./Login-SignUp/SignUp";
import Login from "./Login-SignUp/Login"
import Timeline from "./Timeline";
import MyLikes from "./MyLikes";
import AnyUsersPosts from "./AnyUsersPosts";
import HashtagPosts from './HashtagPosts';
import MyPosts from "./MyPosts"
import isValidUserState from '../helperFunctions/isValidUserState';
import MapModal from './MapModal';
import Modal from 'react-modal';

export default function App() {

    const [user, setUser] = useState(null);

    const UserStorage = localStorage.getItem("user");
    const history = useHistory();
    const path = useLocation().pathname;
    Modal.setAppElement(document.querySelector(".root"));

    useEffect(() => {
        if (UserStorage !== null) {
            const localUserState = JSON.parse(UserStorage);
            if (isValidUserState(localUserState)){
                setUser(localUserState);
                if (path === "/sign-up") history.push("/timeline")
                else history.push(path);
            }
            else {
                localStorage.clear();
                setUser(undefined);
                history.push("/");
            }
        } else {
            setUser(undefined);
            history.push("/");
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return user === null ? "" : (
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <ResetCSS />
                    <Switch>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                        <Route exact path="/my-posts">
                            <MyPosts />
                        </Route>
                        <Route exact path="/user/:id">
                            <AnyUsersPosts />
                        </Route>
                        <Route exact path="/hashtag/:hashtag">
                            <HashtagPosts />
                        </Route>
                        <Route exact path="/timeline" >
                            <Timeline />
                        </Route>
                        <Route exact path="/my-likes">
                            <MyLikes />
                        </Route>
                        <Route path="/maps">
                            <MapModal />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>

                    </Switch>
                </BrowserRouter>
            </UserContext.Provider>
        )
    }

const ResetCSS = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    strong {
        font-weight: bold;
    }
`;
