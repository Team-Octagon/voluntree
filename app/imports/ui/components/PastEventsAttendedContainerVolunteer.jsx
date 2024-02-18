import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PastEventCardVolunteer from './PastEventCardVolunteer';

const pastEventsData = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '2022-01-01',
    location: 'Event Location 1',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2022-02-15',
    location: 'Event Location 2',
  },
];
const UpcomingEventsContainerVolunteer = () => (
  <Container>
      {pastEventsData.map((event) => (
          <PastEventCardVolunteer title={event.title} date={event.date} />
      ))}
  </Container>
);

export default UpcomingEventsContainerVolunteer;
