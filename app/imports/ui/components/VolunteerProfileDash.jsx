import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

const VolunteerProfileDash = ({ eventData, subData }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const currentDate = new Date();

  const upcomingEvents = eventData
    .filter(event => new Date(event.startTime) > currentDate)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const volunteerHistory = eventData
    .filter(event => new Date(event.startTime) <= currentDate)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  const interestedEvents = subData
    .filter(event => new Date(event.startTime) > currentDate)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <Container fluid className="mt-4">
      <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming Events</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">Volunteer History</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="interested">Events Interested In</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="upcoming">
                <h2>Upcoming Events</h2>
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    eventId={event._id}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                    startTime={event.startTime}
                  />
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <h2>Volunteer History</h2>
                {volunteerHistory.map((event, index) => (
                  <EventCard
                    key={index}
                    eventId={event._id}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                    startTime={event.startTime}
                  />
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="interested">
                <h2>Events Interested In</h2>
                {interestedEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    eventId={event._id}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                    startTime={event.startTime}
                  />
                ))}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

VolunteerProfileDash.propTypes = {
  eventData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  subData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};

export default VolunteerProfileDash;
