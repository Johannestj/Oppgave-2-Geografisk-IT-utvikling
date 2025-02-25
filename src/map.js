import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWmsLayer } from './services/wms.js';
import { getSupabaseFireStation } from './services/supabase.js';
import proj4 from 'proj4';

// Define the projection (UTM Zone 32N)
proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');

export function initializeMap() {
  const map = L.map('app').setView([58.1467, 7.9956], 13);

  // Add WMS layer from Kartverket
  const wmsLayer = getWmsLayer();
  wmsLayer.addTo(map);

  // Fetch data from Supabase and add to map
  getSupabaseFireStation()
    .then((data) => {
      console.log('Data from Supabase:', data); // Debug log

      // Check if data is an array
      if (Array.isArray(data)) {
        data.forEach((point) => {
          console.log('Processing point:', point); // Debug log

          if (point && point.posisjon) {
            // For now, let's handle the WKB data differently without relying on the wkx library
            if (
              typeof point.posisjon === 'string' &&
              point.posisjon.startsWith('01010000')
            ) {
              // This is likely a WKB hex string for a point
              // We'll use a backend API service to parse it or use a different approach
              console.log('Got WKB data:', point.posisjon);

              // Alternative 1: If you have the coordinates in another field, use those
              if (point.latitude && point.longitude) {
                addMarkerToMap(map, point.latitude, point.longitude, point.brannstasjon);
              }
              // Alternative 2: Make a separate API call to convert WKB to coordinates
              else {
                // Example: fetchCoordinatesFromWKB(point.posisjon)
                //    .then(({lat, lng}) => addMarkerToMap(map, lat, lng, point.brannstasjon));
              }
            }
            // Handle other formats as before
            else if (typeof point.posisjon === 'object') {
              if (point.posisjon.coordinates) {
                const [x, y] = point.posisjon.coordinates;

                // Check if these are UTM coordinates (roughly in Norway's range)
                if (x > 10000 && x < 1000000 && y > 6000000 && y < 8000000) {
                  // These are UTM coordinates, use a conversion function
                  const { latitude, longitude } = utmToLatLon(x, y);
                  addMarkerToMap(map, latitude, longitude, point.brannstasjon);
                } else {
                  // Assume these are already lon/lat coordinates
                  const [longitude, latitude] = [x, y];
                  addMarkerToMap(map, latitude, longitude, point.brannstasjon);
                }
              } else if (Array.isArray(point.posisjon)) {
                const [longitude, latitude] = point.posisjon;
                addMarkerToMap(map, latitude, longitude, point.brannstasjon);
              }
            }
            // Add more cases as needed
          }
        });
      } else {
        console.error('Expected array of points, got:', typeof data);
      }
    })
    .catch((error) => {
      console.error('Error in map initialization:', error);
    });
}

function utmToLatLon(easting, northing) {
  const [longitude, latitude] = proj4('EPSG:25832', 'EPSG:4326', [easting, northing]);
  return { latitude, longitude };
}

function addMarkerToMap(map, latitude, longitude, name) {
  L.circleMarker([latitude, longitude], {
    radius: 8,
    fillColor: '#ff4444',
    color: '#000',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  })
    .addTo(map)
    .bindPopup(name || 'Fire Station');
}
