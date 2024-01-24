import React from 'react';
import { Col, Container, Image, Row, Navbar, Nav, FormControl, Carousel } from 'react-bootstrap';

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
          <Carousel>
            <Carousel.Item>
              <Image src="images/stock-image1.jpg" />
              <Carousel.Caption>
                <h3>Gateway Cafe</h3>
                <p>Gateway Cafe offers Breakfast and Lunch during the week.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="images/stock-image2.jpg" />
              <Carousel.Caption>
                <h3>Hale Aloha Café</h3>
                <p>Hale Aloha Café serves your favorite comfort foods and cuisine influenced by global flavors. </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image src="images/stock-image3.jpg" />
              <Carousel.Caption>
                <h3>Campus Center Food Court</h3>
                <p>The Campus Center Food Court offers a variety of food including plate lunches, bentos, grab-and-go salads and wraps, burgers, and more!</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Navbar>
  </Container>
);

export default Landing;
