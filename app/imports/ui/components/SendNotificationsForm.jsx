import React, { useState } from 'react';
import swal from 'sweetalert';
import { Form, Button, Modal } from 'react-bootstrap';
import { Notifications } from '../../api/notifications/Notifications';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const SendNotificationForm = () => {
  const [recipients, setRecipients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleAddRecipient = () => {
    if (newRecipient.trim() !== '') {
      setRecipients([...recipients, newRecipient]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const collectionName = Notifications.getCollectionName();

    if (subject.trim() === '' || message.trim() === '') {
      swal('Error', 'Subject and Message are required', 'error');
      return;
    }

    const definitionData = {
      userIds: recipients,
      message,
      subject,
      createdAt: new Date(),
    };

    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Notification sent successfully', 'success');
        setRecipients([]);
        setSubject('');
        setMessage('');
      })
      .catch(error => swal('Error', error.message, 'error'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="recipients">
        <Form.Label>Recipients:</Form.Label>
        <div>
          {recipients.map((recipient, index) => (
            <span key={index} className="recipient">
              {recipient}
              <Button
                variant="link"
                size="sm"
                className="remove-recipient"
                onClick={() => handleRemoveRecipient(index)}
              >
                Remove
              </Button>
            </span>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={handleShowModal}>
          Add
        </Button>
      </Form.Group>

      <Form.Group controlId="subject">
        <Form.Label>Subject:</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchRecipient">
            <Form.Label>Enter Email of Recipient:</Form.Label>
            <Form.Control
              type="text"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRecipient}>
            Add Recipient
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default SendNotificationForm;
