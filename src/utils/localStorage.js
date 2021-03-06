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
    let jsonStr = localStorage.getItem('calendar-scheduled-events-v2') || '{}';
    return JSON.parse(jsonStr);
}

// fetch events from local storage, and set the start and end time to dateTime objects of the browser's current timezone
export const getEventsFromLocalStorage = () => {
    const formattedEventsObj = {};
    const eventsObj = fetchEvents();
    for (let eventUid in eventsObj){
        convertUtcStringToUserTzDateObj(eventsObj[eventUid]);
        insertIntoFormattedEventsObj(formattedEventsObj, eventsObj[eventUid]);
    }
    return formattedEventsObj;
}

// convert start and end time from user's local timezone to UTC and then persist events list in localstorage
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
    
    localStorage.setItem('calendar-scheduled-events-v2', JSON.stringify(eventsObj));
}