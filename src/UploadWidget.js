import React from 'react';

class UploadWidget extends React.Component {
    openWidget = () => {
        window.cloudinary.createUploadWidget({
            cloudName: "thornberry",
            uploadPreset: "sightingsimages"
        }, (error, result) => {
            this.setState({
                imageUrl: result.info.secure_url,
                imageAlt: `An image of ${result.info.original_filename}`
            })
        },).open();
    };

    render() {    
        return (
            <div className="Widget">
                <button type="button" className="widget-btn" onClick={this.openWidget}>Upload Photo</button>
            </div>
        )
    }
}

export default UploadWidget;