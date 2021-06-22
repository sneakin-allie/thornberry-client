import React from 'react';
import SightingItem from '../SightingItem/SightingItem';
import './SightingsList.css';
import { withRouter } from 'react-router-dom';

class SightingsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sightings: []
        }
    }

    render() {
        return (
            <div className="sightings">
                <h3>Sighting Collection</h3>
                    <ul className="sightings-list">
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