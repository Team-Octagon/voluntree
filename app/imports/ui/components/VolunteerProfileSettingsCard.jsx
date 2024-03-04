import React, { useState } from 'react';
import { Col, Row, Button, Card, Form } from 'react-bootstrap';

const VolunteerProfileSettingsCard = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePicture: "https://placekitten.com/200/200",
    phoneNumber: "720321431",
    birthDate: "06/13/01",
  };
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes (e.g., update user in the database)
    console.log('Saving changes:', editedUser);
    setEditMode(false);
  };

  return (
    <Card>
      <Card.Header className="text-center">User Profile</Card.Header>
      <Card.Body>
        <Row>
          <Col xs={4}>
            <h5>First Name</h5>
            <h5>Last Name</h5>
            <h5>BirthDate</h5>
            <h5>Email</h5>
            <h5>Phone Number</h5>
          </Col>
          <Col xs={4}>
            {editMode ? (
              <Form.Control
                type="text"
                value={editedUser.firstName}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            ) : (
              <div className="info-box">{user.firstName}</div>
            )}
            {editMode ? (
              <Form.Control
                type="text"
                value={editedUser.lastName}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            ) : (
              <div className="info-box" style={{ marginTop: '6px' }}>{user.lastName}</div>
            )}
            {editMode ? (
              <Form.Control
                type="text"
                value={editedUser.birthDate}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            ) : (
              <div className="info-box" style={{ marginTop: '6px' }}>{user.birthDate}</div>
            )}
            {editMode ? (
              <Form.Control
                type="text"
                value={editedUser.email}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            ) : (
              <div className="info-box" style={{ marginTop: '10px' }}>{user.email}</div>
            )}

          </Col>
          <Col xs={4} className="text-right">
            <img src={user.profilePicture} alt="Profile" className="mb-3" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h5>Bio</h5>
            {editMode ? (
              <Form.Control
                as="textarea"
                value={editedUser.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
              />
            ) : (
              <div className="info-box">{user.bio}</div>
            )}
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12}>
            {editMode ? (
              <Button variant="primary" size="sm" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleToggleEditMode}>
                Change Info
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default VolunteerProfileSettingsCard;
