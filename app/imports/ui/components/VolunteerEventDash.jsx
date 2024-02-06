import React, { useState } from 'react';
import { Col, Container, Tab, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import EventCardTest from './EventCardTest';
import { UpcomingEvents } from '../../../public/dummy-data/EventData';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const VolunteerEventDash = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const filteredEvents = UpcomingEvents.filter(event => event.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <Container fluid className="mt-4">
      <Form.Control id={COMPONENT_IDS.SEARCH_EVENTS} type="text" value={search} placeholder="Search" onChange={e => { setSearch(e.target.value); }} />
      <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          {filteredEvents.map((event, index) => (
            <Col key={index} sm={4} className="p-2 d-flex justify-content-center" onClick={() => navigate(`./${event.id}`)}> {/* Use sm={4} to display 3 cards in a row, adjust as needed */}
              <EventCardTest
                id={COMPONENT_IDS.EVENT_TEST_CARD}
                eventLogo={event.eventLogo}
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
