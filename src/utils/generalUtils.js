import {format} from 'date-fns';

export const getEventsScheduledForDate = (eventSchedule, dateObj) => {
    let eventsObj = {};
    const year_key = `y_${format(dateObj, 'yyyy')}`;
    const month_key = `m_${format(dateObj, 'MM')}`;
    const date_key = `d_${format(dateObj, 'dd')}`;
    if (eventSchedule[year_key] && eventSchedule[year_key][month_key] && eventSchedule[year_key][month_key][date_key]){
        eventsObj = eventSchedule[year_key][month_key][date_key];
    }
    return eventsObj;
};

export const get12HourTimeString = (_24HrTimeString) => {
    if (!_24HrTimeString) {return ''}

    const splitTime = _24HrTimeString.split(':');
    let hourNum = parseInt(splitTime[0]);
    let minStr = splitTime[1];
    let period = 'AM';
    if (hourNum >= 12){
        period = 'PM';
        hourNum %= 12;
    }
    let hourStr = (hourNum === 0) ? '12' : ('0' + hourNum.toString()).slice(-2);
    return `${hourStr}:${minStr} ${period}`;
}

export const rearrangeMapByEarliest = (map) => {
    const listOfKeys = Object.keys(map);
    const rearrangedMap = {};
    const sortedListOfKeys = listOfKeys.sort((a, b) => {
        if (!map[a].startTime && !map[b].startTime) {return 0}
        if (!map[a].startTime) {return -1}
        if (!map[b].startTime) {return 1}

        const aTimeSplit = map[a].startTime.split(':');
        const bTimeSplit = map[b].startTime.split(':');
        
        let comparisonResult = parseInt(aTimeSplit[0]) - parseInt(bTimeSplit[0]);
        comparisonResult = (comparisonResult === 0) ? (parseInt(aTimeSplit[1]) - parseInt(bTimeSplit[1])) : comparisonResult;
        return comparisonResult;
    });
    for (let key of sortedListOfKeys){
        rearrangedMap[key] = map[key];
    }
    return rearrangedMap;
};