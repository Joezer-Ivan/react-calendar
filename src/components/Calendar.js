import React, { useState, useReducer, createContext, useCallback } from "react";

import Header from './Header';
import DaysOfTheWeek from './DaysOfTheWeek';
import CalenderCells from './CalenderCells';
import DailyEvents from "./DailyEvents";
import {eventScheduleReducer} from '../reducers/eventScheduleReducer';
import {getEventsFromLocalStorage} from '../utils/localStorage';

export const EventScheduleContext = createContext();

const initialEventSchedule = getEventsFromLocalStorage() || {};

const Calendar = () => {
    const [todaysDate, setTodaysDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
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
                <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>
                <DaysOfTheWeek />
                <CalenderCells currentMonth={currentMonth} todaysDate={todaysDate} onDateClick={onDateClick}/>
                {eventsView && 
                    <DailyEvents selectedDate={selectedDate} setEventsView={setEventsView} />
                }
            </div>
        </EventScheduleContext.Provider>
    );
};

export default Calendar;