import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config';
import './AddSightingForm.css'

class AddSightingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: "",
            location: "",
            animal: "",
            notes: "",
            photos: "",
            id: "",
            errorMessage: null,
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
            photos: this.state.photos,
            email: this.props.userInfo.email
        };
        console.log("newSighting:", newSighting)

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
            .catch(err => this.setState({ errorMessage: "Something went wrong. Try again later." }))
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
        const photos = this.state.photos;

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
                                {photos && 
                                    <div>
                                        <p>Photo preview:</p>
                                        <img src={this.state.photos} alt="animal" />
                                    </div>
                                }
                            </div>
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