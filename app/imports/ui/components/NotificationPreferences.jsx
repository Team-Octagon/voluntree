// NotificationPreferences.jsx

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const NotificationPreferences = () => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);

  const handleSavePreferences = () => {
    // Save preferences to the database
    Meteor.call('users.updateNotificationPreferences', {
      emailNotification,
      pushNotification,
    }, (error) => {
      if (error) {
        console.error('Error updating notification preferences:', error);
      } else {
        console.log('Notification preferences updated successfully!');
      }
    });
  };

  return (
    <div>
      <h2>Notification Preferences</h2>
      <Form>
        <Form.Check
          type="checkbox"
          label="Email Notifications"
          checked={emailNotification}
          onChange={(e) => setEmailNotification(e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Push Notifications"
          checked={pushNotification}
          onChange={(e) => setPushNotification(e.target.checked)}
        />
        <Button variant="primary" onClick={handleSavePreferences}>
          Save Preferences
        </Button>
      </Form>
    </div>
  );
};

export default NotificationPreferences;
