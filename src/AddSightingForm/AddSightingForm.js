import React from 'react';
import UploadWidget from '../UploadWidget';
import { withRouter } from 'react-router-dom';
import config from '../config';

class AddSightingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            location: "",
            animal: "",
            notes: "",
            id: "",
            errorMessage: null
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { date, location, animal, notes } = e.target;
        const newSighting = { 
            date: date.value, 
            location: location.value, 
            animal: animal.value, 
            notes: notes.value, 
            email: this.props.userInfo.email
        };
        // POST a new sighting
        fetch(config.API_BASE_URL + `/api/sightings`, {
            method: 'POST',
            body: JSON.stringify(newSighting),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(result => {
                this.props.onAddSighting(result)
                this.props.history.push('/list')
            })
            .catch(err => this.setState({ errorMessage: "Invalid credentials" }))
    }

    render() {
        return (
            <div className="Add-new-sighting">
                <h3>Add New Sighting</h3>
                <div className="Form-container">
                <form className="Add-new-sighting-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                            onChange={this.handleChange} 
                        />
                        <br />
                        <label htmlFor="location">Location:*</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            onChange={this.handleChange}
                            required
                        />
                        <br />
                        <label htmlFor="animal">Animal:*</label>
                        <input 
                            type="text" 
                            id="animal" 
                            name="animal"
                            onChange={this.handleChange} 
                            required
                        />
                        <br />
                        <label htmlFor="notes">Notes:</label>
                        <textarea 
                            id="notes" 
                            name="notes" 
                            onChange={this.handleChange}
                        >
                        </textarea>
                        <br />
                        <UploadWidget />
                        <p><i>*Required fields</i></p>
                        <div className="Error-message">{this.state.errorMessage}</div>
                        <div className="Button-container">
                            <button
                                className="Add-sighting-button" 
                                type="submit"
                            >
                                Add Sighting
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddSightingForm);