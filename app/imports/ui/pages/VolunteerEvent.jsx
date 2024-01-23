import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerEventDash from '../components/VolunteerEventDash';
import VolunteerEventCard from '../components/VolunteerEventCard';

const VolunteerProfile = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <VolunteerEventCard />
    <VolunteerEventDash />
  </Container>
);

export default VolunteerProfile;
