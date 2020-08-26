import React, {useContext} from 'react'
import {setDate, format} from 'date-fns'
import {getEventsScheduledForMonth} from '../utils/generalUtils'
import { EventScheduleContext } from './Calendar';

function ExportAsCSV(props) {
    const eventScheduleContext = useContext(EventScheduleContext);
    
    const constructEventsArray = () => {
        const eventsArray = [['Subject', 'Start Date', 'Start Time', 'End Date', 'End Time', 'Location', 'Description']];
        const eventsObj = getEventsScheduledForMonth(eventScheduleContext.eventSchedule, props.currentMonth);
        const dateFormat = 'dd/MM/yy';
        for (let dayKey in eventsObj){
            const dayStr = dayKey.split('_')[1];
            const dateObjForEvent = setDate(props.currentMonth, parseInt(dayStr));
            const formattedDate = format(dateObjForEvent, dateFormat);
            const daysEventsObj = eventsObj[dayKey];
            for (let eventUid in daysEventsObj){
                const {subject, startTime, endTime, location, description} = daysEventsObj[eventUid];
                eventsArray.push([subject, formattedDate, startTime, formattedDate, endTime, location, description]);
            }
        }
        return eventsArray;
    }

    const exportToCSV = (fileName, rows) => {
        const getRowStr = (row) => {
            let finalVal = '';
            for (let j = 0; j < row.length; j++) {
                let innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                let result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0){
                    result = '"' + result + '"';
                }
                if (j > 0){
                    finalVal += ',';
                }
                if (result === ''){
                    result = '-';
                }
                finalVal += result;
            }
            return finalVal + '\n';
        };
    
        let csvFile = '';
        for (let row of rows) {
            csvFile += getRowStr(row);
        }
        const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleExportClick = () => {
        const eventsArray = constructEventsArray();
        const fileName = `Events for ${format(props.currentMonth, 'LLLL')}`;
        exportToCSV(fileName, eventsArray);
    }

    return (
        <button className="btn-primary export-csv-button" onClick={handleExportClick}>
            <span className="icon mr5">save_alt</span>
            Export events as CSV
        </button>
    )
}

export default ExportAsCSV