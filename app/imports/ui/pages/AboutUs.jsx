import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

// AboutUs component with text overlaying the image on the right
const AboutUs = () => (
  <div style={{
    backgroundImage: 'url("/images/landing-background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  }}
  >
    <Container id={PAGE_IDS.ABOUT_US} className="text-center align-content-center py-5">
      <h1>Welcome to the Voluntree</h1>
      <p>Connecting Volunteers with Opportunities</p>
    </Container>

    <Container className="my-5">
      <Row className="position-relative">
        {/* Image on the left */}

        {/* Overlay text on the right */}
        <Col md={6} className="position-absolute end-0">
          <div className="bg-dark p-3" style={{ opacity: 0.8, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2>About Us</h2>
            <p>
              At Voluntree, we are committed to simplifying the process of providing opportunities for people to volunteer.
              Our mission is to alleviate friction between volunteer organizations and volunteers, making it easy for individuals to find meaningful ways to contribute to their communities.
              We believe in the power of volunteering to create positive change, and we strive to be the bridge that connects passionate volunteers with organizations in need.
            </p>
          </div>
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Image src="/images/Voluntree-logo-cricle-modified.png" rounded className="w-50" />
        </Col>
      </Row>
    </Container>
  </div>
);

export default AboutUs;
