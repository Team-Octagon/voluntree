// VolunteerSecuritySettingsCard.jsx
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const VolunteerSecuritySettingsCard = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleChangePassword = () => {
    // Add logic to handle password change
    console.log('Password changed successfully!');
  };

  const handleToggle2FA = () => {
    // Add logic to toggle 2FA status
    setIs2FAEnabled((prevValue) => !prevValue);
    console.log(`2FA is ${is2FAEnabled ? 'disabled' : 'enabled'}.`);
  };

  const handleAdditionalFeature = () => {
    // Placeholder for additional feature logic
    console.log('Additional feature clicked.');
  };

  return (
    <Card>
      <Card.Header className="text-center">Security Settings</Card.Header>
      <Card.Body>
        <Card.Title>Security Settings</Card.Title>
        <Form>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>

          <Form.Group controlId="form2FA">
            <Form.Check
              type="checkbox"
              label="Enable Two-Factor Authentication (2FA)"
              checked={is2FAEnabled}
              onChange={handleToggle2FA}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleAdditionalFeature}>
            Additional Feature
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default VolunteerSecuritySettingsCard;
