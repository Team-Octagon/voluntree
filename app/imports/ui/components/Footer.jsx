import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: 'white', color: 'black' }}> {/* Background is white, text should be black for contrast */}
    <Container id={COMPONENT_IDS.FOOTER}>
      <Col className="text-center">
        <span className="footer-brand" style={{ color: 'black' }}>Voluntree</span> {/* Ensure this text is black */}
        <br />
        <a id={COMPONENT_IDS.FOOTER_ABOUT_US} href="/about-us" style={{ color: 'black' }}> {/* Change this text to black */}
          About Us
        </a>
        <br />
        Honolulu, HI 96822 {/* This text is already black due to the footer's color style */}
        <br />
        {new Date().getFullYear()} {/* This text is also already black */}
        <br />
        <a href="https://team-octagon.github.io/" style={{ color: 'black' }}> {/* Change this text to black */}
          Project Homepage
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
