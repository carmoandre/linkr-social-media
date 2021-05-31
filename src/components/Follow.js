import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import axiosConfig from "../helperFunctions/http/axiosConfig"

export default function Follow ({userData}) {

    const [followStatus, setFollowStatus] = useState(false)

    function follow () {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/follow`, {}, axiosConfig)
    }

    function unfollow () {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userData.id}/unfollow`, {}, axiosConfig)
    }

    return(
    <Button onClick={followStatus ? unfollow : follow} followStatus={followStatus}>{followStatus ? "Unfollow" : "Follow"}</Button>
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
    


