import React, {useState, useContext} from 'react'
import { EventScheduleContext } from './Calendar'
import {isTimeStrInOrder} from '../utils/generalUtils'

function EventForm(props) {
    const eventDetails = props.event || {};
    const [subject, setSubject] = useState(eventDetails.subject || '');
    const [startTime, setStartTime] = useState(eventDetails.startTime || '');
    const [endTime, setEndTime] = useState(eventDetails.endTime || '');
    const [location, setLocation] = useState(eventDetails.location || '');
    const [description, setDescription] = useState(eventDetails.description || '');
    const [subjectErrorMessage, setSubjectErrorMessage] = useState('')
    const [timeErrorMessage, setTimeErrorMessage] = useState('')
    const eventScheduleContext = useContext(EventScheduleContext);
    
    const validateForm = () => {
        let isValid = true;
        if (subject.trim() === ''){
            setSubjectErrorMessage('Subject cannot be empty');
            isValid = false;
        }
        if (startTime && !isTimeStrInOrder(startTime, endTime)){
            setTimeErrorMessage('End Time must be ahead of start time')
            isValid = false;
        }
        return isValid;
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        const isValid = validateForm();
        if (isValid){
            const dispatchType = eventDetails.uid ? 'EDIT_EVENT' : 'ADD_EVENT';
            const uid = eventDetails.uid;
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
        }
    };

    return (
        <li className='event-card'>
            <form className='event-form' onSubmit={handleFormSubmit}>
                <span className="form-row">
                    <label htmlFor="subject">Subject *</label>
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
                {subjectErrorMessage && 
                    <div className="form-validation-error">{subjectErrorMessage}</div>
                }
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
                {timeErrorMessage && 
                    <div className="form-validation-error">{timeErrorMessage}</div>
                }
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
