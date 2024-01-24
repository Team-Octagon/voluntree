import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import {useParams} from "react-router";
import {getEventById} from "../../../public/dummy-data/EventData";

const VolunteerEventDetail = () => {
    let params = useParams()
    let eventData = getEventById(params.eventId)
    return (
        <Container>
            { eventData ?
                <>
                    <h1>{eventData.title}</h1>
                    <ul>
                        {eventData.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    <p>{eventData.description}</p>
                    <p>Contact us at <a href="#">{eventData.email}</a></p>
                    <Button>Contribute</Button>
                </>


                : <h1>not found</h1>
            }
        </Container>
        )
};

export default VolunteerEventDetail;
