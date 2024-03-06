import React from 'react';
import PropTypes from 'prop-types';
import { Feedback } from '../../api/feedback/Feedback';
import { VolunteerProfiles } from '../../api/user/VolunteerProfileCollection';

Feedback.subscribeFeedbackVolunteer();

const FeedbackListRow = ({ feedbackId }) => {
  const feedback = Feedback.findOne(feedbackId);
  const user = VolunteerProfiles.getProfile(feedback.userId);

  return (
    <div className="text-center">
      <h5 className="d-inline">{user.firstName}: </h5>
      <p className="d-inline">{feedback.comments}</p>
      <p>{feedback.timestamp.toLocaleString()}</p>
    </div>
  );
};

FeedbackListRow.propTypes = {
  feedbackId: PropTypes.string.isRequired,
};
export default FeedbackListRow;
