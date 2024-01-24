import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileSettingsCard from '../components/VolunteerProfileSettingsCard';

/* Design for the settings page (only for volunteer side). */
const VolunteerSettings = () => (
  <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
    <Row>
      <Col md={4}>
        <div>
          <h2>Settings <GearFill /></h2>
          <VolunteerProfileSettingsCard />
        </div>
      </Col>

      <Col md={8}>
        <div>
          <h2>- User Profile</h2>
          <h2>- Security</h2>
          <h2>- Wavier?</h2>
          <h2>- Volunteer History</h2>
        </div>
      </Col>
    </Row>
  </Container>
);

export default VolunteerSettings;
