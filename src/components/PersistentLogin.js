import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Timeline from "./Timeline";

export default function PersistentLogin ({UserStorage}) {
    const {user, setUser} = useContext(UserContext)
    console.log(user)

    setUser(UserStorage)
    return (
        <Timeline />
    )
}