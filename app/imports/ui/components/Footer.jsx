import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Youtube } from 'react-bootstrap-icons';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: '#f8f9fa', color: 'black' }}>
    <Container>
      <Row>
        <Col>
          <h5>Company</h5>
          <ul className="list-unstyled">
            <li><a id={COMPONENT_IDS.FOOTER_ABOUT_US} href="/about-us" style={{ color: 'black', textDecoration: 'none' }}>About Us</a></li>
            <li><p className="footer-link" style={{ color: 'black', margin: 0 }}>Careers</p></li>
            <li><p className="footer-link" style={{ color: 'black', margin: 0 }}>Team</p></li>
            <li><p className="footer-link" style={{ color: 'black', margin: 0 }}>Press</p></li>
          </ul>
        </Col>
        <Col>
          <h5>Resources</h5>
          <ul className="list-unstyled">
            <li><p className="footer-link" style={{ color: 'black', margin: 0 }}>Help</p></li>
            <li><p className="footer-link" style={{ color: 'black', margin: 0 }}>Contact Us</p></li>
          </ul>
        </Col>
        <Col>
          <h5>Socials</h5>
          <ul className="list-unstyled d-flex" style={{ padding: 0, listStyle: 'none' }}>
            <li><Facebook className="me-3" fontSize="25" /></li>
            <li><Twitter className="mx-3" fontSize="25" /></li>
            <li><Instagram className="mx-3" fontSize="25" /></li>
            <li><Youtube className="mx-3" fontSize="25" /></li>
          </ul>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="text-center">
          <span className="footer-brand" style={{ color: 'black' }}>Voluntree</span>
          <br />
          <small>© {new Date().getFullYear()}</small>
          <br />
          <a href="https://team-octagon.github.io/" style={{ color: 'black' }}>Project Homepage</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
