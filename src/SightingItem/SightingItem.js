import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './SightingItem.css'

class SightingItem extends React.Component {
    render() {
        return (
            <div className="Sighting">
                <li>
                    <p className="Animal">Animal: {this.props.sighting.animal}</p>
                    <p>Location: {this.props.sighting.location}</p>
                    <p>Date: {this.props.sighting.date}</p>
                    <p>Notes: {this.props.sighting.notes}</p>
                    {this.props.sighting.photos && 
                        <img src={this.props.sighting.photos} alt="animal" />
                    }
                    <br />
                    <div className="Edit-button-container">
                        <Link 
                            to={{
                                pathname: `/edit/${this.props.sighting.id}`
                            }}
                        >   
                                <button
                                    className="Edit-button" 
                                    type="button">
                                    Edit
                                </button>
                        </Link>
                    </div>
                </li>  
            </div>
        );
    }
}

export default withRouter(SightingItem);