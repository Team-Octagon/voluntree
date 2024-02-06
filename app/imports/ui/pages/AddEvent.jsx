import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Events';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
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
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddEvent page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, organizer, eventDate, location, description, eventLogo, startTime, endTime, volunteersNeeded } = data;
    const owner = Meteor.user().username;
    const collectionName = Events.getCollectionName();
    const definitionData = { title, organizer, eventDate, location, description, eventLogo, startTime, endTime, volunteersNeeded, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="organizer" />
                <DateField name="eventDate" />
                <TextField name="location" />
                <TextField name="description" />
                <TextField name="eventLogo" />
                <TextField name="startTime" />
                <TextField name="endTime" />
                <NumField name="volunteersNeeded" decimal={null} />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
