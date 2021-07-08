import React from 'react';
import './UploadWidget.css';

class UploadWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: "",
            imageAlt: ""
        }
    }

    openWidget = () => {
        window.cloudinary.createUploadWidget({
            cloudName: "thornberry",
            uploadPreset: "sightingsimages"
        }, (error, result) => {
            this.setState({
                imageUrl: result.event.success.info.url,
                imageAlt: `An image of ${result.event.success.info.original_filename}`
            })
            console.log("result:", result)
        },).open();
    };

    handleImageUpload = e => {
        e.preventDefault();
        console.log("handleImageUpload called")
    }

    /*
    ~~~ EXAMPLES ~~~

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

    handleDisplaySightings = results => {
        const sortedSightings = results.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return d-c;
        });
        this.setState({
        sightings: sortedSightings
        })
    }

    componentDidMount() {
        // GET sightings by user email
        fetch(config.API_BASE_URL + `/api/sightings/${this.props.userInfo.email}`, {
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
            .then((results) => {
                this.props.onDisplaySightings(results)
            })
            .catch(err => this.setState({ err }))
    }

    */

    render() {
        return (
            <div className="Upload-widget">
                <form>
                    <button 
                        type="button" 
                        className="Widget-button" 
                        onClick={this.openWidget}
                    >
                        Upload Photo
                    </button>
                    <button 
                        type="button" 
                        className="Submit-button" 
                        onClick={this.handleImageUpload}
                    >
                        Submit
                    </button>
                </form>
                <div>
                    <p>Photo preview:</p>
                    <img src={this.state.imageUrl} alt={this.state.imageAlt} />
                </div>
            </div>
        )
    }
}

export default UploadWidget;