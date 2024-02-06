import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const OrganizationPage = () => (
  <Container id={PAGE_IDS.ORGANIZATION_PAGE} className="py-3">
    <h1>Organization Page</h1>
  </Container>
);

export default OrganizationPage;
