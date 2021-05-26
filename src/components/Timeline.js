import Posts from "./Posts/Posts";
import PostCreatorBox from "./PostCreatorBox";
import { useEffect } from "react";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import LayoutInterface from "./LayoutInterface/LayoutInterface";

export default function Timeline(){
    // const { user, setUser } = useContext(UserContext);
    const [showPosts, setShowPosts] = useState(true);
    
    useEffect(() => {
        renderPosts();
    }, []);
    
    function renderPosts(){

        const config = {
            headers: {
                // Authorization: `Bearer ${user.token}`,
            },
        };

    //     const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", config);
    //     request.then(response => {
    //         const res = response.data;
    //         if (res.length===0){
    //             alert("Nenhum post encontrado");
    //         }else{
    //             setShowPosts(res);
    //         }
    //     })
    //     request.catch(error => {
    //         alert("Houve uma falha ao obter os posts. Por favor, atualize a página")
    //     })
}
const [posts, setPosts] = useState([]);
    
useEffect(()=>{
  const token = "6a58d8fe-c3d4-4439-9f99-3cddf4f28430";
  const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/7/posts";
  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  axios
    .get(url, config)
    .then(({data})=>{
      setPosts(data.posts);
    })
    .catch((err) => console.log(err));
},[]) 

    return(
        <LayoutInterface pageTitle="timeline">
            <>
                <PostCreatorBox />
                {showPosts===false ? <Loading /> : <Posts posts={posts} />}
            </>
        </LayoutInterface>
        /* // <Main>
        //     <Header />
        //     <Title>timeline</Title>
        //     <Content>
        //         {showPosts===false ? <Loading /> : <PostsColumn />}
        //         <Trending />
        //     </Content>
        // </Main> */
    );
}