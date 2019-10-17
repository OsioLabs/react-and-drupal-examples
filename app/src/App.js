import React, { Component } from 'react';
import NodeList from './components/NodeList/NodeList';
import Login from './components/Login/Login';
import NodeNew from './components/NodeNew/NodeNew';
import './App.css';
// Import our config file.
import config from './config.js';
// Load the `base` value from config and set it as a constant.
const DRUPAL_API_ROOT = `${config.base}/`;
//Set a path to the Drupal API.
const JSONAPI_ROOT = `${config.base}/jsonapi/`;
// Create a setting for the content type we want to use.
const CONTENT_TYPE = `article`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Boolean value that the interface can use to toggle display for
      // authenticated and non authenticated users.
      appUserLoggedIn: false,
      // Value that stores responses from API requests.
      data: null,
      // If we have previously obtained a token and stored it in localStorage,
      // set it as the token for the state, otherwise, return null.
      token: localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null,
      // Username and password will be connected to a login form to allow users
      // to enter in their account information.
      username: '',
      password: ''
    };
    this.buildHeader = this.buildHeader.bind(this);
    this.loadNodeData = this.loadNodeData.bind(this);
    this.postNode = this.postNode.bind(this);
    this.patchNode = this.patchNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.fetchJsonApiGet = this.fetchJsonApiGet.bind(this);
    this.fetchJsonApiPost = this.fetchJsonApiPost.bind(this);
    this.fetchJsonApiPatch = this.fetchJsonApiPatch.bind(this);
    this.fetchJsonApiDelete = this.fetchJsonApiDelete.bind(this);
    this.updateData = this.updateData.bind(this);
    this.checkInvalidData = this.checkInvalidData.bind(this);
    this.getOauthToken = this.getOauthToken.bind(this);
    this.fetchOauthToken = this.fetchOauthToken.bind(this);
    this.refreshOauthToken = this.refreshOauthToken.bind(this);
  }

  componentDidMount() {
    // If there is an existing token, but it's expired, update it.
    if (this.state.token !== null && this.state.token.expirationDate > Math.floor(Date.now() / 1000)) {
      localStorage.clear();
      this.getRefreshToken();
    }

    // If there is an existing token use it to load node data.
    if (this.state.token !== null) {
      this.setState({'appUserLoggedIn': true});
      this.loadNodeData();
    }
  }

  buildHeader() {
    let header = new Headers({
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `${this.state.token.token_type} ${this.state.token.access_token} `
    });
    return header;
  }

  // GET
  // Get list of node content & store in this.state.data
  loadNodeData() {
    this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/${CONTENT_TYPE}`, true);
  }

  getOauthToken(username, password) {
    console.log('getting oauth token');
    this.fetchOauthToken('token', `${DRUPAL_API_ROOT}oauth/token`, username, password);
  }

  getRefreshToken() {
    console.log('getting refresh token');
    this.refreshOauthToken('token', `${DRUPAL_API_ROOT}oauth/token`);
  }

  fetchOauthToken(destination, url, username, password) {
    console.log('getting oauth token');
    let formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', config.oauth.client_id);
    formData.append('client_secret', config.oauth.client_secret);
    formData.append('scope', config.oauth.scope);
    formData.append('username', username);
    formData.append('password', password);
    fetch(url, {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
      }),
      body: formData,
      })
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.log('Error retrieving token', data);
          return false;
        }

        let token = Object.assign({}, data); // Make a copy of data object.
        // Convert the date to a UNIX timestamp.
        token.date = Math.floor(Date.now() / 1000);
        token.expirationDate = token.date + token.expires_in;
        this.setState({'token': token});
        this.setState({'appUserLoggedIn': true});
        localStorage.setItem('token', JSON.stringify(token));
        // After getting a new token we should also refresh the node data since
        // different users might have access to different content.
        this.loadNodeData();
      })
      .catch(err => console.log('API got an error', err));
  }

  refreshOauthToken(destination, url) {
    console.log("getting refresh token");
    if (this.state.token !== null) {
      let formData = new FormData();
      formData.append('grant_type', 'refresh_token');
      formData.append('client_id', config.oauth.client_id);
      formData.append('client_secret', config.oauth.client_secret);
      formData.append('scope', config.oauth.scope);
      formData.append('refresh_token', this.state.token.refresh_token);

      fetch(url, {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
        }),
        body: formData,
        })
        .then(function(response) {
          return response.json();
        })
        .then((data) => {
          console.log('refresh token', data);
          let token = Object.assign({}, data);
          // Convert the date to a UNIX timestamp.
          token.date = Math.floor(Date.now() / 1000);
          token.expirationDate = token.date + token.expires_in;
          this.setState({'token': token});
          localStorage.setItem('token', JSON.stringify(token));
        })
        .catch(err => console.log('API got an error', err));
    }
  }

  // Update the data object in state, optionally validating.
  updateData(destination, responseData, validate = true) {
    const validatedData = this.checkInvalidData(responseData, validate);
    if (validatedData || validate === false) {
      this.setState( { [destination]: responseData }, () => console.log(this.state));
    }
  }

  // Check that the data response is in the format we expect.
  checkInvalidData(data, validate = true) {
    if (validate) {
      if (data === null) {
        return false;
      }
      if (data.data === undefined ||
          data.data === null ) {
        return false;
      }
      return true;
    }
    return true;
  }

  // Perform GET request. If successful, update state.
  fetchJsonApiGet(destination, url) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(destination, data))
      .catch(err => console.log('API error:', err));
  }

  // POST
  postNode(data) {
    this.fetchJsonApiPost('patch', `${JSONAPI_ROOT}node/${CONTENT_TYPE}`, data);
  }

  fetchJsonApiPost(destination, url, postData) {
    if (this.state.token !== null) {
      fetch(url, {
        method: 'POST',
        headers: this.buildHeader(),
        mode: 'cors',
        body: JSON.stringify(postData)
      })
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        this.updateData(destination, data, false);
        this.loadNodeData();
      })
      .catch(err => console.log('API error:', err));
    }
  }

  // PATCH
  patchNode(id, data) {
    if (id !== undefined &&
        id !== null &&
        data !== undefined &&
        data !== null) {
      this.fetchJsonApiPatch('patch', `${JSONAPI_ROOT}node/${CONTENT_TYPE}/${id}`, data);
    }
  }

  fetchJsonApiPatch(destination, url, update) {
    if (this.state.token !== null) {
      fetch(url, {
        method: 'PATCH',
        headers: this.buildHeader(),
        mode: 'cors',
        body: JSON.stringify(update)
      })
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        this.updateData(destination, data, false);
        this.loadNodeData();
      })
      .catch(err => console.log('API error:', err));
    }
  }

  // DELETE
  deleteNode(id) {
    if (id !== undefined && id !== null) {
      this.fetchJsonApiDelete('delete', `${JSONAPI_ROOT}node/${CONTENT_TYPE}/${id}`);
    }
  }

  fetchJsonApiDelete(destination, url) {
    if (this.state.token !== null) {
      fetch(url, {
        method: 'DELETE',
        headers: this.buildHeader(),
        mode: 'cors',
      })
      .then(function(response) {
        // Should be 204
        console.log(response);
        return response;
      })
      .then((data) => {
        this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/${CONTENT_TYPE}`);
      })
      .catch(err => console.log('API error:', err));
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.appUserLoggedIn === true &&
          <NodeList
            data={this.state.data}
            patchNode={this.patchNode}
            deleteNode={this.deleteNode}
          />
        }
        {this.state.appUserLoggedIn === true &&
          <NodeNew postNode={this.postNode} contentType={CONTENT_TYPE}/>
        }
        {this.state.appUserLoggedIn === false &&
          <Login loginFunction={this.getOauthToken} />
        }
      </div>
    );
  }
}

export default App;
