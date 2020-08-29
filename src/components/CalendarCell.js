import React, {useState, useContext, useEffect, useRef} from 'react'
import {format, isSameMonth, isSameDay} from 'date-fns';
import { EventScheduleContext } from './Calendar';
import {getEventsScheduledForDate} from '../utils/generalUtils';
import {DATE_FORMAT} from '../constants/dateFnsFormats';

function CalendarCell(props) {
    const cellContainerRef = useRef(null);
    const [eventListOverflow, setEventListOverflow] = useState(false);
    const eventScheduleContext = useContext(EventScheduleContext);
    const eventsObj = getEventsScheduledForDate(eventScheduleContext.eventSchedule, props.day);
    const eventList = [];
    
    for(let eventId in eventsObj){
        const event = eventsObj[eventId];
        eventList.push(
            <li key={eventId}>
                {event.startDateTime && 
                    <span className='mr5'>{format(event.startDateTime, DATE_FORMAT.timeStr_12Hr)}</span>
                }
                <span className='event-subject'>{event.subject}</span>
            </li>
        );
    }

    useEffect(() => {
        // show a more items label if events list overflows out of the cell
        (cellContainerRef.current.scrollHeight - cellContainerRef.current.clientHeight) > 0 ? setEventListOverflow(true) : setEventListOverflow(false);
    }, [eventsObj])
    
    let conditionalClassNames = '';
    if (!isSameMonth(props.day, props.monthStart)){ conditionalClassNames += ' disabled' };
    if (isSameDay(props.day, props.todaysDate)){ conditionalClassNames += ' highlighted' };

    return(
        <div
            className={`column cell ${conditionalClassNames}`}
            ref={cellContainerRef}
            onClick={() => props.onDateClick(props.day)}
        >
            <span className="number">{format(props.day, DATE_FORMAT.dayOfMonth)}</span>
            <ul className="ul-no-bullets cell-event-list">{eventList}</ul>
            {eventListOverflow &&
                <span className='overflow-banner'>...more events</span>
            }
        </div>
    );
}

export default CalendarCell;
