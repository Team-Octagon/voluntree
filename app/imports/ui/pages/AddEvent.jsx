import React, { useRef, useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, TextField, DateField, LongTextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events, eventTags } from '../../api/event/Events';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapCoordinates } from '../../api/maps/MapCoordinates';

const formSchema = new SimpleSchema({
  title: String,
  organizer: String,
  eventDate: {
    type: Date,
    custom() {
      const eventDate = this.value;
      if (eventDate <= new Date()) {
        return 'eventDateMustBeFuture';
      }
    },
  },
  location: String,
  description: String,
  eventLogo: String,
  startTime: {
    type: String,
    custom() {
      const startTime = this.value;
      if (startTime && new Date(startTime) <= new Date()) {
        return 'startTimeMustBeFuture';
      }
    },
  },
  endTime: {
    type: String,
    optional: true,
    custom() {
      const endTime = this.value;
      if (endTime && new Date(endTime) <= new Date()) {
        return 'endTimeMustBeFuture';
      }
    },
  },
  volunteersNeeded: {
    type: SimpleSchema.Integer,
    min: 0,
  },
  tags: {
    type: Array,
    defaultValue: [],
  },
  'tags.$': {
    type: String,
    allowedValues: eventTags,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddEvent = () => {
  const formRef = useRef(null);
  const [organizerName, setOrganizerName] = useState('Organizer');

  const { ready, organizationName } = useTracker(() => {
    const user = Meteor.user();
    const sub1 = OrganizationProfiles.subscribe();
    const sub2 = Events.subscribeEventOrganization();
    let organizationNameTemp = 'Organizer'; // Default placeholder

    if (user) {
      // Adjust according to your schema, assuming email is in the profile
      const email = user.emails && user.emails[0].address;
      const organizationProfile = OrganizationProfiles.findOne({ email: email });
      if (organizationProfile) {
        organizationNameTemp = organizationProfile.name;
      }
    }
    return {
      ready: sub1.ready() && sub2.ready(),
      organizationName: organizationNameTemp,
    };
  }, []);

  useEffect(() => {
    setOrganizerName(organizationName);
  }, [organizationName]);

  const defineEvent = async (data) => {
    const collectionName = Events.getCollectionName();
    const definitionData = { ...data };

    try {
      const eventId = await defineMethod.callPromise({ collectionName, definitionData });
      console.log(`Event ID: ${eventId}`);
      return definitionData;
    } catch (error) {
      throw new Error('Failed to define event');
    }
  };

  const handleCoordinateAdd = async (address, eventId) => {
    try {
      const collectionName = MapCoordinates.getCollectionName();
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();
      console.log(data);

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const result = await defineMethod.callPromise({ collectionName, definitionData: { lat, lon, eventId: eventId } });
        console.log('Test message added with ID:', result);
      } else {
        throw new Error('Coordinates not found for the provided address.');
      }
    } catch (error) {
      console.error('Error adding test message:', error);
    }
  };

  const defineOrganizationEvent = (data) => {
    const collectionName = OrganizationEvents.getCollectionName();
    const organizationEmail = OrganizationProfiles.findOne({ name: data.organizer }).email;
    const eventID = Events.findOne({ title: data.title })._id;
    const definitionData = { organization: organizationEmail, event: eventID };
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        formRef.current.reset();
        handleCoordinateAdd(data.location, eventID);
      })
      .catch((error) => {
        swal('Error', error.message, 'error ?');
      });
  };

  const submit = async (data) => {
    try {
      const eventData = await defineEvent(data);
      defineOrganizationEvent(eventData);
    } catch (error) {
      swal('Error', error.message, 'error');
    }
  };

  return ready ? (
    <Container id={PAGE_IDS.ADD_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-4">Add New Event</h2>
          <AutoForm ref={formRef} schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <TextField name="title" placeholder="Title" />
                  </Col>
                  <Col sm={6}>
                    <TextField name="organizer" value={organizerName} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <DateField name="eventDate" placeholder="Event Date" />
                  </Col>
                  <Col sm={6}>
                    <TextField name="location" placeholder="Location" />
                  </Col>
                </Row>
                <LongTextField name="description" placeholder="Description" />
                <TextField name="eventLogo" placeholder="Event Logo URL" />
                <Row>
                  <Col sm={6}>
                    <DateField name="startTime" placeholder="Start Time" />
                  </Col>
                  <Col sm={6}>
                    <DateField name="endTime" placeholder="End Time" />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <NumField name="volunteersNeeded" decimal={false} placeholder="Volunteers Needed" />
                  </Col>
                  <Col sm={6}>
                    <SelectField name="tags" placeholder="Select Tags" multiple />
                  </Col>
                </Row>
                <ErrorsField />
                <div className="text-center">
                  <Button type="submit" variant="primary">Submit</Button>
                </div>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AddEvent;
