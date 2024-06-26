import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

const OrganizationProfileDash = ({ eventData }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const upcomingEvents = eventData.filter(event => event.status === 'not started').sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  const pastEvents = eventData
    .filter(event => event.status === 'completed')
    .sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      return dateA - dateB;
    });

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
                <Nav.Link eventKey="history">Past Events</Nav.Link>
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
                <h2>Past Events</h2>
                {pastEvents.map((event, index) => (
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

OrganizationProfileDash.propTypes = {
  eventData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};

export default OrganizationProfileDash;
