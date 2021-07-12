import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <p>© 2021 Allison Schulman. All rights reserved. Connect with me: <a href="https://www.linkedin.com/in/allisonschulman/" target="_blank" rel="noreferrer">LinkedIn</a> <a href="https://github.com/sneakin-allie" target="_blank" rel="noreferrer">GitHub</a></p>
            </div>
        );
    }
}

export default Footer;