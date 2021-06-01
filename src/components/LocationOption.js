import {IoLocationOutline} from 'react-icons/io5';
import styled from 'styled-components';

export default function LocationOption({geolocation, setGeolocation}){
  return (
    <LocationWrapper onClick={()=>handleClick(geolocation, setGeolocation)} geolocation={geolocation}>
      <IoLocationOutline/>{geolocation?"Localização ativada":"Localização desativada"}
    </LocationWrapper>
  )
}

function handleClick(geolocation, setGeolocation){
  if ("geolocation" in navigator) {
    /* geolocation is available */
  } else {
    alert("I'm sorry, but geolocation services are not supported by your browser.");
  }

  if (geolocation) setGeolocation(null);
  else {
    navigator.geolocation.getCurrentPosition(function(position) {
      setGeolocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  };
}

const LocationWrapper = styled.div`
  color: ${({geolocation})=>geolocation?"#238700":"#949494"};
  font-family: Lato, "sans-serif";
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
`;