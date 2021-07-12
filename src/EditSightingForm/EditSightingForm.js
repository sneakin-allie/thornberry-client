import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config';
import './EditSightingForm.css';

class EditSightingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {photos: ""};
        this.animal = React.createRef();
        this.location = React.createRef();
        this.date = React.createRef();
        this.notes = React.createRef();
    }

    componentDidMount() {
        // GET a sighting by id
        const { id } = this.props.match.params;
        fetch(config.API_BASE_URL + `/api/sightings/${id}`, {
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
            .then(results => {
                this.setState({
                    animal: results.animal,
                    location: results.location,
                    date: results.date,
                    notes: results.notes
                })
            })
            .catch(error => this.setState({ error }))
    }

    handleUpdate = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const updatedSighting = {
            animal: this.animal.current.value,
            location: this.location.current.value,
            date: this.date.current.value,
            notes: this.notes.current.value,
            photos: this.state.photos,
            id
        };
        console.log("updatedSighting:", updatedSighting)
        // PATCH to update a sighting
        fetch(config.API_BASE_URL + `/api/sightings/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSighting),
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
            .then(updatedSighting => {
                this.props.onUpdateSighting(updatedSighting)
                this.props.history.push("/list")
            })
            .catch(error => this.setState({ error }))
    }
    
    handleDelete = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        // DELETE a sighting
        fetch(config.API_BASE_URL + `/api/sightings/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res
            })
            .then(this.props.history.push("/list"))
            .catch(err => {
                console.log(err)
            })
    }

    openWidget = () => {
        window.cloudinary.createUploadWidget({
            cloudName: "thornberry",
            uploadPreset: "sightingsimages"
        }, (error, result) => {
            if (!error && result.event === "success") {
                this.setState({
                    photos: result.info.url,
                })
            }
        },).open();
    };

    render() {
        const id = this.props.match.params.id;
        const currentSighting = this.props.sightings.find(sighting => 
            (Number(sighting.id) === Number(id))
        )
        const newPhoto = this.state.photos;

        return (
            <div className="Edit-sighting">
                <h3>Edit Sighting</h3>
                    <form className="Edit-sighting-form">
                        <label htmlFor="animal">Animal:</label>
                        <input 
                            type="text" 
                            id="animal" 
                            name="animal"
                            defaultValue={currentSighting.animal}
                            ref={this.animal} 
                        />
                        <br />
                        <label htmlFor="location">Location:</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            defaultValue={currentSighting.location}
                            ref={this.location}
                        />
                        <br />
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                            defaultValue={currentSighting.date}
                            ref={this.date}
                        />
                        <br />
                        <label htmlFor="notes">Notes:</label>
                        <br />
                        <textarea 
                            id="notes" 
                            name="notes"
                            defaultValue={currentSighting.notes}
                            ref={this.notes}>
                        </textarea>
                        <br />
                        <div className="Upload-widget">
                                <div>
                                    <button 
                                        type="button" 
                                        className="Widget-button" 
                                        onClick={this.openWidget}
                                    >
                                        Upload Photo
                                    </button>
                                </div>
                                {newPhoto && 
                                    <div>
                                        <p>Photo preview:</p>
                                        <img src={this.state.photos} alt="animal" />
                                    </div>
                                }
                        </div>
                        <div className="Button-container">
                            <button 
                                className="Update-button"
                                onClick={this.handleUpdate}
                                type="button"
                            >
                                Update
                            </button>
                            <button
                                className="Delete-button"
                                onClick={this.handleDelete}
                                type="button"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
            </div>
        );
    }
}

export default withRouter(EditSightingForm);