import React, { useRef } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, TextField, DateField, LongTextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events, eventTags } from '../../api/event/Events';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Adjusted schema definition for multiple tag selection
const formSchema = new SimpleSchema({
  title: String,
  organizer: { type: String, index: true, unique: false },
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

  const submit = (data) => {
    const owner = Meteor.user()?.username;
    const collectionName = Events.getCollectionName();
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        formRef.current.reset();
      })
      .catch(error => swal('Error', error.message, 'error'));
  };

  return (
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
                    <TextField name="organizer" placeholder="Organizer" />
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
  );
};

export default AddEvent;
