import React, {useContext, useEffect, useRef} from 'react'
import { format, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameDay, isSameMonth } from "date-fns";
import { EventScheduleContext } from './Calendar';
import {getEventsScheduledForDate, get12HourTimeString} from '../utils/generalUtils';

function CalenderCells(props) {
    const eventScheduleContext = useContext(EventScheduleContext);
    
    const monthStart = startOfMonth(props.currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const eventsObj = getEventsScheduledForDate(eventScheduleContext.eventSchedule, day);
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
            formattedDate = format(day, dateFormat);
            const cloneDay = day;
            days.push(
                <div
                    className={`column cell ${!isSameMonth(day, monthStart)
                        ? "disabled" : isSameDay(day, props.todaysDate)
                            ? "selected" : ""}`}
                    key={day}
                    onClick={() => props.onDateClick(cloneDay)}
                >
                    <span className="number">{formattedDate}</span>
                    <ul className="ul-no-bullets cell-event-list">{eventList}</ul>
                    {
                        (Object.keys(eventsObj).length > 3) &&
                        <span className='overflow-banner'>...more events</span>
                    }
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}> {days} </div>
        );
        days = [];
    }

    return <div className="body">{rows}</div>;
}

export default CalenderCells
