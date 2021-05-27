import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Timeline from "./Timeline";

export default function PersistentLogin ({UserStorage}) {
    console.log("entrou na persistent login")
    const { user, setUser } = useContext(UserContext)

    const getUserStorage = JSON.parse(localStorage.getItem("user"))
    setUser(getUserStorage)

    return (
        <Timeline />
    )
}