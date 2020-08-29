import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Simulate } from 'react-dom/test-utils';

import EventForm from '../EventForm';
import Calendar from '../Calendar';

afterEach(cleanup);

test('should render without errrors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventForm />, div);
});

test('should validate for empty subject', () => {
    const { getByTestId } = render(
        <EventForm 
            date = {new Date()}
            closeFormCallBack = {() => {}}
            event = {
                {subject : ''}
            }
        />
    );
    getByTestId('submitEventForm').click();
    expect(getByTestId('subjectErrorMessage')).toHaveTextContent('Subject cannot be empty');
});

test('should validate for empty startTime', () => {
    const { getByLabelText, getByTestId } = render(
        <EventForm 
            date = {new Date()}
            closeFormCallBack = {() => {}}
            event = {
                {subject : 'test'}
            }
        />
    );
    fireEvent.change(getByLabelText('startTime'), { target: { value: '' } });
    getByTestId('submitEventForm').click();
    expect(getByTestId('timeErrorMessage')).toHaveTextContent('Start and End time cannot be empty');
});

test('should validate if end time is ahead of start time', () => {
    const { getByLabelText, getByTestId } = render(
        <EventForm 
            date = {new Date()}
            closeFormCallBack = {() => {}}
            event = {
                {subject : 'test'}
            }
        />
    );
    fireEvent.change(getByLabelText('startTime'), { target: { value: '06:00' } });
    fireEvent.change(getByLabelText('endTime'), { target: { value: '05:00' } });
    getByTestId('submitEventForm').click();
    expect(getByTestId('timeErrorMessage')).toHaveTextContent('End Time must be ahead of start time');
});

test('should create new event and populate event list', () => {
    const { getByTestId, getByLabelText } = render(
        <Calendar />
    );
    fireEvent.click(getByTestId('todaysCell'));
    fireEvent.click(getByTestId('newEventBtn'));
    fireEvent.change(getByLabelText('subject'), { target: { value: 'Test event' } });
    Simulate.change(getByLabelText('subject'));
    fireEvent.click(getByTestId('submitEventForm'));
    const dayViewPopup = getByTestId('dayView');
    const eventItem = dayViewPopup.querySelector('.events-list').querySelector('li');
    expect(eventItem).toBeInTheDOM();
});