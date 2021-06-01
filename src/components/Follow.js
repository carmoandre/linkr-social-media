import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "../contexts/UserContext"

export default function Follow ({userData, followStatus, setFollowStatus}) {
    const { user } = useContext(UserContext)
    const [boolean, setBoolean] = useState(false)
    const config = {headers: {"Authorization": `Bearer ${user.token}`}}


    function follow () {
        setBoolean(true)
        if (userData !== undefined) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/follow`, {}, config)
            request.then(() => {
                setBoolean(false)
                setFollowStatus(true)
                console.log("follow")
            })
            request.catch(() => {
                setBoolean(false)
                alert("Não foi possível executar essa operação")})
        }
    }

       function unfollow () {
           if (userData !== undefined) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/unfollow`, {}, config)
            request.then(() => {
            setBoolean(false)
            setFollowStatus(false)
            console.log("unfollow")
        })
        request.catch(() => {
            setBoolean(false)
            alert("Não foi possível executar essa operação")})
        }
    }
    

    return (
        <Button onClick={followStatus ? unfollow : follow} followStatus={followStatus} disabled={boolean}>{followStatus ? "Unfollow" : "Follow"}</Button>
        )
}

const Button = styled.div `
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
    


