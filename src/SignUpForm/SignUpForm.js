import React from 'react';
import { withRouter } from 'react-router-dom';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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

        const { firstName, lastName, email, password } = e.target;
        const newUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }
        
        if (newUser.firstName.length === 0) {
            this.setState({
                errorMessage: "First name is required"
            })
        } else if (newUser.lastName.length === 0) {
            this.setState({
                errorMessage: "Last name is required"
            })
        } else if (newUser.email.length === 0) {
            this.setState({
                errorMessage: "Email is required"
            })
        } else if (newUser.password.length === 0) {
            this.setState({
                errorMessage: "Password is required"
            })
        } else if (newUser.password.length < 8) {
            this.setState({
                errorMessage: "Password must be at least 8 characters"
            })
        } else if (!newUser.password.match(/[0-9]/)) {
            this.setState({
                errorMessage: "Password must contain at least one number"
            })
        }
    }

    render() {
        return (
            <div className="signup">
                <h3>New User? Sign Up!</h3>
                    <form className="signup-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="first-name">First name:</label>
                        <input 
                            type="text" 
                            id="first-name" 
                            name="firstName" 
                            onChange={this.handleChange} 
                        />
                        <br />
                        <label htmlFor="last-name">Last name:</label>
                        <input 
                            type="text" 
                            id="last-name" 
                            name="lastName"
                            onChange={this.handleChange}
                        />
                        
                        <br />
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            onChange={this.handleChange}
                        />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="text" 
                            id="password" 
                            name="password" 
                            onChange={this.handleChange}
                        />
                        <div className="error-message">{this.state.errorMessage}</div>
                        <br />
                        <button type="submit">Sign up</button>
                    </form>
            </div>    
        );
    }
}

export default withRouter(SignUpForm);