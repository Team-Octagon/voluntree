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

const formSchema = new SimpleSchema({
  title: String,
  organizer: String,
  eventDate: Date,
  location: String,
  description: String,
  eventLogo: String,
  startTime: String,
  endTime: {
    type: String,
    optional: true,
  },
  volunteersNeeded: Number,
  tags: {
    type: Array, // Specify that tags is an array
    defaultValue: [], // Ensuring default is an empty array
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
      await defineMethod.callPromise({ collectionName, definitionData });
      return definitionData;
    } catch (error) {
      throw new Error('Failed to define event');
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
