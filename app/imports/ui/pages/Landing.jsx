import React, { useState } from 'react';
import { Col, Container, Row, Card, Button, Form, Carousel, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';

const Landing = () => {
  // useTracker connects Meteor data to React components.
  const { ready, events, organizations } = useTracker(() => {
    // Subscribe to the new, more open publication
    const sub1 = Events.subscribeEvent();
    const sub2 = OrganizationProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // Get the Event documents
    const eventItems = Events.find({}, { sort: { eventDate: 1 }, limit: 3 }).fetch(); // Sort events by date ascending and limit to 3
    const orgItems = OrganizationProfiles.find({}, { limit: 3 }).fetch();
    return {
      events: eventItems,
      ready: rdy,
      organizations: orgItems,
    };
  }, []);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the default form submit behavior
    // Navigate to the volunteer-list-events page with the search term as a query parameter
    navigate(`/volunteer-list-events?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    ready ? (
      <Container id={PAGE_IDS.LANDING} fluid className="p-0" style={{ backgroundImage: 'url("/images/landing-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Search and header section */}
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Form className="d-flex justify-content-center" onSubmit={handleSearch}>
              <Form.Control type="search" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="me-2" />
              <Button variant="primary" type="submit" style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white' }}>Search</Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center text-center mt-5">
          <Col md={6}>
            <h1 className="mt-4 upcoming-events-header">Upcoming Events In Your Area</h1>
            <p className="upcoming-events-header">Discover volunteer events and opportunities!</p>
          </Col>
        </Row>

        {/* Events section */}
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {events.map((event) => (
                <Col key={event._id}>
                  <Card className="custom-card">
                    <Card.Img variant="top" src={event.eventLogo || '/images/volunteer-team-stock-image.jpg'} />
                    <Card.Body className="text-center">
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>
                        Date: {new Date(event.eventDate).toLocaleDateString()}
                        <br />
                        Location: {event.location}
                        <br />
                        {event.description}
                      </Card.Text>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white' }}
                        onClick={() => navigate(`/volunteer-event-page/${event._id}`)}
                      >
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

            </Row>
          </Col>
        </Row>

        {/* Non-profits section */}
        <Row className="justify-content-center text-center mt-5">
          <Col md={6}>
            <h1 className="mt-4 upcoming-events-header">Popular Non-Profits In Your Area</h1>
            <p className="upcoming-events-header">Learn more about them!</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {organizations.map((organization) => (
                <Col key={organization._id}>
                  <Card>
                    <Card.Img variant="top" src={organization.avatar || '/images/volunteer-team-stock-image.jpg'} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body className="text-center">
                      <Card.Title>{organization.name}</Card.Title>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white' }}
                        onClick={() => navigate(`/organization-page/${organization._id}`)}
                      >
                        Learn More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Explore new section */}
        <Row className="justify-content-center text-center mt-5">
          <Col md={8}>
            <h1 style={{ color: 'white' }}>Explore What is New</h1> {/* Add this style to make header text white */}
            <Carousel className="mt-4">
              {['1', '2', '3'].map((num) => (
                <Carousel.Item key={num}>
                  <Image src={`images/stock-image${num}.png`} className="d-block w-100" style={{ maxWidth: '1000px', margin: '0 auto' }} /> {/* Adjust maxWidth as needed */}
                  <Carousel.Caption>
                    <h3 style={{ color: 'white' }}>{`Header ${num}`}</h3> {/* Change text color to white */}
                    <p style={{ color: 'white' }}>{`Detail text for image ${num}`}</p> {/* Change text color to white */}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default Landing;
