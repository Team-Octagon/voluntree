import React from "react";
import {Feedback} from "../../api/feedback/Feedback";
import {useTracker} from "meteor/react-meteor-data";
import LoadingSpinner from "./LoadingSpinner";
import FeedbackListRow from "./FeedbackListRow";

const FeedbackList = ({ eventId }) => {
    const { doc, ready } = useTracker(() => {
        const subscription = Feedback.subscribeFeedbackVolunteer();
        const ready = subscription.ready();
        const doc = ready ? Feedback.find({eventId}).fetch() : null;
        return { doc, ready };
    });

    return ready ? (
        <>
            {doc.map(feedback => <FeedbackListRow feedbackId={feedback._id}/>)}
        </>
    ) : <LoadingSpinner />;
}

export default FeedbackList