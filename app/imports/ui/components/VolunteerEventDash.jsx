import React, { useState } from 'react';
import { Col, Container, Tab, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import EventCardTest from './EventCardTest';
import { UpcomingEvents } from '../../../public/dummy-data/EventData';

const VolunteerEventDash = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container fluid className="mt-4">
      <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          {UpcomingEvents.map((event, index) => (
            <Col key={index} sm={4} className="p-2" onClick={() => navigate(`./${event.id}`)}> {/* Use sm={4} to display 3 cards in a row, adjust as needed */}
              <EventCardTest
                title={event.title}
                description={event.description}
                tags={event.tags}
              />
            </Col>
          ))}
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default VolunteerEventDash;
