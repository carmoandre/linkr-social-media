import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function Timeline () {

    const {user, setUser} = useContext(UserContext)
    console.log(user)
    return (<> </>)
}