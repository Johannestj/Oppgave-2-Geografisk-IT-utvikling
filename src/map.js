import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWmsLayer } from './services/wms.js';
import { getSupabaseFireStation } from './services/supabase.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import proj4 from 'proj4';

// Define the projection (UTM Zone 32N)
proj4.defs('EPSG:25832', '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');

// Array to store fire station coordinates
const fireStations = [];

export function initializeMap() {
  // Create map and assign to window object
  const map = L.map('app').setView([58.1467, 7.9956], 12);
  window.map = map; // Make map globally accessible

  // Add WMS layer from Kartverket
  const wmsLayer = getWmsLayer();
  wmsLayer.addTo(map);

  // Routing control with global reference
  const routing = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
  }).addTo(map);
  window.routing = routing; // Make routing globally accessible

  // Fetch data from Supabase and add to map
  getSupabaseFireStation()
    .then((data) => {
      console.log('Data from Supabase:', data);

      if (Array.isArray(data)) {
        data.forEach((point) => {
          console.log('Processing point:', point);

          if (point && point.posisjon) {
            if (
              typeof point.posisjon === 'string' &&
              point.posisjon.startsWith('01010000')
            ) {
              console.log('Got WKB data:', point.posisjon);

              if (point.latitude && point.longitude) {
                addMarkerToMap(map, point.latitude, point.longitude, point.brannstasjon);
                // Store fire station location
                fireStations.push({
                  latLng: L.latLng(point.latitude, point.longitude),
                  name: point.brannstasjon,
                });
              }
            } else if (typeof point.posisjon === 'object') {
              if (point.posisjon.coordinates) {
                const [x, y] = point.posisjon.coordinates;

                if (x > 10000 && x < 1000000 && y > 6000000 && y < 8000000) {
                  const { latitude, longitude } = utmToLatLon(x, y);
                  addMarkerToMap(map, latitude, longitude, point.brannstasjon);
                  // Store fire station location
                  fireStations.push({
                    latLng: L.latLng(latitude, longitude),
                    name: point.brannstasjon,
                  });
                } else {
                  const [longitude, latitude] = [x, y];
                  addMarkerToMap(map, latitude, longitude, point.brannstasjon);
                  // Store fire station location
                  fireStations.push({
                    latLng: L.latLng(latitude, longitude),
                    name: point.brannstasjon,
                  });
                }
              } else if (Array.isArray(point.posisjon)) {
                const [longitude, latitude] = point.posisjon;
                addMarkerToMap(map, latitude, longitude, point.brannstasjon);
                // Store fire station location
                fireStations.push({
                  latLng: L.latLng(latitude, longitude),
                  name: point.brannstasjon,
                });
              }
            }
          }
        });
      } else {
        console.error('Expected array of points, got:', typeof data);
      }
    })
    .catch((error) => {
      console.error('Error in map initialization:', error);
    });

  // Map click event handler - modified to set destination only
  map.on('click', function (e) {
    // Find the closest fire station to the clicked point
    const closestStation = findClosestFireStation(e.latlng);

    if (!closestStation) {
      alert('No fire stations available');
      return;
    }

    // Set waypoints directly - from closest station to clicked point
    routing.setWaypoints([closestStation.latLng, e.latlng]);

    // Show which fire station was selected
    L.popup()
      .setLatLng(closestStation.latLng)
      .setContent(`<b>Starting from:</b> ${closestStation.name || 'Fire Station'}`)
      .openOn(map);
  });

  return map;
}

// Function to find the closest fire station using Leaflet's built-in distance calculation
function findClosestFireStation(latLng) {
  if (fireStations.length === 0) {
    return null;
  }

  let closest = fireStations[0];
  let minDistance = latLng.distanceTo(closest.latLng);

  for (let i = 1; i < fireStations.length; i++) {
    const station = fireStations[i];
    const distance = latLng.distanceTo(station.latLng);

    if (distance < minDistance) {
      minDistance = distance;
      closest = station;
    }
  }

  return closest;
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

function createButton(label, container) {
  var btn = L.DomUtil.create('button', '', container);
  btn.setAttribute('type', 'button');
  btn.innerHTML = label;
  return btn;
}
