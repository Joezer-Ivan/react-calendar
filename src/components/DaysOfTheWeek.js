import React from 'react'

function DaysOfTheWeek() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysJsx = [];
    for (let day of days) {
        daysJsx.push(
            <div className="column col-center" key={day}>
                {day}
            </div>
        );
    }
    return <div className="days row">{daysJsx}</div>;
}

export default DaysOfTheWeek
