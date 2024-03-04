import React, { useState } from 'react';
import { Col, Container, Row, Button, ButtonGroup } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerEventDash from '../components/VolunteerEventDash';
import ListEventsMapView from '../components/ListEventsMapView';

const VolunteerListEvents = () => {
  const [isMapView, setMapView] = useState(false);
  return (
    <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
      <Row>
        <Col className="text-center">
          <h1>Event Listings</h1>
          <ButtonGroup>
            <Button
              style={{ backgroundColor: isMapView ? 'white' : 'blue', color: isMapView ? 'black' : 'white' }}
              onClick={() => setMapView(false)}
            >
              List View
            </Button>
            <Button
              style={{ backgroundColor: isMapView ? 'blue' : 'white', color: isMapView ? 'white' : 'black' }}
              onClick={() => setMapView(true)}
            >
              Map View
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingLeft: 120 }}>
          {/* Render the list or map based on the isMapView state */}
          {isMapView ? <ListEventsMapView /> : <VolunteerEventDash />}
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerListEvents;
