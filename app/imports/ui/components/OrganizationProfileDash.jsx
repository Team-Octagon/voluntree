import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row, Card } from 'react-bootstrap';
import EventCard from './EventCard';

const OrganizationProfileDash = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderEvents = (events) => events.map((event, index) => (
    <Card key={index} className="mb-3">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
      </Card.Body>
    </Card>
  ));

  // Sample data for upcoming events
  const upcomingEvents = [
    { title: 'Bark in the Park',
      description: 'Enjoy games, competitions, and activities for both pets and their owners. Learn about responsible pet ownership and adoption opportunities while socializing with other pet lovers.',
      tags: ['Community', 'Pets', 'Adoption'] },
    { title: 'Paws for a Cause Walkathon',
      description: 'Lace up your sneakers and bring your four-legged companions for a charity walk to support animal welfare. Walk alongside fellow animal lovers while raising funds for shelter animals in need.',
      tags: ['Fundraiser', 'Pets', 'Community'] },
    { title: 'Wagging Tails Volunteer Day',
      description: 'Calling all volunteers! Join us for a day of hands-on activities at the animal shelter. Help with cleaning, grooming, and socializing shelter animals to prepare them for adoption.',
      tags: ['Community', 'Community'] },
  ];

  const pastEvents = [
    { title: 'Shelter Pet Adoption Day',
      description: 'Help find loving homes for shelter animals by volunteering at our Pet Adoption Day. Spend time with adorable pets and assist potential adopters in finding their perfect match.',
      tags: ['Animals', 'Adoption', 'Community'] },
    { title: 'Pet Adoption Drive',
      description: 'Help us find forever homes for adorable shelter pets! Visit our adoption drive to meet loving cats and dogs in need of a family. Enjoy discounted adoption fees, pet care workshops, and giveaways throughout the day.',
      tags: ['Adoption', 'Pets', 'Community'] },
  ];

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
                <Nav.Link eventKey="history">Previous Events</Nav.Link>
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
                {renderEvents(pastEvents)}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default OrganizationProfileDash;
