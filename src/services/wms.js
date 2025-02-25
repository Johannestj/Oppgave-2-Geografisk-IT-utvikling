import L from 'leaflet';

export function getWmsLayer() {
  return L.tileLayer.wms(
    'https://wms.geonorge.no/skwms1/wms.topo?service=wms&request=getcapabilities',
    {
      layers: 'topo',
      format: 'image/png',
      transparent: true,
      attribution: 'Map data © Kartverket',
    }
  );
}
