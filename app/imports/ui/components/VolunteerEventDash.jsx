import React, { useState } from 'react';
import { Col, Container, Tab, Row } from 'react-bootstrap';
import EventCardTest from './EventCardTest';

const VolunteerEventDash = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Sample data for upcoming events
  const UpcomingEvents = [
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

  return (
    <Container fluid className="mt-4">
      <Tab.Container id="dashboard-tabs" activeKey={activeTab} onSelect={handleTabChange}>
        <Row>
          {UpcomingEvents.map((event, index) => (
            <Col key={index} sm={4}> {/* Use sm={4} to display 3 cards in a row, adjust as needed */}
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
