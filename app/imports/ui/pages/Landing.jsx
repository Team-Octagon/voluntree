import React, { useState } from 'react';
import { Col, Container, Row, Card, Button, Form, Carousel, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const Landing = () => {
  // useTracker connects Meteor data to React components.
  const { ready, events } = useTracker(() => {
    // Subscribe to the new, more open publication
    const subscription = Events.subscribeEvent();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    const eventItems = Events.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchTerm); // Implement search logic or filtering based on searchTerm here.
  };

  return (
    ready ? (
      <Container id={PAGE_IDS.LANDING} fluid className="p-0" style={{ backgroundImage: 'url("/images/landing-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Search and header section */}
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Form className="d-flex justify-content-center">
              <Form.Control type="search" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="me-2" />
              <Button variant="primary" style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white' }} onClick={handleSearch}>Search</Button>
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
                  <Card className="custom-card"> {/* Add the custom-card class */}
                    <Card.Img variant="top" src={event.eventLogo || '/images/volunteer-team-stock-image.jpg'} />
                    <Card.Body className="text-center"> {/* Apply text-center class */}
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>
                        Date: {event.date}
                        <br />
                        Location: {event.location}
                        <br />
                        {event.description}
                      </Card.Text>
                      <Button variant="primary" style={{ backgroundColor: 'teal', borderColor: 'teal', color: 'white' }} href={`/events/${event._id}`}>Learn More</Button>
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
