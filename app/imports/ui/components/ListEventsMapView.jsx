import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import EventsMap from './EventsMap';

const ListEventsMapView = () => {
  const [latAndLon, setLatAndLon] = useState([21.300, -157.818]);
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    console.log('Updated latAndLon:', latAndLon);
  }, [latAndLon]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${zipcode}&countrycodes=US`);

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setLatAndLon([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.error('No coordinates found for the entered zipcode');
        }
      } else {
        console.error('Error fetch:', response.status);
      }
    } catch (error) {
      console.error('Error fetch:', error);
    }
  };

  return (
    <Container id={PAGE_IDS.LIST_EVENTS} className="py-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <div>
            <input
              type="text"
              placeholder="Enter Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <button type="button" onClick={handleSearch}>Search</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-center">
          <div className="d-flex justify-content-center">
            <EventsMap latAndLon={latAndLon} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ListEventsMapView;
