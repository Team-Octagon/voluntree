import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button, ButtonGroup, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerEventDash from '../components/VolunteerEventDash';
import ListEventsMapView from '../components/ListEventsMapView';

const VolunteerListEvents = () => {
  const [isMapView, setMapView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    setSearchTerm(search || '');
  }, [location]);

  // Function to handle change in search input
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // Update the URL with the new search term without navigating away from the page
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('search', newSearchTerm);
    // Push the new search state to the history
    window.history.pushState(null, '', `?${queryParams.toString()}`);
  };

  return (
    <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Event Listings</h1>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
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
        <Col>
          {isMapView ? <ListEventsMapView searchTerm={searchTerm} /> : <VolunteerEventDash searchTerm={searchTerm} />}
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerListEvents;
