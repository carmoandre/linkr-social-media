import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactModal from "react-modal";
import styled from 'styled-components';
import {useState} from 'react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '240px', width: '100%' }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: "AIzaSyDnyHMykirnjJqVlCLvHk8ylkOjJFC0JMk" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text=""
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default function MapModal(){
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  return (
    <div>
      <button onClick={()=>setModalIsOpen(true)}>Open Modal</button>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={()=>setModalIsOpen(false)}
        contentLabel="User location map"
      >
        <SimpleMap />
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
    max-width: 597px;
    width: 100%;
    height: 262px;
    background: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 5;
    padding: 0 110px 0 110px;

    div {
        display: flex;
    }

    .backdrop {
        background-color: green;
    }

    @media (max-width: 430px) {
        height: 170px;
        padding: 0 30px 0 30px;
    }
`;

const ModalText = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #ffffff;
    margin-bottom: 40px;

    @media (max-width: 430px) {
        margin-left: 5px;
        margin-bottom: 30px;
        line-height: 30px;
        font-size: 20px;
        padding: 0 35px 0 35px;
    }
`;

const GoBackButton = styled.button`
    width: 134px;
    height: 37px;
    background: #ffffff;
    color: #1877f2;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    margin-right: 27px;

    @media (max-width: 430px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877f2;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;

    @media (max-width: 430px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;

export { StyledModal, ModalText, GoBackButton, ConfirmButton };

