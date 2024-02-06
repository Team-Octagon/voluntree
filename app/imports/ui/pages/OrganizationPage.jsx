import React from 'react';
import { Container } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationProfileCard from '../components/OrganizationProfileCard';

const OrganizationPage = () => (
  <Container id={PAGE_IDS.ORGANIZATION_PAGE} className="py-3">
    <OrganizationProfileCard />
  </Container>
);

export default OrganizationPage;
