import React from 'react';
import PropTypes from 'prop-types';
import {Events} from "../../api/event/Events";
import {Col, Image, Row} from "react-bootstrap";

// const UpcomingEventsCardVolunteer = ({ title, description, date, time, location, logoUrl }) => (
//   <Card style={{ marginBottom: '20px' }}>
//     <Card.Body>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>
//           <Card.Title>{title}</Card.Title>
//           <Card.Text>
//             <strong>Description:</strong> {description}
//           </Card.Text>
//           <Card.Text>
//             <strong>Date:</strong> {date}
//           </Card.Text>
//           <Card.Text>
//             <strong>Time:</strong> {time}
//           </Card.Text>
//           <Card.Text>
//             <strong>Location:</strong> {location}
//           </Card.Text>
//         </div>
//         <div>
//           <Image src={logoUrl} alt="Event Logo" style={{ height: '100px', width: '100px' }} />
//         </div>
//       </div>
//     </Card.Body>
//   </Card>
// );

const formatDateToTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const UpcomingEventsCardVolunteer = ({ eventId }) => {
  const event = Events.findDoc(eventId);

  return (
      <Row className="p-2 border border-1 rounded-2 my-3">
        <Col><Image src={event.eventLogo} style={{width: 250}}/></Col>
        <Col sm={2}>
          <h5>{event.title}</h5>
        </Col>
        <Col lg={2}>
            <Row><div>{event.eventDate.toLocaleDateString('en-US')}</div></Row>
            <Row><div>From: {formatDateToTime(event.startTime)}</div></Row>
            <Row><div>To: {formatDateToTime(event.endTime)}</div></Row>
        </Col>
        <Col>
          <p>{event.description}</p>
        </Col>
        <Col>
          <p>Location: {event.location}</p>
        </Col>
      </Row>
  );
};

UpcomingEventsCardVolunteer.propTypes = {
  eventId: PropTypes.string.isRequired,
};
export default UpcomingEventsCardVolunteer;
