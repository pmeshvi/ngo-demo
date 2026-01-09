'use client'; // Important: client-side only
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Red icon for user
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent() {
  const [userLocation, setUserLocation] = useState(null);
  const [ngoDistances, setNgoDistances] = useState({});

  const ngos = [
    { name: 'Helping Hands', lat: 22.5646, lng: 72.9289, city: 'Anand' },
    { name: 'Save Earth', lat: 19.0760, lng: 72.8777, city: 'Mumbai' },
    { name: 'Food For All', lat: 28.6139, lng: 77.2090, city: 'Delhi' },
    { name: 'Bangladesh Relief', lat: 23.8103, lng: 90.4125, city: 'Dhaka' },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const loc = [position.coords.latitude, position.coords.longitude];
        setUserLocation(loc);

        const distances = {};
        ngos.forEach((ngo) => {
          const distanceKm = haversineDistance(
            loc[0],
            loc[1],
            ngo.lat,
            ngo.lng
          );
          const etaMin = Math.round((distanceKm / 50) * 60); // 50 km/h
          distances[ngo.name] = {
            distance: distanceKm.toFixed(1) + ' km',
            eta: etaMin + ' min by car',
          };
        });
        setNgoDistances(distances);
      });
    }
  }, []);

  const bounds = [
    [19.0, 72.0],   // Mumbai/Gujarat
    [28.6, 77.2],   // Delhi
    [23.8, 90.4],   // Bangladesh
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {userLocation && (
          <Marker position={userLocation} icon={redIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {ngos.map((ngo, i) => (
          <Marker key={i} position={[ngo.lat, ngo.lng]}>
            <Popup>
              <strong>{ngo.name}</strong> ({ngo.city})<br />
              {ngoDistances[ngo.name]
                ? `${ngoDistances[ngo.name].distance} away | ${ngoDistances[ngo.name].eta}`
                : 'Calculating distance...'}
              <br />
              {userLocation && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${ngo.lat},${ngo.lng}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#38bdf8', textDecoration: 'underline' }}
                >
                  Get Directions
                </a>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
