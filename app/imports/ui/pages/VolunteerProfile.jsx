import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileCard from '../components/VolunteerProfileCard';
import VolunteerProfileDash from '../components/VolunteerProfileDash';

const VolunteerProfile = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <VolunteerProfileCard />
    <VolunteerProfileDash />
  </Container>
);

export default VolunteerProfile;
