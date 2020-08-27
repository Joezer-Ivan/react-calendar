import {get12HourTimeString} from './generalUtils';

export const requestNotifPermission = () => {
    Notification.requestPermission();
}

export const newDesktopNotification = (event) => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notifications");
        return;
    }

    const title = `${event.subject} \t ${get12HourTimeString(event.startTime)} - ${get12HourTimeString(event.endTime)}`;
    const options = {
        body : event.description
    };
    if (Notification.permission === "granted") {
        new Notification(title, options);
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(title, options);
            }
        });
    }
}