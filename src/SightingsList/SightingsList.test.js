import React from 'react';
import ReactDOM from 'react-dom';
import SightingsList from './SightingsList';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const testUser = {
        "firstName": "Allison",
        "lastName": "Schulman",
        "email": "allison.d.schulman@gmail.com",
        "password": "password123"
    };

    const testSighting = [
        {
            "date": "07-02-1997",
            "animal": "Bear",
            "location": "Avon, CT",
            "notes": "The usual guy with the red ear tags",
            "photos": "TBD",
            "email": "allison.d.schulman@gmail.com",
        }
    ];

    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <SightingsList userInfo={testUser} sightings={testSighting}/>
        </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});