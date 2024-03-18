import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { OrganizationRequests } from '../../api/requests/OrganizationRequests';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * CreateOrganization component is similar to signin component, but we create a request for new organization user instead.
 */
const CreateOrganization = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    organizationName: String,
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle CreateOrganization submission. Create request for an organization entry, then redirect to the home page. */
  const submit = (doc) => {
    const collectionName = OrganizationRequests.getCollectionName();
    const definitionData = doc;
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Request made', 'success');
        setError('');
        setRedirectToRef(true);
      })
      .catch((err) => setError(err.reason));
  };

  /* Display the request form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to="/" />;
  }
  return (
    <Container id={PAGE_IDS.CREATE_ORGANIZATION} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your organization</h2>
            <h5>and start finding volunteer opportunities.</h5>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.CREATE_ORGANIZATION_FORM_NAME} name="organizationName" placeholder="Organization name" />
                <TextField id={COMPONENT_IDS.CREATE_ORGANIZATION_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.CREATE_ORGANIZATION_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.CREATE_ORGANIZATION_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Already have an organization? Login <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateOrganization;
