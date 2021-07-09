import React from 'react';
import ReactDOM from 'react-dom';
import EditSightingForm from './EditSightingForm';
import { BrowserRouter, Route } from 'react-router-dom';

it('renders without crashing', () => {
    const testSightings = [
        {
            "date": "07-02-1997",
            "animal": "Bear",
            "location": "Avon, CT",
            "notes": "The usual guy with the red ear tags",
            "photos": "TBD",
            "id": 1,
        },
        {
            "date": "07-01-1997",
            "animal": "Snake",
            "location": "Catskills",
            "notes": "Biggest that I've seen in the wild",
            "photos": "TBD",
            "id": 2,
        },
    ];

    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <Route path='/edit/:id'>
                <EditSightingForm sightings={testSightings} />
            </Route> 
        </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});