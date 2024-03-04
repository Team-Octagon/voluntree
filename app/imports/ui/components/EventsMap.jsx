import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const EventsMap = ({ latAndLon }) => {
  useEffect(() => {
    let map;
    if (Array.isArray(latAndLon) && latAndLon.length === 2 && typeof latAndLon[0] === 'number' && typeof latAndLon[1] === 'number') {
      if (map) {
        map.remove();
      }
      map = L.map('map').setView(latAndLon, 11);

      L.tileLayer('https://api.mapbox.com/styles/v1/narowetz/clpsx6mis00ev01q11wim1lp0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFyb3dldHoiLCJhIjoiY2xwMjByMTN2MG05bjJtcXZrZnN6c3huNyJ9.Nx_FRbDji3ptjsCFz7YOPA', {
        attribution: '© OpenStreetMap contributors',
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(map);
    }
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [latAndLon]);

  return (
    <div id="map" style={{ height: '50vw', width: '70vw' }} />
  );
};

EventsMap.propTypes = {
  latAndLon: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default EventsMap;
