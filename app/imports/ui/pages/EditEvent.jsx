import React, { useRef } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, NumField, TextField, DateField, LongTextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Events, eventTags } from '../../api/event/Events';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Events._schema);

const EditEvent = () => {
  const { _id } = useParams();
  const formRef = useRef(null);

  const { doc, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = rdy ? Events.findOne(_id) : null;
    return { doc: document, ready: rdy };
  }, [_id]);

  const submit = (data) => {
    const updateData = { id: _id, ...data };
    updateMethod.callPromise({ collectionName: Events.getCollectionName(), updateData })
      .then(() => {
        swal('Success', 'Event updated successfully', 'success');
        formRef.current.reset();
      })
      .catch(error => swal('Error', error.message, 'error'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className="text-center mb-4">Edit Event</h2>
          <AutoForm ref={formRef} schema={bridge} onSubmit={submit} model={doc}>
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
                    <SelectField name="tags" placeholder="Select Tags" multiple allowedValues={eventTags} />
                  </Col>
                </Row>
                <ErrorsField />
                <div className="text-center">
                  <Button type="submit" variant="primary">Update</Button>
                </div>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
