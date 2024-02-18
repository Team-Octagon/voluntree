import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const UpcomingEventsCardVolunteer = ({ title, description, date, time, location, logoUrl }) => (
  <Card style={{ marginBottom: '20px' }}>
    <Card.Body>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {description}
          </Card.Text>
          <Card.Text>
            <strong>Date:</strong> {date}
          </Card.Text>
          <Card.Text>
            <strong>Time:</strong> {time}
          </Card.Text>
          <Card.Text>
            <strong>Location:</strong> {location}
          </Card.Text>
        </div>
        <div>
          <Image src={logoUrl} alt="Event Logo" style={{ height: '100px', width: '100px' }} />
        </div>
      </div>
    </Card.Body>
  </Card>
);

UpcomingEventsCardVolunteer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};
export default UpcomingEventsCardVolunteer;
