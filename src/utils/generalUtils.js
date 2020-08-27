import {format} from 'date-fns';
import {DATE_FORMAT} from '../constants/dateFnsFormats';

const rearrangeMapByEarliest = (map) => {
    const listOfKeys = Object.keys(map);
    const rearrangedMap = {};
    const sortedListOfKeys = listOfKeys.sort((a, b) => {
        if ((!map[a].startDateTime && !map[b].startDateTime) || (map[a].startDateTime === map[b].startDateTime)){return 0}
        if (!map[a].startDateTime) {return -1}
        if (!map[b].startDateTime) {return 1}
        
        return (map[a].startDateTime < map[b].startDateTime) ? 1 : -1;
    });
    for (let key of sortedListOfKeys){
        rearrangedMap[key] = map[key];
    }
    return rearrangedMap;
};

const timeComparisionMethod = (a, b) => {
    const aTimeSplit = a.split(':');
    const bTimeSplit = b.split(':');
    
    let comparisonResult = parseInt(aTimeSplit[0]) - parseInt(bTimeSplit[0]);
    comparisonResult = (comparisonResult === 0) ? (parseInt(aTimeSplit[1]) - parseInt(bTimeSplit[1])) : comparisonResult;
    return comparisonResult;
}

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

export const getEventsScheduledForMonth = (eventSchedule, dateObj) => {
    let eventsObj = {};
    const year_key = `y_${format(dateObj, 'yyyy')}`;
    const month_key = `m_${format(dateObj, 'MM')}`;
    if (eventSchedule[year_key] && eventSchedule[year_key][month_key]){
        eventsObj = eventSchedule[year_key][month_key];
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

export const isTimeStrInOrder = (a, b) => {
    let comparisionResult = timeComparisionMethod(a, b);
    return (comparisionResult < 0);
}

export const insertIntoFormattedEventsObj = (formattedEventsObj, event) => {
    const dateObj = event.startDateTime;
    const year_key = `y_${format(dateObj, DATE_FORMAT.fullYear)}`;
    const month_key = `m_${format(dateObj, DATE_FORMAT.monthMM)}`;
    const date_key = `d_${format(dateObj, DATE_FORMAT.dateDD)}`;
    if (!formattedEventsObj[year_key]){
        formattedEventsObj[year_key] = {};
    }
    if (!formattedEventsObj[year_key][month_key]){
        formattedEventsObj[year_key][month_key] = {};
    }
    if (!formattedEventsObj[year_key][month_key][date_key]){
        formattedEventsObj[year_key][month_key][date_key] = {};
    }
    formattedEventsObj[year_key][month_key][date_key][event.uid] = event;
    formattedEventsObj[year_key][month_key][date_key] = rearrangeMapByEarliest(formattedEventsObj[year_key][month_key][date_key]);
}

export const convertTimeStringToDateObj = (timeStr, dateObj) => {
    const timeStrArray = timeStr.split(':');
    const duplicateDateObj = new Date(dateObj.toString());
    duplicateDateObj.setHours(timeStrArray[0]);
    duplicateDateObj.setMinutes(timeStrArray[1]);
    return duplicateDateObj;
}
export const convertDateObjToTimeString = (dateObj) => {
    if (!dateObj){ return '' };

    const timeStrArray = [];
    timeStrArray.push(('0' + dateObj.getHours()).slice(-2));
    timeStrArray.push(('0' + dateObj.getMinutes()).slice(-2));
    return timeStrArray.join(':');
}
