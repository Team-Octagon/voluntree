import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventFeedbackModal from './EventFeedbackModal';
import { Events } from '../../api/event/Events';

const formatDateToTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const PastEventCardVolunteer = ({ eventId }) => {
  const event = Events.findDoc(eventId);

  return (
    <Row className="p-2 border border-1 rounded-2 my-3">
      <Col><Image src={event.eventLogo} style={{ width: 250 }} /></Col>
      <Col sm={2}>
        <h5>{event.title}</h5>
      </Col>
      <Col lg={2}>
        <Row><div>{event.eventDate.toLocaleDateString('en-US')}</div></Row>
        <Row><div>From: {formatDateToTime(event.startTime)}</div></Row>
        <Row><div>To: {formatDateToTime(event.endTime)}</div></Row>
      </Col>
      <Col>
        <p>{event.description}</p>
      </Col>
      <Col>
        <p>Location: {event.location}</p>
      </Col>
      <Col lg={1}>
        <EventFeedbackModal eventId={eventId} />
      </Col>
    </Row>
  );
};

PastEventCardVolunteer.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default PastEventCardVolunteer;
