import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const VolunteerPreferencesSettingsCard = () => (
  <Card id={COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER} style={{ marginTop: '40px' }}>
    <Card.Header>
      <Card.Title>Notification Preferences</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <h1>Notifications Preferences Here</h1>
      </Card.Text>
      <div>
        <h5>Preferences:</h5>
      </div>
      <Button variant="primary">Save Preferences</Button>
    </Card.Body>
  </Card>
);

export default VolunteerPreferencesSettingsCard;
