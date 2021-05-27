import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import LayoutInterface from "./LayoutInterface/LayoutInterface";
import Loading from "./Loading";
import Posts from "./Posts/Posts";

export default function MyLikes () {

    const [posts, setPosts] = useState([])
    const { user } = useContext(UserContext)
    const [renderPage, setRenderPage] = useState(false)

    useEffect(()=>{
        const config = {headers: {Authorization: `Bearer ${user.token}`}};
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked", config)
        request.then(response => {
            setRenderPage(true)
            setPosts(response.data.posts)
            })
        request.catch(() => console.log("deu erro na request"));
    },
    [user])


    return (
        <LayoutInterface pageTitle="my likes">
            {renderPage ? <Posts posts={posts}/> : <Loading />}
        </LayoutInterface>
    )
}