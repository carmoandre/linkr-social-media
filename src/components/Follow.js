import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "../contexts/UserContext"
import {useParams} from 'react-router-dom';

export default function Follow () {
    const { user } = useContext(UserContext)
    const [boolean, setBoolean] = useState(false)
    const [followList, setFollowList] = useState()
    const [followStatus, setFollowStatus] = useState()
    const [userData, setUserdata] = useState()
    const config = {headers: {"Authorization": `Bearer ${user.token}`}}
    const [isReadyToRender, setIsReadyToRender] = useState(false)

    const {id: userID} = useParams();

    useEffect(() => {
      setUserdata({id:`${userID}`})
      const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", config)
      request.then(response => {
        setFollowList(response.data.users)
      })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(()=>{
      if(followList !== undefined) {
        const userIDs = followList.map(element => `${element.id}`);
        if(userIDs.includes(`${userData.id}`)) {
            setFollowStatus(true)
        }
        else{
            setFollowStatus(false)
        }
        setIsReadyToRender(true)
      }
    },[followList, userData]) // eslint-disable-line react-hooks/exhaustive-deps


    function follow () {
        setBoolean(true)
        if (userData !== undefined) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/follow`, {}, config)
            request.then(() => {
                setBoolean(false)
                setFollowStatus(true)
            })
            request.catch(() => {
                setBoolean(false)
                alert("Não foi possível executar essa operação")
            })
        }
    }

    function unfollow () {
        setBoolean(true)
        if (userData !== undefined) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/unfollow`, {}, config)
            request.then(() => {
                setBoolean(false)
                setFollowStatus(false)
            })
            request.catch(() => {
                setBoolean(false)
                alert("Não foi possível executar essa operação")
            })
        }
    }
    
    if (isReadyToRender) {
    return (
        <Button onClick={followStatus ? unfollow : follow} followStatus={followStatus} disabled={boolean}>{followStatus ? "Unfollow" : "Follow"}</Button>
        )
    }
    else {return (<> </>)}
}

const Button = styled.div `
    cursor: pointer;
    width: 112px;
    height: 31px;
    background: ${props => props.followStatus ? "#fff" : "#1877F2"};
    color: ${props => props.followStatus ? "#1877F2" : "#fff"};
    border-radius: 5px;
    font-size: 14px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`
    


