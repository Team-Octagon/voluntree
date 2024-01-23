import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row } from 'react-bootstrap';
import EventCard from './EventCard';

const VolunteerEventDash = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Sample data for upcoming events
  const EventInformation = [
    { title: 'Beach Cleanup',
      description: 'Join us for a day of environmental action and community ' +
          'bonding as we come together to make a positive impact on our beautiful coastline! Our Beach Cleanup event is all about giving back to nature and preserving the pristine beauty of our shores.',
      tags: ['Community', 'Environment', 'Conservation'] },
  ];

  const OrganizationInformation = [
    { title: 'EcoShore Cleanup Solutions',
      description: 'At EcoShore, we are passionate about making a ' +
          'positive impact on our environment, starting with the preservation of our precious shorelines. We specialize in organizing and executing comprehensive beach cleanup initiatives to combat pollution and promote sustainability.',
      tags: ['Community', 'Environment', 'Conservation'] },
  ];

  return (
    <Container fluid className="mt-4">
      <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Event Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="history">Organization Information</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="upcoming">
                <h2>Event Details</h2>
                {EventInformation.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    tags={event.tags}
                  />
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <h2>Organization Information</h2>
                {OrganizationInformation.map((event, index) => (
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

export default VolunteerEventDash;
