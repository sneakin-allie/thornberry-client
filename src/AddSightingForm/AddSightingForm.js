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
            id: "",
            imageUrl: null,
            imageAlt: null,
            errorMessage: null
        }
        this.fileInput = React.createRef();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        // below is trying to fetch Cloudinary
        const data = new FormData();
        data.append("file", this.fileInput.current.files[0].name);
        data.append("upload_preset", "sightingsimages")
        
        fetch("https://api.cloudinary.com/v1_1/thornberry/image/upload", {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    imageUrl: res.secure_url,
                    imageAlt: `An image of ${res.original_filename}`
                })
            })
            .catch(err => console.log(err));

        // below is from original 
        const { date, location, animal, notes } = e.target;
        const newSighting = { 
            date: date.value, 
            location: location.value, 
            animal: animal.value, 
            notes: notes.value, 
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
        const { imageUrl, imageAlt } = this.state;

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
                        <label htmlFor="photo">Photo:</label>
                        <input 
                            type="file"
                            id="file" 
                            name="file"
                            className="cloudinary-filupload"
                            ref={this.fileInput}
                            placeholder="Upload an image"
                        >
                        </input>
                            <p><i>*Required fields</i></p>
                            <div className="Error-message">{this.state.errorMessage}</div>
                                <button type="submit">Add Sighting</button>
                    </form>
                    <section>
                        <p>Image to display here</p>
                        {imageUrl && (
                            <img src={imageUrl} alt={imageAlt} />
                        )}
                    </section>
            </div>
        );
    }
}

export default withRouter(AddSightingForm);