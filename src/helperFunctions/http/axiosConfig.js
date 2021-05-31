export default function axiosConfig(token){
  const strUser = localStorage.getItem("user");
  const user = JSON.parse(strUser);
  const bearer = (user && user.token) || "";
  return {
    headers:{
      Authorization: `Bearer ${bearer}`
    }
  }
}