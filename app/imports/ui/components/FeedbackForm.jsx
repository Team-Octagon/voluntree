import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Events } from '../../api/event/Events';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import { Feedback } from '../../api/feedback/Feedback';
import { defineMethod } from '../../api/base/BaseCollection.methods';

VolunteerProfiles.subscribe();
Feedback.subscribe();

const FeedbackForm = ({ eventId, formName }) => {
  const event = Events.findDoc(eventId);
  const profile = VolunteerProfiles.getProfile(Meteor.userId());

  const [formData, setFormData] = useState({
    eventId: eventId,
    userId: Meteor.userId(),
    rating: 5,
    comments: '',
    isAnonymous: false,
  });

  const submit = () => {
    const collectionName = Feedback.getCollectionName();
    const definitionData = formData;
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Feedback added successfully', 'success');
      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      <Form
        id={formName}
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Control type="text" value={event.organizer} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Organization Email</Form.Label>
              <Form.Control type="email" value="volunteer@example.com" disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={profile.firstName} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={profile.lastName} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={profile.email} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.comments}
            rows={3}
            onChange={e => {
              e.preventDefault();
              setFormData({ ...formData, comments: e.target.value, timestamp: Date.now() });
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

FeedbackForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
};

export default FeedbackForm;
