export default function axiosConfig(token){
  return config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
}