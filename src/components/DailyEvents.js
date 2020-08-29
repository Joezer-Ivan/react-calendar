import React, {useContext, useState} from 'react';
import {format} from 'date-fns';
import {EventScheduleContext} from './Calendar';
import {getEventsScheduledForDate} from '../utils/generalUtils'
import EventItem from './EventItem';
import EventForm from './EventForm';
import {DATE_FORMAT} from '../constants/dateFnsFormats';

function DailyEvents(props) {
    const [showNewEventForm, setShowNewEventForm] = useState(false);
    const eventScheduleContext = useContext(EventScheduleContext);
    const eventsObj = getEventsScheduledForDate(eventScheduleContext.eventSchedule, props.selectedDate);
    const eventList = [];
    for(let eventId in eventsObj){
        const event = eventsObj[eventId];
        eventList.push(
            <EventItem key={eventId} event={event} date={props.selectedDate}/>
        );
    }

    return (
        <React.Fragment>
            <div className="modalMask" onClick={() => props.setEventsView(false)}></div>
            <div className="popover modal daily-events" data-testid="dayView">
                <div className="header flex-bx flex-between">
                    <span>{format(props.selectedDate, DATE_FORMAT.fullDate)}</span>
                    <div>
                        <button className='mr10 btn-primary' data-testid="newEventBtn" onClick={() => setShowNewEventForm(true)}>
                            <span className="icon">add</span>
                            New Event
                        </button>
                        <span className="icon anim-icon" onClick={() => props.setEventsView(false)}>close</span>
                    </div>
                </div>
                <div>
                    <ul className='events-list ul-no-bullets'>
                        {showNewEventForm &&
                            <EventForm 
                                date = {props.selectedDate}
                                closeFormCallBack={() => {setShowNewEventForm(false)}}
                            />
                        }
                        {eventList.length > 0 ? 
                            eventList : 
                            (!showNewEventForm &&
                                `You don't have any events scheduled for this day...`
                            )
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DailyEvents
