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
import { VolunteerProfileSubs } from '../../api/user/VolunteerProfileSubscriptions';

const VolunteerProfile = () => {

  const { ready, email } = useTracker(() => {
    const sub1 = VolunteerProfiles.subscribe();
    const sub2 = VolunteerProfileEvents.subscribeVolunteerProfileEventsVolunteer();
    const sub3 = Events.subscribeEventVolunteer();
    const sub4 = VolunteerProfileSubs.subscribeVolunteerProfileSubsVolunteer();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = VolunteerProfiles.findOne({ email });
  const profileEvents = VolunteerProfileEvents.find({ volunteer: email }).fetch();
  const profileSubs = VolunteerProfileSubs.find({ volunteer: email }).fetch();
  const eventData = Events.find({ _id: { $in: profileEvents.map((pe) => pe.event) } }).fetch();
  const subData = Events.find({ _id: { $in: profileSubs.map((ps) => ps.event) } }).fetch();

  return ready ? (
    <Container id={PAGE_IDS.VOLUNTEER_PROFILE} className="py-3">
      <VolunteerProfileCard
        profile={profile}
      />
      <VolunteerProfileDash
        eventData={eventData}
        subData={subData}
      />
    </Container>
  ) : <LoadingSpinner />;
};
export default VolunteerProfile;
