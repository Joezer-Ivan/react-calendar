import React, {useState, useContext} from 'react'
import { EventScheduleContext } from './Calendar'
import { isTimeStrInAscendingOrder, convertDateObjToTimeString, convertTimeStringToDateObj } from '../utils/generalUtils'

function EventForm(props) {
    const eventDetails = props.event || {};
    const [subject, setSubject] = useState(eventDetails.subject || '');
    const [startTimeString, setStartTimeString] = useState(convertDateObjToTimeString(eventDetails.startDateTime) || '08:00'); //converting the dateTime object to a time string of the format HH:MM
    const [endTimeString, setEndTimeString] = useState(convertDateObjToTimeString(eventDetails.endDateTime) || '18:00'); //converting the dateTime object to a time string of the format HH:MM
    const [location, setLocation] = useState(eventDetails.location || '');
    const [description, setDescription] = useState(eventDetails.description || '');
    const [subjectErrorMessage, setSubjectErrorMessage] = useState('')
    const [timeErrorMessage, setTimeErrorMessage] = useState('')
    const eventScheduleContext = useContext(EventScheduleContext);
    
    const validateForm = () => {
        let isValid = true;
        let subjectError = '';
        let timeError = '';
        if (subject.trim() === ''){
            subjectError = 'Subject cannot be empty';
            isValid = false;
        }
        if (startTimeString.trim() === '' || endTimeString.trim() === ''){
            timeError = 'Start and End time cannot be empty';
            isValid = false;
        } else if (!isTimeStrInAscendingOrder(startTimeString, endTimeString)){
            timeError = 'End Time must be ahead of start time';
            isValid = false;
        }

        if (!isValid){
            setSubjectErrorMessage(subjectError);
            setTimeErrorMessage(timeError);
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
                location,
                description,
                startDateTime : convertTimeStringToDateObj(startTimeString, props.date), //converting the time string back to a dateTime object
                endDateTime : convertTimeStringToDateObj(endTimeString, props.date), //converting the time string back to a dateTime object
            };
            eventScheduleContext.eventScheduleDispatch({
                type : dispatchType,
                event : event
            });
            props.closeFormCallBack();
        }
    };

    return (
        <li className='event-card'>
            <form className='event-form' onSubmit={handleFormSubmit}>
                <span className="form-row">
                    <label htmlFor="subject">Subject<span className="mandatory-field">*</span></label>
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
                    <label htmlFor="startTime">Start time<span className="mandatory-field">*</span></label>
                    <input
                        className="mr10"
                        name="startTime"
                        type="time"
                        value={startTimeString}
                        onChange={(ev) => setStartTimeString(ev.target.value)}
                    />
                    <label htmlFor="endTime">End time<span className="mandatory-field">*</span></label>
                    <input
                        name="endTime"
                        type="time"
                        value={endTimeString}
                        onChange={(ev) => setEndTimeString(ev.target.value)}
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
