import React from 'react';
import ReactModal from "react-modal";
import styled from 'styled-components';
import {useState} from 'react';
import MapContainer from './MapContainer';

export default function MapModal(userName, lat, lng){
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  return (
    <div>
      <button onClick={()=>setModalIsOpen(true)}>Open Modal</button>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={()=>setModalIsOpen(false)}
        contentLabel="User location map"
      >
        <div></div>
        <MapContainer initialCenter={{lat: -22.9, lng: -43.19}} />
      </StyledModal>
    </div>
  );
}

const StyledModal = styled(ReactModal)`
    top: 50vh;
    left: 50vw;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 790px;
    width: 100%;
    height: 354px;
    background: #333333;
    border-radius: 20px;

    position: absolute;
    z-index: 5;
    padding: 81px 37px 33px 37px;
`;

