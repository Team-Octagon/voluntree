import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Feedback } from '../../api/feedback/Feedback';
import LoadingSpinner from './LoadingSpinner';
import FeedbackListRow from './FeedbackListRow';

const FeedbackList = ({ eventId }) => {
  const { doc, ready } = useTracker(() => {
    const subscription = Feedback.subscribeFeedbackVolunteer();
    const rdy = subscription.ready();
    const document = rdy ? Feedback.find({ eventId }).fetch() : null;
    return { doc: document, ready: rdy };
  });

  return ready ? (
    <>
      {doc.map(feedback => <FeedbackListRow feedbackId={feedback._id} />)}
    </>
  ) : <LoadingSpinner />;
};

FeedbackList.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default FeedbackList;
