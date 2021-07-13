import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignUpForm from '../SignUpForm/SignUpForm';
import './LandingPage.css';

class LandingPage extends React.Component {
    render() {
        return (
            <div className="Landing-page">
                <h3>Keep track of wildlife you've spotted</h3>
                    <p className="Landing-page-text">Thornberry helps you keep track of wildlife you've seen in one streamlined collection. Upload information about animals, dates, locations, notes, and photos. All of your sightings in one collection!</p>
                <h3>Keep notes on each sighting</h3>
                    <p className="Landing-page-text">Thornberry helps you remember the details you never want to forget. Did the animal start building a nest, lay eggs, get aggresive, or knock something over on the lawn? Keep notes of these moments and more!</p>
                <h3>Add new sightings and edit as you go</h3>
                    <p className="Landing-page-text">Thornberry allows you to add new sightings and edit and delete them as needed. Upload information about a sighting before you forget, and then return to it later to add more details!</p>
                <div className="group">
                    <div className="item-double">
                        <SignUpForm onSignUp={this.props.onSignUp}/>
                    </div>
                    <div className="item-double">
                        <LoginForm onLogin={this.props.onLogin}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;