import React from 'react';
import { Container } from 'react-bootstrap';
import StartOrganizationTop from '../components/StartOrganizationTop';
import StartOrganizationBottom from '../components/StartOrganizationBottom';

const StartOrganization = () => (
  <Container>
    <StartOrganizationTop />
    <StartOrganizationBottom />
  </Container>
);

export default StartOrganization;
