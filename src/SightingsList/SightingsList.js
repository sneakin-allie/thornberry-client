import React from 'react';
import SightingItem from '../SightingItem/SightingItem';
import './SightingsList.css';
import { withRouter, Link } from 'react-router-dom';
import config from '../config';

class SightingsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sightings: []
        }
    }

    componentDidMount() {
        // GET sightings by user email
        fetch(config.API_BASE_URL + `/api/sightings/${this.props.userInfo.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then((results) => {
                this.props.onDisplaySightings(results)
            })
            .catch(error => this.setState({ error }))
    }

    render() {
        return (
            <div className="Sightings">
                <h3 className="Welcome-banner"><i>Welcome, {this.props.userInfo.firstName}!</i></h3>
                <h3 className="Sightings-banner">Sightings</h3>
                    <div className="Add-new-sighting-button-conainter">
                        <div className="Add-new-sighting-button">
                            <Link 
                                to={{
                                    pathname: `/add`
                                }}
                            >
                                <button type="button">
                                    Add New Sighting
                                </button>
                            </Link>
                        </div>
                    </div>
                    <ul className="Sightings-list">
                        {this.props.sightings.map((sighting, i) =>
                            <SightingItem
                                key={i}
                                sighting={sighting}
                                onUpdateSighting={this.props.handleUpdateSighting}
                                onDeleteSighting={this.props.handleDeleteSighting}
                                sightings={this.state.sightings}
                                userInfo={this.state.userInfo}
                            />
                        )}
                    </ul>
            </div>
        );
    }
}

export default withRouter(SightingsList);