import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UpcomingEventsCardVolunteer from './UpcomingEventsCardVolunteer';

const eventsData = [
  {
    title: 'Event 1',
    description: 'Description for Event 1',
    date: '2024-02-20',
    time: '15:00',
    location: 'Location 1',
    logoUrl: 'https://www.ecowatch.com/wp-content/uploads/2022/07/GettyImages-1353301481-scaled.jpg',
  },
  {
    title: 'Event 2',
    description: 'Description for Event 2',
    date: '2024-02-21',
    time: '18:30',
    location: 'Location 2',
    logoUrl: 'https://www.example.com/logo2.jpg',
  },
  // Add more event data as needed
];
const UpcomingEventsContainerVolunteer = () => (
  <Container className="mt-4">
    {eventsData.map((event, index) => (
      <UpcomingEventsCardVolunteer
        key={index}
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        location={event.location}
        logoUrl={event.logoUrl}
      />
    ))}
    <Container className="text-center mt-4">
      <Link to="/volunteer-list-events">
        <Button variant="primary">Find More Volunteer Opportunities</Button>
      </Link>
    </Container>
  </Container>
);

export default UpcomingEventsContainerVolunteer;
