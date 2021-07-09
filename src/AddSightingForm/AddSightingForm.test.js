import React from 'react';
import ReactDOM from 'react-dom';
import AddSightingForm from './AddSightingForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <AddSightingForm />
        </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});