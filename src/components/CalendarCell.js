import React, {useState, useContext, useEffect, useRef} from 'react'
import {format, isSameMonth, isSameDay} from 'date-fns';
import { EventScheduleContext } from './Calendar';
import {getEventsScheduledForDate, get12HourTimeString} from '../utils/generalUtils';

function CalendarCell(props) {
    const cellContainerRef = useRef(null);
    const [eventListOverflow, setEventListOverflow] = useState(false);
    const eventScheduleContext = useContext(EventScheduleContext);
    const dateFormat = "d";
    const eventsObj = getEventsScheduledForDate(eventScheduleContext.eventSchedule, props.day);
    const eventList = [];
    
    for(let eventId in eventsObj){
        const event = eventsObj[eventId];
        eventList.push(
            <li key={eventId}>
                {event.startTime && 
                    <span className='mr5'>{get12HourTimeString(event.startTime)}</span>
                }
                <span className='event-subject'>{event.subject}</span>
            </li>
        );
    }

    useEffect(() => {
        (cellContainerRef.current.scrollHeight - cellContainerRef.current.clientHeight) > 0 ? setEventListOverflow(true) : setEventListOverflow(false);
    }, [eventsObj])
    
    return(
        <div
            className={`column cell ${!isSameMonth(props.day, props.monthStart)
                ? "disabled" : isSameDay(props.day, props.todaysDate)
                    ? "selected" : ""}`}
            ref={cellContainerRef}
            onClick={() => props.onDateClick(props.day)}
        >
            <span className="number">{format(props.day, dateFormat)}</span>
            <ul className="ul-no-bullets cell-event-list">{eventList}</ul>
            {eventListOverflow &&
                <span className='overflow-banner'>...more events</span>
            }
        </div>
    );
}

export default CalendarCell;
