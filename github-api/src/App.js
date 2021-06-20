import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  //  atest
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: null
    };
  }
  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }

  getUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);

    let repos = await this.getUserRepo(this.refs.username.value);
    this.setState({
      user: {
        username: user.login
      },
      repos
    });
  }

  renderRepos(repos) {
    return repos.map(item => {
      return (
        <div key={item.id} className="repoResults">
          <p>{item.name}</p>
        </div>
      );
    });
  }
  renderUser(user) {
    return (
      <div>
        <p>
          Username:
          {user.username} <br />
        </p>
      </div>
    );
  }
  render() {
    const { user, repos } = this.state;
    return (
      <div className="GitHubSearch">
        <header className="Search-header">
          <h1>Github User Search </h1>
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input ref="username" type="text" placeholder="username" />
        </form>
        <div className="Search-intro">
          <h4> User info: </h4>
          {user && this.renderUser(user)}
        </div>
        <div>
          <h4> Repos: </h4>
          {repos && this.renderRepos(repos)}
        </div>
      </div>
    );
  }
}

export default App;
