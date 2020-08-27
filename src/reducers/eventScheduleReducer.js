import uuid from '../utils/uuid';
import {getEventsScheduledForDate, insertIntoFormattedEventsObj} from '../utils/generalUtils';
import {setEventsToLocalStorage} from '../utils/localStorage';

export const eventScheduleReducer = (state, action) => {
    let newState = {...state};
    
    const deleteEventFromDate = (event) => {
        let eventsObjForDate = getEventsScheduledForDate(newState, event.startDateTime);
        delete eventsObjForDate[event.uid];
    };

    const addEditEventForDate = (event) => {
        insertIntoFormattedEventsObj(newState, event);
    };
    
    switch (action.type) {
        case 'ADD_EVENT':
            action.event.uid = uuid();
            addEditEventForDate(action.event);
            setEventsToLocalStorage('ADD_EDIT', {...action.event});
            break;
        case 'EDIT_EVENT':
            addEditEventForDate(action.event);
            setEventsToLocalStorage('ADD_EDIT', {...action.event});
            break;
        case 'DELETE_EVENT':
            deleteEventFromDate(action.event);
            setEventsToLocalStorage('DELETE', {...action.event});
            break;
        default:
            break;
    }
    return newState;
};
