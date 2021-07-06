import React from 'react';
import { withRouter } from 'react-router-dom';
import config from '../config';

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
        } else {
            // POST for new users
            fetch(config.API_BASE_URL + `/api/users/new`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => {
                    if(!res.ok) {
                        throw new Error(res.status)
                    }
                    return res.json()
                })
                .then(result => {
                    this.props.onSignUp(result);
                    this.props.history.push('/list')
                })
                .catch(error => {
                    this.setState({
                        errorMessage: "Email already exists"
                    })
                })
        }
    }

    render() {
        return (
            <div className="Signup">
                <h3>New User? Sign Up!</h3>
                    <form className="Signup-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="first-name">First name:*</label>
                        <input 
                            type="text" 
                            id="first-name" 
                            name="firstName" 
                            onChange={this.handleChange} 
                            required
                        />
                        <br />
                        <label htmlFor="last-name">Last name:*</label>
                        <input 
                            type="text" 
                            id="last-name" 
                            name="lastName"
                            onChange={this.handleChange}
                            required
                        />
                        <br />
                        <label htmlFor="email">Email:*</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            onChange={this.handleChange}
                            required
                        />
                        <br />
                        <label htmlFor="password">Password:*</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={this.handleChange}
                            required
                        />
                        <p><i>Password must be at least 8 characters and contain at least one number</i></p>
                        <p><i>*All fields required</i></p>
                        <div className="Error-message">{this.state.errorMessage}</div>
                        <br />
                        <button type="submit">Sign up</button>
                    </form>
            </div>    
        );
    }
}

export default withRouter(SignUpForm);