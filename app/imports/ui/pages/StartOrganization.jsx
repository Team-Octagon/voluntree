import React from 'react';
import { Container } from 'react-bootstrap';
import StartOrganizationTop from '../components/StartOrganizationTop';
import StartOrganizationBottom from '../components/StartOrganizationBottom';
import {PAGE_IDS} from "../utilities/PageIDs";

const StartOrganization = () => (
  <Container id={PAGE_IDS.START_ORGANIZATION} fluid className="p-0" style={{ backgroundImage: 'url("/images/landing-background.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <StartOrganizationBottom />
    <StartOrganizationTop />
  </Container>
);

export default StartOrganization;
