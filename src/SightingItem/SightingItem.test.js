import React from 'react';
import ReactDOM from 'react-dom';
import SightingItem from './SightingItem';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const testSighting = {
        "date": "07-02-1997",
        "animal": "Bear",
        "location": "Avon, CT",
        "notes": "The usual guy with the red ear tags",
        "photos": "TBD",
        "email": "jane.goodall@email.com",
    };

    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <SightingItem sighting={testSighting} />
        </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});