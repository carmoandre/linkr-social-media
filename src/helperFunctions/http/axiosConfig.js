export default function axiosConfig(token){
  return {
    headers:{
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
  }
}