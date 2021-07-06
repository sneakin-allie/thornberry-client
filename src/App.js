import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SightingsList from './SightingsList/SightingsList';
import LandingPage from './LandingPage/LandingPage';
import Nav from './Nav/Nav';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import AddSightingForm from './AddSightingForm/AddSightingForm';
import EditSightingForm from './EditSightingForm/EditSightingForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sightings: [],
      userInfo: {},
      isLoggedIn: false
    }
  }

  handleSignUp = newUser => {
    this.setState({
      userInfo: newUser,
      isLoggedIn: true
    })
  }

  handleLogin = existingUser => {
    this.setState({
      userInfo: existingUser,
      isLoggedIn: true
    })
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

  handleAddSighting = newSighting => {
    const oldSightings = this.state.sightings;
    this.setState({
        sightings: oldSightings.concat(newSighting)
    })
  }

  handleUpdateSighting = updatedSighting => {
    const editedSightings = this.state.sightings;
    for (let i = 0; i < editedSightings.length; i++) {
      if (Number(editedSightings[i].id) === Number(updatedSighting.id)) {
        editedSightings[i] = updatedSighting;
      }
    }
    this.setState({
      sightings: editedSightings
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            {isLoggedIn
              ? <Route path="/" component={Nav} />
              : null
            }
          </nav>
          <header>
            <Header />
          </header>
          <main>
            <Route 
              exact path="/" 
              component={(routeProps) => 
                <LandingPage 
                  {...routeProps} 
                  userInfo={this.state.userInfo}
                  onSignUp={this.handleSignUp}
                  onLogin={this.handleLogin}
                />
              } 
            />
            <Route
              path="/list"
              render={(routeProps) => 
                <SightingsList 
                  {...routeProps} 
                  userInfo={this.state.userInfo}
                  sightings={this.state.sightings}
                  onSignUp={this.handleSignUp} 
                  onLogin={this.handleLogin}
                  onAddSighting={this.handleAddSighting}
                  onUpdateSighting={this.handleUpdateSighting}
                  onDisplaySightings={this.handleDisplaySightings}
                />
              } 
            />
            <Route 
              path="/add" 
              render={(routeProps) => 
                <AddSightingForm 
                  {...routeProps}
                  userInfo={this.state.userInfo}
                  sightings={this.state.sightings}
                  onAddSighting={this.handleAddSighting}
                  onDisplaySightings={this.handleDisplaySightings}
                />
              } 
            />
            <Route 
              path="/edit/:id" 
              render={(routeProps) => 
                <EditSightingForm 
                  {...routeProps}
                  userInfo={this.state.userInfo}
                  sightings={this.state.sightings}
                  nUpdateSighting={this.handleUpdateSighting}
                  nDeleteSighting={this.handleDeleteSighting}
                />
              } 
            />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;