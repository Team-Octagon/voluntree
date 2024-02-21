import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import {useTracker} from "meteor/react-meteor-data";
import {Events} from "../../api/event/Events";
import {VolunteerProfiles} from "../../api/user/VolunteerProfileCollection";

// Displays example stats for the volunteer when they use the dashboard page.
const StatsContainerVolunteer = () => {
  const { eventsData } = useTracker(() => {
    Events.subscribeEventVolunteer();
    // Get the Event documents
    const items = Events.find({}).fetch();
    return {
      eventsData: items,
    };
  }, []);

  const totalHours = eventsData.reduce((a, event) => a + Events.totalHoursOfEvent(event), 0);

  return (<Container id={PAGE_IDS.DASHBOARD_STATS_VOLUNTEER} className="mt-4">
    <Row>
      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">⏳</p>
            <Card.Title>Hours Volunteered</Card.Title>
            <Card.Text>{totalHours} hours</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">💵</p>
            <Card.Title>Impact Value</Card.Title>
            <Card.Text>$486.92</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">🙌</p>
            <Card.Title>Attended Events</Card.Title>
            <Card.Text>{eventsData.length} events</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <p className="text-center display-5">🏅</p>
            <Card.Title>Badges</Card.Title>
            <Card.Text>Gold Volunteer</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>)
};

export default StatsContainerVolunteer;
