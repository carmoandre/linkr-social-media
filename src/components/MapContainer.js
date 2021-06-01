import {Component} from 'react';

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  height: "240px"
}

export class MapContainer extends Component {
  render() {
    const initialCenter = this.props.initialCenter;
    return (
      <Map 
        containerStyle = {containerStyle}
        google={this.props.google} 
        zoom={14}
        initialCenter = {initialCenter}
      >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyDnyHMykirnjJqVlCLvHk8ylkOjJFC0JMk"
})(MapContainer)