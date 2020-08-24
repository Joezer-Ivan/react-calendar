import React, {useState, useContext} from 'react'
import { EventScheduleContext } from './Calendar';

function EventForm(props) {
    const [subject, setSubject] = useState(props.subject || '');
    const [startTime, setStartTime] = useState(props.startTime || '');
    const [endTime, setEndTime] = useState(props.endTime || '');
    const [location, setLocation] = useState(props.location || '');
    const [description, setDescription] = useState(props.description || '');

    const eventScheduleContext = useContext(EventScheduleContext);
    
    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        const dispatchType = props.uid ? 'EDIT_EVENT' : 'ADD_EVENT';
        const uid = props.uid;
        const event = {
            uid,
            subject,
            startTime,
            endTime,
            location,
            description
        };
        eventScheduleContext.eventScheduleDispatch({
            type : dispatchType,
            date : props.date,
            event : event
        });
        props.closeFormCallBack();
    };

    return (
        <li className='event-card'>
            <form className='event-form' onSubmit={handleFormSubmit}>
                <span className="form-row">
                    <label htmlFor="subject">Subject</label>
                    <input
                        name="subject"
                        type="type"
                        maxLength="30"
                        placeholder={'Event subject'}
                        autoFocus={true}
                        value={subject}
                        onChange={(ev) => setSubject(ev.target.value)}
                    />
                </span>
                <span className="form-row">
                    <label htmlFor="startTime">Start time</label>
                    <input
                        className="mr10"
                        name="startTime"
                        type="time"
                        value={startTime}
                        onChange={(ev) => setStartTime(ev.target.value)}
                    />
                    <label htmlFor="endTime">End time</label>
                    <input
                        name="endTime"
                        type="time"
                        value={endTime}
                        onChange={(ev) => setEndTime(ev.target.value)}
                    />
                </span>
                <span className="form-row">
                    <label htmlFor="location">Location</label>
                    <input
                        name="location"
                        type="text"
                        value={location}
                        onChange={(ev) => setLocation(ev.target.value)}
                    />
                </span>
                <span className="form-row">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        type="text"
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                    />
                </span>

                <button type="submit" className="mr10 btn-primary">Save</button>
                <button type="cancel" onClick={() => props.closeFormCallBack()}>Cancel</button>
            </form>
        </li>
    )
}

export default EventForm
