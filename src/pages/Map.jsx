import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchNearbyHealthcare } from '../utils/overpass';
import { Navigation, MapPin, Loader2, AlertCircle, Locate } from 'lucide-react';

const DEFAULT_CENTER = [19.076, 72.8777];
const DEFAULT_ZOOM = 13;

// Fly map to user when location is set
function MapController({ userLocation }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1 });
    }
  }, [map, userLocation]);
  return null;
}

// User location marker (blue pulse with icon)
const userIcon = L.divIcon({
  className: 'user-location-icon',
  html: `
    <div style="
      width: 24px; height: 24px;
      background: #2563eb;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      animation: pulse 2s infinite;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </div>
    <div style="
      position: absolute;
      top: -10px; left: -10px;
      width: 44px; height: 44px;
      background: rgba(37, 99, 235, 0.2);
      border-radius: 50%;
      animation: pulse-ring 2s infinite;
      z-index: -1;
    "></div>
    <style>
      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
      }
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(1.2); opacity: 0; }
      }
    </style>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function createPlaceIcon(type) {
  const configs = {
    hospital: {
      color: '#dc2626',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8M12 11v4M10 13h4"/></svg>`,
    },
    clinic: {
      color: '#ea580c',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 0 0 5 2h14a.3.3 0 0 0 .2.3l-2.6 6.6a1 1 0 0 1-.9.6H8.3a1 1 0 0 1-.9-.6L4.8 2.3zM6 10v12M18 10v12M10 16h4"/></svg>`,
    },
    pharmacy: {
      color: '#16a34a',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7"/></svg>`,
    },
    medical: {
      color: '#7c3aed',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/></svg>`,
    },
  };

  const config = configs[type] || configs.medical;

  return L.divIcon({
    className: 'place-marker',
    html: `<div style="
      width: 32px; height: 32px;
      background: ${config.color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    ">
      ${config.icon}
    </div>
    <div style="
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0; 
      height: 0; 
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid ${config.color};
    "></div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

const typeLabels = {
  hospital: 'Hospital',
  clinic: 'Clinic',
  pharmacy: 'Pharmacy',
  medical: 'Medical',
};

function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState('street'); // 'street' or 'satellite'
  const [places, setPlaces] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [placesLoading, setPlacesLoading] = useState(false);

  const loadPlaces = useCallback(async (lat, lng) => {
    setPlacesLoading(true);
    try {
      const data = await fetchNearbyHealthcare(lat, lng);
      setPlaces(data);
    } catch (e) {
      console.error('Failed to load places:', e);
      setPlaces([]);
    } finally {
      setPlacesLoading(false);
    }
  }, []);

  // Load default-area places on first mount so the map isn't empty before user allows location
  useEffect(() => {
    loadPlaces(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
  }, [loadPlaces]);

  // Request location only when user clicks – this triggers the browser permission prompt
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by your browser.');
      return;
    }
    setLocationError(null);
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationLoading(false);
        loadPlaces(latitude, longitude);
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === 1) {
          setLocationError('Location denied. Allow access in your browser to see nearby places.');
        } else {
          setLocationError(err.message || 'Could not get location. Try again.');
        }
        setUserLocation({ lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] });
        loadPlaces(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [loadPlaces]);

  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : DEFAULT_CENTER;

  const openInMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 h-screen pb-20 flex flex-col">
      <header className="bg-white p-4 shadow-sm z-10">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Near You</h1>
            <p className="text-sm text-gray-500">
              Hospitals, clinics & medicals
            </p>
          </div>
          <div className="flex gap-2">
            {/* Map Type Toggle */}
            <button
              type="button"
              onClick={() => setMapType(prev => prev === 'street' ? 'satellite' : 'street')}
              className="px-3 py-2.5 bg-white text-gray-700 border border-gray-200 text-sm font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {mapType === 'street' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Satellite
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                  Map
                </>
              )}
            </button>

            {/* Location Button */}
            <button
              type="button"
              onClick={requestLocation}
              disabled={locationLoading}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {locationLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Getting location…
                </>
              ) : userLocation ? (
                <>
                  <Locate className="h-4 w-4" />
                  Update location
                </>
              ) : (
                <>
                  <Locate className="h-4 w-4" />
                  Use my location
                </>
              )}
            </button>
          </div>
        </div>
        {locationError && (
          <p className="mt-2 text-sm text-amber-600 flex items-center gap-1" role="alert">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {locationError}
          </p>
        )}
      </header>

      <div className="flex-1 relative z-0 min-h-0">
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          key={userLocation ? 'with-location' : 'default'}
        >
          <MapController userLocation={userLocation} />

          {mapType === 'street' ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
          ) : (
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          )}

          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
              zIndexOffset={1000}
            >
              <Popup>You are here</Popup>
            </Marker>
          )}

          {places.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createPlaceIcon(place.type)}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[180px]">
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                    {typeLabels[place.type] || place.type}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-0.5">{place.name}</h3>
                  {place.address && (
                    <p className="text-xs text-gray-500 mt-1 flex items-start gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      {place.address}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => openInMaps(place.lat, place.lng)}
                    className="mt-2 w-full bg-sky-500 text-white text-xs py-1.5 rounded-md font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <Navigation className="h-3 w-3" /> Open in Google Maps
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg z-[1000] text-xs space-y-2">
          <div className="font-semibold text-gray-700 mb-2">Legend</div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white shadow-sm border border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-red-600 rounded-full text-white shadow-sm border border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8M12 11v4M10 13h4" /></svg>
            </div>
            <span>Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-orange-600 rounded-full text-white shadow-sm border border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 0 0 5 2h14a.3.3 0 0 0 .2.3l-2.6 6.6a1 1 0 0 1-.9.6H8.3a1 1 0 0 1-.9-.6L4.8 2.3zM6 10v12M18 10v12M10 16h4" /></svg>
            </div>
            <span>Clinic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-green-600 rounded-full text-white shadow-sm border border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7" /></svg>
            </div>
            <span>Pharmacy</span>
          </div>
        </div>

        {placesLoading && (
          <div className="absolute top-4 right-4 bg-white/95 px-3 py-2 rounded-lg shadow z-[1000] flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading places…
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
