import React from 'react';
import { Col, Container, Image, Row, Navbar, Nav, FormControl } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="justify-content-center d-flex">
    <Navbar bg="white" expand="lg">
      <Row className="text-center">
        <Col>
          <Container>
            <Image src="images/Voluntree-logo.png" class="img-fluid" width="30%" />
          </Container>
          <Container>
            <Nav>
              <FormControl
                placeholder="Search for events"
                aria-label="Search for events"
                aria-describedby="basic-addon2"
              />
            </Nav>
          </Container>
          <Container>
            <div className="mt-4 text-center">
              <h1>Upcoming Events In Your Area</h1>
              <p>Discover amazing content and more!</p>
            </div>
            <Image src="images/Event-list.png" />
          </Container>
        </Col>
      </Row>
    </Navbar>
  </Container>
);

export default Landing;
