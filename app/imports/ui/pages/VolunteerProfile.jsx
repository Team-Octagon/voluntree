import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileInfo from '../components/VolunteerProfileInfo';

const VolunteerProfile = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <VolunteerProfileInfo />
  </Container>
);

export default VolunteerProfile;
