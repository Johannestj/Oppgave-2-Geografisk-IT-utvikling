import L, { map } from 'leaflet';
import './style.css';
import { initializeMap } from './map.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
});

map.on('moveend', function (event) {
  console.log(map.getCenter(), map.getZoom());
});