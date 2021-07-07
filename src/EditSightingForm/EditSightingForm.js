import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config';

class EditSightingForm extends React.Component {
    constructor(props) {
        super(props);
        this.date = React.createRef();
        this.location = React.createRef();
        this.animal = React.createRef();
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
                    date: results.date,
                    location: results.location,
                    animal: results.animal,
                    notes: results.notes,
                })
            })
            .catch(error => this.setState({ error }))
    }

    handleUpdate = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const updatedSighting = {
            date: this.date.current.value,
            location: this.location.current.value,
            animal: this.animal.current.value,
            notes: this.notes.current.value,
            id
        };
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

    render() {
        const id = this.props.match.params.id;
        const currentSighting = this.props.sightings.find(sighting => 
            (Number(sighting.id) === Number(id))
        )

        return (
            <div className="Edit-sighting">
                <h3>Edit Sighting</h3>
                <div className="Form-container">
                    <form className="Edit-sighting-form">
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                            defaultValue={currentSighting.date}
                            ref={this.date}
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
                        <label htmlFor="animal">Animal:</label>
                        <input 
                            type="text" 
                            id="animal" 
                            name="animal"
                            defaultValue={currentSighting.animal}
                            ref={this.animal} 
                        />
                        <br />
                        <label htmlFor="notes">Notes:</label>
                        <textarea 
                            id="notes" 
                            name="notes"
                            defaultValue={currentSighting.notes}
                            ref={this.notes}>
                        </textarea>
                        <br />
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
            </div>
        );
    }
}

export default withRouter(EditSightingForm);