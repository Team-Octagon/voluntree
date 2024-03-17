import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartOrganizationTop = () => {

  const navigate = useNavigate();
  return (
    <div className="top-component">
      <Image src="/images/volunteer-team-stock-image.jpg" rounded />
      <Button variant="primary" onClick={() => navigate('/create-organization')}>Create Organization</Button>
    </div>
  );
};

export default StartOrganizationTop;
