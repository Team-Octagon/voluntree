import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import VolunteerProfileCard from '../components/VolunteerProfileCard';
import VolunteerProfileDash from '../components/VolunteerProfileDash';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { VolunteerProfileEvents } from '../../api/user/VolunteerProfileEvents';
import { Events } from '../../api/event/Events';

const VolunteerProfile = () => {

  const { ready, email } = useTracker(() => {
    const sub1 = VolunteerProfiles.subscribe();
    const sub2 = VolunteerProfileEvents.subscribeVolunteerProfileEventsVolunteer();
    const sub3 = Events.subscribeEventVolunteer();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = VolunteerProfiles.findOne({ email });
  const profileEvents = VolunteerProfileEvents.find({ volunteer: email }).fetch();
  const eventData = Events.find({ _id: { $in: profileEvents.map((pe) => pe.event) } }).fetch();

  return ready ? (
    <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
      <VolunteerProfileCard
        profile={profile}
      />
      <VolunteerProfileDash
        eventData={eventData}
      />
    </Container>
  ) : <LoadingSpinner />;
};
export default VolunteerProfile;
