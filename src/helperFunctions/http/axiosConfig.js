export default function axiosConfig(token){
  return {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
}