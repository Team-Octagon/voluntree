import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import { Events } from '../../api/event/Events';
import OrganizationProfileCard from '../components/OrganizationProfileCard';
import OrganizationProfileDash from '../components/OrganizationProfileDash';
import LoadingSpinner from '../components/LoadingSpinner';

const OrganizationPage = () => {
  const { ready, email } = useTracker(() => {
    const sub1 = OrganizationProfiles.subscribe();
    const sub2 = OrganizationEvents.subscribeOrganizationEventsOrganization();
    const sub3 = Events.subscribeEventOrganization();
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = OrganizationProfiles.findOne({ email });
  const profileEvents = OrganizationEvents.find({ organization: email }).fetch();
  const eventData = Events.find({ _id: { $in: profileEvents.map((pe) => pe.event) } }).fetch();

  return ready ? (
    <Container id={PAGE_IDS.ORGANIZATION_PAGE} className="py-3">
      <OrganizationProfileCard
        profile={profile}
      />
      <OrganizationProfileDash
        eventData={eventData}
      />
    </Container>
  ) : <LoadingSpinner />;
};

export default OrganizationPage;
