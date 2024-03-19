import React, { useRef, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

const bridge = new SimpleSchema2Bridge(VolunteerProfiles._schema);

const EditProfileCard = ({ profile }) => {
  const [show, setShow] = useState(false);
  const formRef = useRef(null);

  const handleClose = () => {
    console.log('EditProfileCard.handleClose');
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const submit = (data) => {
    console.log('EditProfileCard.submit', data);
    const collectionName = VolunteerProfiles.getCollectionName();
    const updateData = { id: profile._id, ...data };
    console.log('EditProfileCard.submit', collectionName, updateData);
    updateMethod.callPromise({ collectionName, updateData })
      .then(() => {
        swal('Success', 'Updated successfully', 'success');
        setShow(false);
        window.location.reload();
      })
      .catch(error => swal('Error', error.message, 'error'));
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <AutoForm id="editForm" ref={formRef} schema={bridge} onSubmit={submit} model={profile}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LongTextField name="bio" placeholder="Bio" />
            <ErrorsField />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" form="editForm">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </AutoForm>
    </Container>
  );
};

EditProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProfileCard;
