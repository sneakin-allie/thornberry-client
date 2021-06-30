import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends React.Component {
    render() {
        return (
            <div className="Nav">
                <Link to="/">
                    Home
                </Link>
                <Link to="/list">
                    Sightings
                </Link>
                <Link to="/add">
                    Add New Sighting
                </Link>
                <Link to='/'>
                    Log Out
                </Link>
            </div>
        )
    }
}

export default Nav;