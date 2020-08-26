import React, {useContext, useEffect, useRef, useState} from 'react'
import {addMinutes, isSameDay} from 'date-fns'
import ToastNotification from './ToastNotification'
import { EventScheduleContext } from './Calendar'
import {getEventsScheduledForDate} from '../utils/generalUtils'
import {notifyBeforeMins} from '../constants/eventNotificationTime'
import {newDesktopNotification} from '../utils/notifications'

function NotificationHandler(props) {
    const timeEventsMap = useRef({});
    const [inAppNotificationObj, setInAppNotificationObj] = useState({});
    const eventScheduleContext = useContext(EventScheduleContext);
    const eventsObj = getEventsScheduledForDate(eventScheduleContext.eventSchedule, props.todaysDate);

    const removeFromInAppNotificationObj = (uid) => {
        const cloneList = {...inAppNotificationObj};
        cloneList[uid].inAppNotifClosed = true;
        delete cloneList[uid];
        setInAppNotificationObj({...cloneList});
    }

    // prepares the time-event map for notifications only if eventsObj is changed
    useEffect(() => {
        timeEventsMap.current = {};
        for(let eventId in eventsObj){
            const event = eventsObj[eventId];
            const timeKey = `t_${event.startTime}`;
            if (!timeEventsMap.current.hasOwnProperty(timeKey)) {
                timeEventsMap.current[timeKey] = [];
            };
            timeEventsMap.current[timeKey].push(event);
        }
    }, [eventsObj])

    // run at one minute intervals, to post notifications
    useEffect(() => {
        const minuteTimer = setInterval(() => {
            //if app is kept open for over a day, update todaysDate value
            const dateObj = new Date();
            if (!isSameDay(dateObj, props.todaysDate)){
                props.setTodaysDate(new Date());
            }

            //for each event of startTime from now to notifyBeforeMins, show notifs
            let addToNotifObj = {};
            for (let minsFromNow = 0; minsFromNow <= notifyBeforeMins; minsFromNow++){
                const notifyForTime = addMinutes(dateObj, minsFromNow);
                const formattedHours = ('0' + notifyForTime.getHours().toString()).slice(-2);
                const formattedMins = ('0' + notifyForTime.getMinutes().toString()).slice(-2);
                const notifyForTimeKey = `t_${formattedHours}:${formattedMins}`;
                const events = timeEventsMap.current[notifyForTimeKey]
                if (events){
                    for (let event of events){
                        if (!event.inAppNotifClosed){
                            addToNotifObj[event.uid] = event;
                        }
                        if (!event.desktopNotifShown){
                            newDesktopNotification(event);
                            event.desktopNotifShown = true;
                        }
                    }
                }
            }
            setInAppNotificationObj({...inAppNotificationObj, ...addToNotifObj});
        }, 10000);
        return () => {
            clearInterval(minuteTimer);
        }
    }, []);

    const toastNotifs = [];
    for(let eventUid in inAppNotificationObj){
        toastNotifs.push(
            <ToastNotification 
                key = {eventUid}
                event = {inAppNotificationObj[eventUid]}
                onCloseHandler = {() => removeFromInAppNotificationObj(eventUid)}
            />
        )
    }

    return (
        <div className="toast-notification-container">
            {toastNotifs}
        </div>
    )
}

export default NotificationHandler
