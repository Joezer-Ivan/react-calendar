import React from 'react'
import { startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth } from "date-fns";
import CalendarCell from './CalendarCell';

function CalenderBody(props) {
    const monthStart = startOfMonth(props.currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            days.push(
                <CalendarCell 
                    day = {day}
                    key = {day}
                    monthStart = {monthStart}
                    todaysDate = {props.todaysDate}
                    onDateClick = {props.onDateClick}
                />
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

export default CalenderBody;
