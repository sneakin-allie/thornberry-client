import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class SightingItem extends React.Component {
    render() {
        return (
            <div className="sighting">
                <li>
                    <p>Date: {this.props.sighting.date}</p>
                    <p>Location: {this.props.sighting.location}</p>
                    <p>Animal: {this.props.sighting.animal}</p>
                    <p>Notes: {this.props.sighting.notes}</p>
                    <p>Photos: {this.props.sighting.photos}</p>
                    <Link 
                        to={{
                            pathname: `/edit/${this.props.sighting.id}`
                        }}
                    >   
                            <button 
                                type="button">
                                Edit
                            </button>
                    </Link>
                </li>  
            </div>
        );
    }
}

export default withRouter(SightingItem);