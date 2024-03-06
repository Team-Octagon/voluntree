import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Events';
import {VolunteerProfiles} from "../../api/user/VolunteerProfileCollection";

VolunteerProfiles.subscribe();

const FeedbackForm = ({ eventId, formName }) => {
  const event = Events.findDoc(eventId);
  const profile = VolunteerProfiles.getProfile(Meteor.userId());

  return (
    <Container>
      <Form id={formName}>
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
          <Form.Control as="textarea" rows={3} />
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
