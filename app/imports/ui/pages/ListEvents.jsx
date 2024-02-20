import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Events';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import EventItem from '../components/EventItem';

/* Renders a table containing all of the Event documents. Use <EventItem> to render each row. */
const ListEvents = () => {
  // useTracker connects Meteor data to React components.
  const { ready, events } = useTracker(() => {
    // Subscribe to the Events collection.
    const subscription = Events.subscribeEventAdmin();
    // Determine if the subscription is ready.
    const rdy = subscription.ready();
    // Get the Event documents.
    const eventItems = Events.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container id={PAGE_IDS.LIST_EVENTS} className="py-3">
        <Row className="justify-content-center">
          <Col md={12}> {/* Adjusted for potential additional width requirement */}
            <div className="text-center"> {/* Changed from <Col> to <div> for proper usage */}
              <h2>List Events</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Organizer</th>
                  <th>Event Date</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Volunteers Needed</th>
                  <th>Status</th>
                  <th>Tags</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => <EventItem key={event._id} event={event} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListEvents;
