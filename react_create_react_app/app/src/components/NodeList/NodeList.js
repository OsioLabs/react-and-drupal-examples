import React from 'react';
import NoData from './../NoData/NoData';
import NodeItem from './../NodeItem/NodeItem';
import NodeNew from './../NodeNew/NodeNew';
import config from './../../config.js';
const JSONAPI_ROOT = 'http://localhost:8888/drupal/jsonapi/';

class NodeList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      token: null,
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

  fetchJsonApiGet(destination, url) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(destination, data))
      .catch(err => console.log('API error:', err));
  }

  loadNodeData() {
    this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/page`);
  }

  patchNode(id, data) {
    if (id !== undefined &&
        id !== null &&
        data !== undefined &&
        data !== null) {
      this.fetchJsonApiPatch('patch', `${JSONAPI_ROOT}node/page/${id}`, data);
    }
  }

  fetchJsonApiPatch(destination, url, update) {
    fetch(url, {
      method: 'PATCH',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Basic ${this.state.encodedAuthentication}`
      }),
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

  postNode(data) {
    this.fetchJsonApiPost('patch', `${JSONAPI_ROOT}node/page`, data);
  }

  fetchJsonApiPost(destination, url, postData) {
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Basic ${this.state.encodedAuthentication}`
      }),
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

  deleteNode(id) {
    if (id !== undefined && id !== null) {
      this.fetchJsonApiDelete('patch', `${JSONAPI_ROOT}node/page/${id}`);
    }
  }

  fetchJsonApiDelete(destination, url) {
    fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Basic ${this.state.encodedAuthentication}`
      }),
    })
    .then(function(response) {
      // Should be 204
      console.log(response)
      return response;
    })
    .then((data) => {
      this.loadNodeData();
    })
    .catch(err => console.log('API error:', err));
  }

  updateData(destination, responseData, validate) {
    const validatedData = this.checkInvalidData(responseData, validate);
    if (validatedData) {
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

  render() {
    return (
        <div>
          {this.state.data !== null &&
            this.state.data.data !== undefined &&
            this.state.data.data !== null ?
            this.state.data.data.map(item => <NodeItem
              {...item}
              key={`node-${item.id}`}
              patchNode={this.patchNode}
              deleteNode={this.deleteNode}
            />)
            :
            <NoData />
          }
          <NodeNew postNode={this.postNode} />
        </div>
    );
  }
}

export default NodeList;
