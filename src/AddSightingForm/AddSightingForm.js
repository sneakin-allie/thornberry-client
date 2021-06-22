import React from 'react';
import { withRouter } from 'react-router-dom';

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

        const { date, location, animal, notes, photos } = e.target;

        const newSighting = { 
            date: date.value, 
            location: location.value, 
            animal: animal.value, 
            notes: notes.value, 
            photos: photos.value,
            email: this.props.userInfo.email
        };
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
                        <label htmlFor="location">Location:</label>
                        <input 
                            type="text" 
                            id="location" 
                            name="location" 
                            onChange={this.handleChange}
                        />
                        <br />
                        <label htmlFor="animal">Animal:</label>
                        <input 
                            type="text" 
                            id="animal" 
                            name="animal"
                            onChange={this.handleChange} 
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
                            id="photos" 
                            name="photos"
                            onChange={this.handleChange}
                        >
                        </input>
                        <br />
                        <button type="submit">Add sighting</button>
                    </form>
            </div>
        );
    }
}

export default withRouter(AddSightingForm);