import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeedbackForm from "./FeedbackForm";

function EventFeedbackModal({event, onSubmit}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const formName = "feedback-form";

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Feedback
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback for {event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FeedbackForm event={event} formName={formName}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form={formName} type="submit" variant="primary" onClick={handleClose}>
                        Send Feedback
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EventFeedbackModal;