import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { GearFill } from 'react-bootstrap-icons';
import VolunteerProfileSettingsCard from '../components/VolunteerProfileSettingsCard';
import VolunteerWavierSettingsCard from '../components/VolunteerWavierSettingsCard';
import VolunteerSecuritySettingsCard from '../components/VolunteerSecuritySettingsCard';
import VolunteerPreferencesSettingsCard from '../components/VolunteerPreferencesSettingsCard';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const VolunteerSettings = () => {
  const [activeSection, setActiveSection] = useState(COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER);

  const handleButtonClick = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const profileOffset = document.getElementById(COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER).offsetTop - 5;
      const waiversOffset = document.getElementById(COMPONENT_IDS.WAVIERS_SETTINGS_CARD_VOLUNTEER).offsetTop - 5;
      const preferencesOffset = document.getElementById(COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER).offsetTop - 80;
      const securityOffset = document.getElementById(COMPONENT_IDS.SECURITY_SETTINGS_CARD_VOLUNTEER).offsetTop + 200;

      if (scrollPosition >= profileOffset && scrollPosition < waiversOffset) {
        setActiveSection(COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER);
      } else if (scrollPosition >= waiversOffset && scrollPosition < preferencesOffset) {
        setActiveSection(COMPONENT_IDS.WAVIERS_SETTINGS_CARD_VOLUNTEER);
      } else if (scrollPosition >= preferencesOffset && scrollPosition < securityOffset) {
        setActiveSection(COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER);
      } else {
        setActiveSection(COMPONENT_IDS.SECURITY_SETTINGS_CARD_VOLUNTEER);
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
              variant={activeSection === COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER ? 'primary' : 'light'}
              onClick={() => handleButtonClick(COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER)}
              className="mb-2 d-block"
            >
              Profile
            </Button>
            <Button
              variant={activeSection === COMPONENT_IDS.WAVIERS_SETTINGS_CARD_VOLUNTEER ? 'primary' : 'light'}
              onClick={() => handleButtonClick(COMPONENT_IDS.WAVIERS_SETTINGS_CARD_VOLUNTEER)}
              className="mb-2 d-block"
            >
              Waivers
            </Button>
            <Button
              variant={activeSection === COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER ? 'primary' : 'light'}
              onClick={() => handleButtonClick(COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER)}
              className="mb-2 d-block"
            >
              Preferences
            </Button>
            <Button
              variant={activeSection === COMPONENT_IDS.SECURITY_SETTINGS_CARD_VOLUNTEER ? 'primary' : 'light'}
              onClick={() => handleButtonClick(COMPONENT_IDS.SECURITY_SETTINGS_CARD_VOLUNTEER)}
              className="d-block"
            >
              Security
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <VolunteerProfileSettingsCard id={COMPONENT_IDS.PROFILE_SETTINGS_CARD_VOLUNTEER} />
          <VolunteerWavierSettingsCard id={COMPONENT_IDS.WAVIERS_SETTINGS_CARD_VOLUNTEER} />
          <VolunteerPreferencesSettingsCard id={COMPONENT_IDS.PREFERENCES_SETTINGS_CARD_VOLUNTEER} />
          <VolunteerSecuritySettingsCard id={COMPONENT_IDS.SECURITY_SETTINGS_CARD_VOLUNTEER} />
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerSettings;
