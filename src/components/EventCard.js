import React from 'react';
import {format} from 'date-fns';
import {DATE_FORMAT} from '../constants/dateFnsFormats';

function EventCard(props) {
    return (
        <div className='event-card'>
            <div className='flex-bx flex-between row-middle pb5'>
                <div className='card-title'>
                    <span className='event-subject mr10'>{props.event.subject}</span>
                    {props.event.startDateTime &&
                        <span>{format(props.event.startDateTime, DATE_FORMAT.timeStr_12Hr)} - {format(props.event.endDateTime, DATE_FORMAT.timeStr_12Hr)}</span>
                    }
                </div>
                {props.showEditOptions && 
                    <div className='flex-bx'>
                        <span className="icon anim-icon mr10" title='Edit' onClick={props.handleEditBtnClick}>edit</span>
                        <span className="icon anim-icon" title='Delete' onClick={props.handleDeleteBtnClick}>delete_outline</span>
                    </div>
                }
            </div>
            {props.event.location && 
                <div className='flex-bx row-middle pb5'>
                    <span className="icon">location_on</span>
                    <span>{props.event.location}</span>
                </div>
            }
            {props.event.description && 
                <span>{props.event.description}</span>
            }
        </div>
    )
}

export default EventCard
