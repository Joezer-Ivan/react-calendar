import {insertIntoFormattedEventsObj} from './generalUtils';

const convertDateTimeObjToUtcString = (event) => {
    event.startDateTime = event.startDateTime.toUTCString();
    event.endDateTime = event.endDateTime.toUTCString();
}
const convertUtcStringToUserTzDateObj = (event) => {
    event.startDateTime = new Date(event.startDateTime.toString());
    event.endDateTime = new Date(event.endDateTime.toString());
}
const fetchEvents = () => {
    let jsonStr = localStorage.getItem('calendar-scheduled-events') || '{}';
    return JSON.parse(jsonStr);
}

export const getEventsFromLocalStorage = () => {
    const formattedEventsObj = {};
    const eventsObj = fetchEvents();
    for (let eventUid in eventsObj){
        convertUtcStringToUserTzDateObj(eventsObj[eventUid]);
        insertIntoFormattedEventsObj(formattedEventsObj, eventsObj[eventUid]);
    }
    return formattedEventsObj;
}

export const setEventsToLocalStorage = (action, event) => {
    const eventsObj = fetchEvents();
    convertDateTimeObjToUtcString(event);
    switch (action) {
        case 'ADD_EDIT':
            eventsObj[event.uid] = event;
            break;
        case 'DELETE':
            delete eventsObj[event.uid];
            break;
        default :
            break;
    }
    
    localStorage.setItem('calendar-scheduled-events', JSON.stringify(eventsObj));
}