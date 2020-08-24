import React, {useState, useContext} from 'react';
import EventForm from './EventForm';
import {get12HourTimeString} from '../utils/generalUtils'
import { EventScheduleContext } from './Calendar';

function EventItem(props) {
    const {event} = props;
    const [editMode, setEditMode] = useState(false);
    const eventScheduleContext = useContext(EventScheduleContext);
    const deleteEvent = () => {
        eventScheduleContext.eventScheduleDispatch({
            type : 'DELETE_EVENT',
            date : props.date,
            event : event
        });
    }

    if (editMode){
        return (
            <EventForm 
                date = {props.date}
                closeFormCallBack = {() => {setEditMode(false)}}
                uid = {event.uid}
                subject = {event.subject}
                startTime = {event.startTime}
                endTime = {event.endTime}
                location = {event.location}
                description = {event.description}
            />
        )
    } else {
        return (
            <li className='event-card'>
                <div className='flex-bx flex-between row-middle pb5'>
                    <div className='card-title'>
                        <span className='event-subject mr10'>{event.subject}</span>
                        {event.startTime &&
                            <span>{get12HourTimeString(event.startTime)} - {get12HourTimeString(event.endTime)}</span>
                        }
                    </div>
                    <div className='flex-bx'>
                        <span className="icon anim-icon mr10" title='Edit' onClick={() => setEditMode(true)}>edit</span>
                        <span className="icon anim-icon" title='Delete' onClick={() => deleteEvent()}>delete_outline</span>
                    </div>
                </div>
                {event.location && 
                    <div className='flex-bx row-middle pb5'>
                        <span className="icon">location_on</span>
                        <span>{event.location}</span>
                    </div>
                }
                {event.description && 
                    <span>{event.description}</span>
                }
            </li>
        );
    }
}

export default EventItem;
