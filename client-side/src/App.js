import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  // TODO: migrate to ES6 syntax
  // const appHeader = () => {

  // }

  state = { users: [] };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  componentDidUpdate() {
    console.log('Users: ' + this.state.users);
  }

  render() {
    return (
      <div className="App">
        {/* Default Create-React-App splash screen with nice spinny React logo :) */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        {/* Users list, populated from backend! Following https://daveceddia.com/create-react-app-express-backend/ , progress/guide location found if you ctrl-f "Open up client/src"*/}
        <div>
          <h1>Users</h1>
          {this.state.users.map(user =>
            <div key={user.id}>
              {user.username}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
