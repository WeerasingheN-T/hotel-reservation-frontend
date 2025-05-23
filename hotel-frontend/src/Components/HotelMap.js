import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function  HotelMap({ hotels }) {

    const defaultPosition = [7.8731, 80.7718]; 

    return (
        <MapContainer center={defaultPosition} zoom={7} scrollWheelZoom={false}
          style={{ height: '444px', width: '100%' }}>
            <TileLayer attribution='&copy;
              <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hotels.map(hotel => (
                <Marker key={hotel.id} position={[hotel.latitude,hotel.longitude]}>
                    <Popup>
                        <strong>{hotel.hotelName}</strong><br/>
                        {hotel.location}
                    </Popup>
                </Marker>
            ))}
          </MapContainer>
    );
}

export default HotelMap;