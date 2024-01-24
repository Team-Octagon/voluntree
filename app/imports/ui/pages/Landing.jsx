import React from 'react';
import { Col, Container, Image, Row, Navbar, Nav, FormControl, Carousel } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} fluid className="justify-content-center d-flex">
    <Navbar bg="white" expand="sm">
      <Row className="text-center">
        <Col>
          <Container>
            <Image src="images/Voluntree-logo.png" className="img-fluid" width="20%" />
          </Container>
          <Container>
            <div className="mt-4 text-center">
              <h1>Upcoming Events In Your Area</h1>
              <p>Discover volunteer events and opportunities!</p>
            </div>
            <Image src="images/Event-list.png" width="80%" />
          </Container>
          <div className="mt-4 text-center">
            <h1>Explore Whats New</h1>
          </div>
          <Carousel>
            <Carousel.Item>
              <Image src="images/stock-image1.jpg" width="60%" />
              <Carousel.Caption>
                <h3>Volunteer</h3>
                <p>Change the world.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="images/stock-image2.jpg" width="60%" />
              <Carousel.Caption>
                <h3>Volunteer</h3>
                <p>Change the world.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="images/stock-image3.jpg" width="60%" />
              <Carousel.Caption>
                <h3>Volunteer</h3>
                <p>Change the world.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Navbar>
  </Container>
);

export default Landing;
