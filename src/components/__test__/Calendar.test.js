import React from 'react';
import ReactDOM  from 'react-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Calendar from '../Calendar';

afterEach(cleanup);

test('should render wihtout crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Calendar />, div);
}) 

test('should open day view', () => {
    const { getByTestId } = render(<Calendar />);
    fireEvent.click(getByTestId('todaysCell'));
    const dayViewPopup = getByTestId('dayView');
    expect(dayViewPopup.querySelector('.events-list')).toHaveTextContent(`You don't have any events scheduled for this day...`);
})