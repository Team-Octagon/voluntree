import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileCard from '../components/VolunteerProfileCard';
import VolunteerProfileDash from '../components/VolunteerProfileDash';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminProfile = () => {

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = AdminProfiles.subscribe();
    return {
      ready: sub1.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = AdminProfiles.findOne({ email });
  return ready ? (
    <Container id={PAGE_IDS.ADMIN_PAGE} className="py-3">
      <VolunteerProfileCard
        profile={profile}
      />
      <VolunteerProfileDash />
    </Container>
  ) : <LoadingSpinner />;
};
export default AdminProfile;
