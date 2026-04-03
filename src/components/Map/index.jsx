import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url),
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url),
});

function MapComponent({ center = [-20.65, -41.91], zoom = 13, riskAreas = [] }) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {riskAreas.map((area, index) => (
        <Polygon 
          key={index}
          positions={area.coordinates} 
          pathOptions={{ 
            color: area.color || 'blue', 
            fillOpacity: 0.4 
          }}
        >
          <Popup>{area.description}</Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
