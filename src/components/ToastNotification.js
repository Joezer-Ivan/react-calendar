import React from 'react';
import EventCard from './EventCard';

function ToastNotification(props) {
    return (
        <div className="toast-notification shake">
            <span className="fr icon anim-icon" onClick={props.onCloseHandler}>close</span>
            <EventCard 
                event = {props.event}
                showEditOptions = {false}
            />
        </div>
    );
}

export default ToastNotification
