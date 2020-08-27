import React, {useState, useContext} from 'react';
import { EventScheduleContext } from './Calendar';
import EventForm from './EventForm';
import EventCard from './EventCard';

function EventItem(props) {
    const {event} = props;
    const [editMode, setEditMode] = useState(false);
    const eventScheduleContext = useContext(EventScheduleContext);
    const handleDeleteBtnClick = () => {
        eventScheduleContext.eventScheduleDispatch({
            type : 'DELETE_EVENT',
            event : event
        });
    }

    if (editMode){
        return (
            <EventForm 
                date = {props.date}
                closeFormCallBack = {() => {setEditMode(false)}}
                event = {event}
            />
        )
    } else {
        return (
            <li>
                <EventCard 
                    event = {event}
                    showEditOptions = {true}
                    handleDeleteBtnClick = {handleDeleteBtnClick}
                    handleEditBtnClick = {() => setEditMode(true)}
                />
            </li>
        );
    }
}

export default EventItem;
