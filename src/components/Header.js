import React from 'react';
import {format, addMonths, subMonths} from 'date-fns';

function Header(props) {
    const dateFormat = "MMMM yyyy";

    const nextMonth = () => {
        props.setCurrentMonth(addMonths(props.currentMonth, 1));
    };

    const prevMonth = () => {
        props.setCurrentMonth(subMonths(props.currentMonth, 1));
    };
    
    return (
        <div className="header row row-middle flex-around">
            <span className="icon anim-icon" onClick={prevMonth}>chevron_left</span>
            <span>{format(props.currentMonth, dateFormat)}</span>
            <span className="icon anim-icon" onClick={nextMonth}>chevron_right</span>
        </div>
    );
}

export default Header
