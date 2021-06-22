import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from '../SignUpForm/SignUpForm';

class LandingPage extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <h3>Keep track of wildlife you've spotted</h3>
                <p>Wildlifer helps you keep track of the wildlife you've seen in one streamlined collection. Upload information about animals, dates, locations, notes, and photos. All of your sightings in one collection!</p>
                <br />
                <h3>Keep notes on each sighting</h3>
                <p>Wildlifer helps you remember the details you don't want to forget. Did the animal make a nest, lay eggs, get aggresive, or knock over a bird feeder? Keep notes of these moments and more!</p>
                <br />
                <h3>Add new sightings and edit sightings as you go</h3>
                <p>Wildlifer allows you to add new sightings and edit and delete them as needed. Upload information about a sighting before you forget, and then return to it later to add more details!</p>
                <SignUpForm onSignUp={this.props.onSignUp}/>
                <br />
                <LoginForm onLogin={this.props.onLogin}/>
            </div>
        );
    }
}

export default LandingPage;