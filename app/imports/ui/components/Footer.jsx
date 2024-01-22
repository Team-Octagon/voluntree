import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Voluntree
        {' '}
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        {Date()}
        <br />
        <a href="https://team-octagon.github.io/">
          Project Homepage
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
