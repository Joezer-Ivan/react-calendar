import React from 'react'
import {get12HourTimeString} from '../utils/generalUtils'

function EventCard(props) {
    return (
        <div className='event-card'>
            <div className='flex-bx flex-between row-middle pb5'>
                <div className='card-title'>
                    <span className='event-subject mr10'>{props.event.subject}</span>
                    {props.event.startTime &&
                        <span>{get12HourTimeString(props.event.startTime)} - {get12HourTimeString(props.event.endTime)}</span>
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
