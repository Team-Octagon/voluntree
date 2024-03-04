import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import VolunteerProfileSettingsCard from '../components/VolunteerProfileSettingsCard';

const PAGE_IDS = {
  PROFILE: 'profile',
  WAIVERS: 'waivers',
  PREFERENCES: 'preferences',
  SECURITY: 'security',
};

const VolunteerSettings = () => {
  const [activeSection, setActiveSection] = useState(PAGE_IDS.PROFILE);

  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const profileOffset = document.getElementById(PAGE_IDS.PROFILE).offsetTop - 50;
      const waiversOffset = document.getElementById(PAGE_IDS.WAIVERS).offsetTop - 50;
      const preferencesOffset = document.getElementById(PAGE_IDS.PREFERENCES).offsetTop - 50;
      const securityOffset = document.getElementById(PAGE_IDS.SECURITY).offsetTop - 50;

      if (scrollPosition < waiversOffset) {
        setActiveSection(PAGE_IDS.PROFILE);
      } else if (scrollPosition < preferencesOffset) {
        setActiveSection(PAGE_IDS.WAIVERS);
      } else if (scrollPosition < securityOffset) {
        setActiveSection(PAGE_IDS.PREFERENCES);
      } else {
        setActiveSection(PAGE_IDS.SECURITY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container className="py-3">
      <Row>
        <Col md={3}>
          <div className="position-sticky" style={{ top: '50px', left: '0px' }}>
            <h2 style={{ marginTop: '15px' }}>Settings <GearFill /></h2>
            <Button
              variant={activeSection === PAGE_IDS.PROFILE ? 'primary' : 'light'}
              onClick={() => handleButtonClick(PAGE_IDS.PROFILE)}
              className="mb-2 d-block"
            >
              Profile
            </Button>
            <Button
              variant={activeSection === PAGE_IDS.WAIVERS ? 'primary' : 'light'}
              onClick={() => handleButtonClick(PAGE_IDS.WAIVERS)}
              className="mb-2 d-block"
            >
              Waivers
            </Button>
            <Button
              variant={activeSection === PAGE_IDS.PREFERENCES ? 'primary' : 'light'}
              onClick={() => handleButtonClick(PAGE_IDS.PREFERENCES)}
              className="mb-2 d-block"
            >
              Preferences
            </Button>
            <Button
              variant={activeSection === PAGE_IDS.SECURITY ? 'primary' : 'light'}
              onClick={() => handleButtonClick(PAGE_IDS.SECURITY)}
              className="d-block"
            >
              Security
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <VolunteerProfileSettingsCard />
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerSettings;
