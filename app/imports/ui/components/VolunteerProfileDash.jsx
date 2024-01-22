import React, { useState } from 'react';
import { Col, Container, Nav, Tab, Row, Card } from 'react-bootstrap';
import EventCard from './EventCard';

const VolunteerProfileDash = () => {
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
    { title: 'Tree Planting Day',
      description: 'Join us in making our community greener by planting trees in local parks. Learn about environmental conservation and contribute to a sustainable future.',
      tags: ['Community', 'Environment', 'Conservation'] },
    { title: 'Coding Workshop for Kids',
      description: 'Help teach coding to underprivileged kids. Make a positive impact on their future by introducing them to the world of technology and programming.',
      tags: ['Education', 'Technology', 'Youth'] },
    { title: 'Health and Wellness Fair',
      description: 'Contribute to a healthier community by participating in our Health and Wellness Fair. Provide health screenings, fitness tips, and promote overall well-being.',
      tags: ['Community', 'Health', 'Wellness'] },
    { title: 'Mural Painting Project',
      description: 'Express your creativity and beautify public spaces through our Mural Painting Project. Join local artists in transforming blank walls into vibrant works of art.',
      tags: ['Arts', 'Creativity', 'Community'] },
    { title: 'Shelter Pet Adoption Day',
      description: 'Help find loving homes for shelter animals by volunteering at our Pet Adoption Day. Spend time with adorable pets and assist potential adopters in finding their perfect match.',
      tags: ['Animals', 'Adoption', 'Community'] },
    { title: 'Cultural Exchange Festival',
      description: 'Embrace diversity and foster cultural understanding at our Cultural Exchange Festival. Engage in activities, performances, and discussions that celebrate our global community.',
      tags: ['Diversity', 'Culture', 'Community'] },
  ];

  const volunteerHistory = [
    { title: 'Event 3', description: 'Description for Event 3' },
    { title: 'Event 4', description: 'Description for Event 4' },
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
                {renderEvents(volunteerHistory)}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default VolunteerProfileDash;
