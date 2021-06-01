import React from 'react';
import ReactModal from "react-modal";
import styled from 'styled-components';
import {useState} from 'react';
import MapContainer from './MapContainer';

export default function MapModal({userName, lat, lng}){
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function ExitModal(){
    return (
      <p style={{cursor:"pointer"}} onClick={()=>setModalIsOpen(false)}>x</p>
    )
  }

  return (
    <div>
      <button onClick={()=>setModalIsOpen(true)}>Open Modal</button>
      <StyledModal
        isOpen={modalIsOpen}
        contentLabel="User location map"
      >
        <Header>
          <p>{userName}’s posts</p>
          <ExitModal />
        </Header>
        <MapContainer initialCenter={{lat:lat, lng:lng}} />
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
    background: #333333;
    border-radius: 20px;
    user-select: none;

    position: absolute;
    z-index: 5;
    padding: 7px 37px 33px 37px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 38px;
  line-height: 56px;
  color: white;
  font-weight: bold;
  font-family: Oswald, "sans-serif";
  margin-bottom: 8px;
`;
