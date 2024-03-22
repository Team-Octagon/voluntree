import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import EventCard from './EventCard';

const VolunteerProfileDash = ({ eventData }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const upcomingEvents = eventData.filter(event => event.status === 'not started');
  const volunteerHistory = eventData.filter(event => event.status === 'completed');

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
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="upcoming">
                <h2>Upcoming Events</h2>
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                  />
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <h2>Volunteer History</h2>
                {volunteerHistory.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};

export default VolunteerProfileDash;
