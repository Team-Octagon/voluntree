import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTracker } from 'meteor/react-meteor-data';
import { MapCoordinates } from '../../api/maps/MapCoordinates';

const EventsMap = ({ latAndLon }) => {
  const url = 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png';
  const { ready, locations } = useTracker(() => {
    const subscription = MapCoordinates.subscribeMapCoordinates();
    const isReady = subscription.ready();
    const locationsItems = MapCoordinates.find({}).fetch();
    return {
      locations: locationsItems,
      ready: isReady,
    };
  }, []);
  if (ready) {
    console.log(locations);
    console.log('locations added');
  }

  useEffect(() => {
    let map;

    const customIcon = L.icon({
      iconUrl: url,
      iconSize: [50, 50],
      iconAnchor: [16, 32],
    });

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

      locations.forEach(location => {
        const marker = L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          const eventPageUrl = `/volunteer-event-page/${location.eventId}`;
          window.location.href = eventPageUrl;
        });
      });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [latAndLon, locations]);

  return (
    <div id="map" style={{ height: '50vw', width: '70vw' }} />
  );
};

EventsMap.propTypes = {
  latAndLon: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default EventsMap;
