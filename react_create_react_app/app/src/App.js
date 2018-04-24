import React, { Component } from 'react';
import NodeList from './components/NodeList/NodeList';
import NodeNew from './components/NodeNew/NodeNew';
import './App.css';
import config from './config.js';
const JSONAPI_ROOT = `${config.base}/jsonapi/`;
const headers = new Headers({
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Authorization': `Basic ${config.encodedAuthentication}`
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      encodedAuthentication: config.encodedAuthentication,
    };
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
  }

  componentWillMount() {
    this.loadNodeData();
  }

  // GET
  loadNodeData() {
    this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`, true);
  }

  updateData(destination, responseData, validate = true) {
    const validatedData = this.checkInvalidData(responseData, validate);
    if (validatedData || validate === false) {
      this.setState( { [destination]: responseData }, () => console.log(this.state));
    }
  }

  checkInvalidData(data, validate = true) {
    if (validate) {
      if (data === null) {
        return false;
      }
      if (data.data === undefined ||
          data.data === null ||
          data.data.length === 0 ) {
        return false;
      }
      return true;
    }
    return true;
  }

  fetchJsonApiGet(destination, url, validate) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(destination, data, validate))
      .catch(err => console.log('API error:', err));
  }

  patchNode(id, data) {
    if (id !== undefined &&
        id !== null &&
        data !== undefined &&
        data !== null) {
      this.fetchJsonApiPatch('patch', `${JSONAPI_ROOT}node/article/${id}`, data);
    }
  }

  // PATCH
  fetchJsonApiPatch(destination, url, update) {
    fetch(url, {
      method: 'PATCH',
      headers,
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

  // POST
  postNode(data) {
    this.fetchJsonApiPost('patch', `${JSONAPI_ROOT}node/article`, data);
  }

  fetchJsonApiPost(destination, url, postData) {
    fetch(url, {
      method: 'POST',
      headers,
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

  // DELETE
  deleteNode(id) {
    if (id !== undefined && id !== null) {
      this.fetchJsonApiDelete('delete', `${JSONAPI_ROOT}node/article/${id}`);
    }
  }

  fetchJsonApiDelete(destination, url) {
    fetch(url, {
      method: 'DELETE',
      headers
    })
    .then(function(response) {
      // Should be 204
      console.log(response);
      return response;
    })
    .then((data) => {
      this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`, false);
    })
    .catch(err => console.log('API error:', err));
  }

  render() {
    return (
      <div className="App">
        <NodeList
          data={this.state.data}
          patchNode={this.patchNode}
          deleteNode={this.deleteNode}
        />
        <NodeNew postNode={this.postNode} />
      </div>
    );
  }
}

export default App;
