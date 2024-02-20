import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileCard from '../components/VolunteerProfileCard';
import VolunteerProfileDash from '../components/VolunteerProfileDash';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const VolunteerProfile = () => {

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = VolunteerProfiles.subscribe();
    return {
      ready: sub1.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = VolunteerProfiles.findOne({ email });
  return ready ? (
    <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
      <VolunteerProfileCard
        firstName={profile.firstName}
        lastName={profile.lastName}
      />
      <VolunteerProfileDash />
    </Container>
  ) : <LoadingSpinner />;
};
export default VolunteerProfile;
