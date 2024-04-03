import React from 'react';
import { Container } from 'react-bootstrap';
import StartOrganizationTop from '../components/StartOrganizationTop';
import StartOrganizationBottom from '../components/StartOrganizationBottom';

const StartOrganization = () => (
  <Container fluid className="p-0" style={{ backgroundImage: 'url("/images/landing-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <StartOrganizationBottom />
    <StartOrganizationTop />
  </Container>
);

export default StartOrganization;
