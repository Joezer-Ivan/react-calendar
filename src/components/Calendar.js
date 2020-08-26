import React, { useState, useReducer, createContext, useCallback } from "react";

import Header from './Header';
import DaysOfTheWeek from './DaysOfTheWeek';
import CalenderBody from './CalenderBody';
import DailyEvents from "./DailyEvents";
import NotificationHandler from './NotificationHandler';
import ExportAsCSV from './ExportAsCSV';
import {eventScheduleReducer} from '../reducers/eventScheduleReducer';
import {getEventsFromLocalStorage} from '../utils/localStorage';

export const EventScheduleContext = createContext();

const initialEventSchedule = getEventsFromLocalStorage() || {};

const Calendar = () => {
    const [todaysDate, setTodaysDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventsView, setEventsView] = useState(false);
    
    const [eventSchedule, eventScheduleDispatch] = useReducer(eventScheduleReducer, initialEventSchedule);

    const onDateClick = useCallback((day) => {
        setSelectedDate(day);
        setEventsView(true);
    }, []);

    return (
        <EventScheduleContext.Provider value={{eventSchedule: eventSchedule, eventScheduleDispatch: eventScheduleDispatch}}>
            <div className="calendar">
                <Header currentMonth={selectedDate} setCurrentMonth={setSelectedDate}/>
                <DaysOfTheWeek />
                <CalenderBody currentMonth={selectedDate} todaysDate={todaysDate} onDateClick={onDateClick}/>
                {eventsView && 
                    <DailyEvents selectedDate={selectedDate} setEventsView={setEventsView} />
                }
                <NotificationHandler todaysDate={todaysDate} setTodaysDate={setTodaysDate}/>
            </div>
            <ExportAsCSV currentMonth={selectedDate}/>
        </EventScheduleContext.Provider>
    );
};

export default Calendar;