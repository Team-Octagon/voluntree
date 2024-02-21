import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const SendMessage = () => (
  <Container id={PAGE_IDS.SEND_MESSAGE}>
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Email of Sender</Form.Label>
            <Form.Control type="text" placeholder="Beach Cleanup" disabled />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="email" placeholder="volunteer@example.com" disabled />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipient</Form.Label>
            <Form.Control type="email" placeholder="John" disabled />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipient</Form.Label>
            <Form.Control type="email" placeholder="Smith" disabled />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipient</Form.Label>
            <Form.Control type="email" placeholder="john@foo.com" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
);

export default SendMessage;
