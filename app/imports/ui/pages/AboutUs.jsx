import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

// AboutUs component
const AboutUs = () => (
  <div>
    <Container id={PAGE_IDS.ABOUT_US} className="text-center align-content-center">
      <h1>Welcome to the Voluntree</h1>
      <p>Connecting Volunteers with Opportunities</p>
    </Container>

    <Container className="text-center">
      {/* Replace image later */}
      <Image src="/images/volunteer-team-stock-image.jpg" rounded />
    </Container>

    <Container className="my-4">
      <Row>
        <Col>
          <h2>About Us</h2>
          <p>
            At Voluntree, we are committed to simplifying the process of providing opportunities for people to volunteer.

            Our mission is to alleviate friction between volunteer organizations and volunteers, making it easy for individuals to find meaningful ways to contribute to their communities.

            We believe in the power of volunteering to create positive change, and we strive to be the bridge that connects passionate volunteers with organizations in need.
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

export default AboutUs;
