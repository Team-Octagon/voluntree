import React from 'react';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OrganizationProfiles } from '../../api/user/OrganizationProfileCollection';
import { OrganizationEvents } from '../../api/user/OrganizationEvents';
import { Events } from '../../api/event/Events';
import OrganizationProfileCard from '../components/OrganizationProfileCard';
import OrganizationProfileDash from '../components/OrganizationProfileDash';
import LoadingSpinner from '../components/LoadingSpinner';

const OrganizationPage = () => {
  const { _id } = useParams();

  const { ready } = useTracker(() => {
    const sub1 = OrganizationProfiles.subscribe();
    const sub2 = OrganizationEvents.subscribeOrganizationEvents();
    const sub3 = OrganizationEvents.subscribeOrganizationEventsOrganization();
    const sub4 = OrganizationEvents.subscribeOrganizationEventsAdmin();
    const sub5 = OrganizationEvents.subscribeOrganizationEventsVolunteer();
    const sub6 = Events.subscribeEvent();

    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
    };
  }, [_id]);

  const email = OrganizationProfiles.findOne({ _id })?.email;
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
