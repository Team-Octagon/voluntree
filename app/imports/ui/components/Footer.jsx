import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: '#007bff', color: 'white' }}> {/* Matching the navbar blue theme */}
    <Container id={COMPONENT_IDS.FOOTER}>
      <Col className="text-center">
        <span className="footer-brand">Voluntree</span>
        <br />
        <a id={COMPONENT_IDS.FOOTER_ABOUT_US} href="/about-us" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          About Us
        </a>
        <br />
        Honolulu, HI 96822
        <br />
        {new Date().getFullYear()} {/* Updated to only show the year */}
        <br />
        <a href="https://team-octagon.github.io/" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Project Homepage
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
