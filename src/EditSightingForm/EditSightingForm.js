import React from 'react';
import { withRouter } from 'react-router-dom';

class EditSightingForm extends React.Component {
    constructor(props) {
        super(props);

        this.date = React.createRef();
        this.location = React.createRef();
        this.animal = React.createRef();
        this.notes = React.createRef();
        this.photos = React.createRef();
    }

    handleUpdate = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const updatedSighting = {
            date: this.date.current.value,
            location: this.location.current.value,
            animal: this.animal.current.value,
            notes: this.notes.current.value,
            photos: this.photos.current.value,
            id
        };
 
    }
    
    handleDelete = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
    }

    render() {
        const id = this.props.match.params.id;
        const currentSighting = this.props.sightings.find(sighting => 
            (Number(sighting.id) === Number(id))
        )

        return (
            <div className="edit-sighting">
                <h3>Edit Sighting</h3>
                    <form className="edit-sighting-form">
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
                            defaultValue={currentSighting.locatino}
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
                        <label htmlFor="photos">Photos:</label>
                        <input 
                            type="file" 
                            id="photos" 
                            name="photos" 
                            defaultValue={currentSighting.photos}
                            ref={this.photos}
                        />
                        <br />
                        <button 
                            onClick={this.handleUpdate}
                            type="button">
                            Update
                        </button>
                        <button
                            onClick={this.handleDelete}
                            type="button">
                            Delete
                        </button>
                    </form>
            </div>
        );
    }
}

export default withRouter(EditSightingForm);