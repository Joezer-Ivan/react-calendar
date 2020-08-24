import {format} from 'date-fns';
import uuid from '../utils/uuid';
import {getEventsScheduledForDate, rearrangeMapByEarliest} from '../utils/generalUtils';
import {setEventsToLocalStorage} from '../utils/localStorage';

export const eventScheduleReducer = (state, action) => {
    let newState = {...state};

    const deleteEventFromDate = (uid, dateObj) => {
        let eventsObjForDate = getEventsScheduledForDate(newState, action.date);
        delete eventsObjForDate[uid];
    };

    const addEditEventForDate = (event, dateObj) => {
        const year_key = `y_${format(dateObj, 'yyyy')}`;
        const month_key = `m_${format(dateObj, 'MM')}`;
        const date_key = `d_${format(dateObj, 'dd')}`;
        if (!newState[year_key]){
            newState[year_key] = {};
        }
        if (!newState[year_key][month_key]){
            newState[year_key][month_key] = {};
        }
        if (!newState[year_key][month_key][date_key]){
            newState[year_key][month_key][date_key] = {};
        }
        newState[year_key][month_key][date_key][event.uid] = event;
        newState[year_key][month_key][date_key] = rearrangeMapByEarliest(newState[year_key][month_key][date_key]);
    };
    
    switch (action.type) {
        case 'ADD_EVENT':
            action.event.uid = uuid();
            addEditEventForDate(action.event, action.date);
            break;
        case 'EDIT_EVENT':
            addEditEventForDate(action.event, action.date);
            break;
        case 'DELETE_EVENT':
            deleteEventFromDate(action.event.uid, action.date);
            break;
        default:
            break;
    }
    setEventsToLocalStorage(newState);
    return newState;
};
