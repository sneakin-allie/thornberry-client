import React from 'react';
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
            photos: "",
            id: "",
            image: "",
            url: "",
            errorMessage: null
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    uploadImage = e => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "sightingsimages")
        data.append("cloud_name", "thornberry")
        
        fetch("https://api.cloudinary.com/v1_1/thornberry/image/upload", {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log("data:", data)
            })
            .catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault();
        const { date, location, animal, notes, photos } = e.target;
        const newSighting = { 
            date: date.value, 
            location: location.value, 
            animal: animal.value, 
            notes: notes.value, 
            photos: photos.value,
            email: this.props.userInfo.email
        };

        // POST for a new sighting
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
            <div className="add-new-sighting">
                <h3>Add New Sighting</h3>
                    <form className="add-new-sighting-form" onSubmit={this.handleSubmit}>
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
                        <label htmlFor="photos">Photos:</label>
                        <input 
                            type="file"
                            id="file" 
                            name="file"
                            placeholder="Upload an image"
                            onChange={this.handleChange}
                        >
                        </input>
                            <p><i>*Required fields</i></p>
                            <div className="Error-message">{this.state.errorMessage}</div>
                                <button type="submit">Add Sighting</button>
                    </form>
            </div>
        );
    }
}

export default withRouter(AddSightingForm);