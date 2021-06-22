import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

        const { email, password } = e.target;
        const existingUser = {
            email: email.value,
            password: password.value
        };

        if (existingUser.email.length === 0) {
            this.setState({
                errorMessage: "Email is required"
            })
        } else if (existingUser.password.length === 0) {
            this.setState({
                errorMessage: "Password is required"
            })
        }
        
    }

    render() {

        return (
            <div className="login">
                <h3>Existing User? Log In!</h3>
                    <form className="login-form" onSubmit={this.handleSubmit}>
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
                        <div className='error-message'>{this.state.errorMessage}</div>
                        <br />
                        <button type="submit">Log in</button>
                    </form>
            </div>    
        );
    }
}

export default withRouter(LoginForm);