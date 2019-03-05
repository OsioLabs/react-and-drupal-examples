const config = {
  base: 'http://localhost/demos/react-tutorials/web',
  base: 'http://react-demos.lan',
};

const JSONAPI_ROOT = `${config.base}/jsonapi/`;

const headers = new Headers({
  'Accept': 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
  'Cache': 'no-cache'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
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
  // Get list of node content & store in this.state.data
  loadNodeData() {
    this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`, true);
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

  // Helper function wraps a normal fetch call with a fetch request that first
  // retrieves a CSRF token and then adds the token as an X-CSRF-Token header
  // to the options for desired fetch call.
  //
  // Use this in place of fetch() for any write/update operations like POST,
  // PATCH, and DELETE.
  fetchWithCSRFToken(url, options) {
    if (!options.headers.get('X-CSRF-Token')) {
      return fetch(`${config.base}/session/token?_format=json`)
        .then(response => response.text())
        .then((csrfToken) => {
          options.headers.append('X-CSRF-Token', csrfToken);
          return fetch(url, options);
        })
        .catch(err => console.log('Unable to obtain CSRF token:', err));
    }
    else {
      return fetch(url, options);
    }
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
    this.fetchJsonApiPost('patch', `${JSONAPI_ROOT}node/article`, data);
  }

  fetchJsonApiPost(destination, url, postData) {
    this.fetchWithCSRFToken(url, {
      method: 'POST',
      credentials: 'same-origin',
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

  // PATCH
  patchNode(id, data) {
    if (id !== undefined &&
        id !== null &&
        data !== undefined &&
        data !== null) {
      this.fetchJsonApiPatch('patch', `${JSONAPI_ROOT}node/article/${id}`, data);
    }
  }

  fetchJsonApiPatch(destination, url, update) {
    this.fetchWithCSRFToken(url, {
      method: 'PATCH',
      credentials: 'same-origin',
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

  // DELETE
  deleteNode(id) {
    if (id !== undefined && id !== null) {
      this.fetchJsonApiDelete('delete', `${JSONAPI_ROOT}node/article/${id}`);
    }
  }

  fetchJsonApiDelete(destination, url) {
    this.fetchWithCSRFToken(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers
    })
    .then(function(response) {
      // Should be 204
      console.log(response);
      return response;
    })
    .then((data) => {
      this.fetchJsonApiGet('data', `${JSONAPI_ROOT}node/article`);
    })
    .catch(err => console.log('API error:', err));
  }

  render() {
    return (
      <div className="App">
        <hr />
        <h2>All Articles</h2>
        <NodeList
          data={this.state.data}
          patchNode={this.patchNode}
          deleteNode={this.deleteNode}
        />
        <hr />
        <NodeNew postNode={this.postNode} />
      </div>
    );
  }
}

class NoData extends React.Component {
  render() {
    return <div>No pages found.</div>;
  }
}

class NodeDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
    }
    this.deleteNode = this.deleteNode.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  deleteNode(id) {
    this.props.deleteNode(id);
    this.cancelDelete();
  }

  showConfirm() {
    this.setState({ confirm: true });
  }

  cancelDelete() {
    this.setState({ confirm: false });
  }

  render() {
    let style = {
      panel: {
        margin: '30px',
        padding: '30px',
        backgroundColor: '#EEE',
      },
      inactive: {
        color: '#DDD',
      }
    };
    return (
      <div>
        {this.state.confirm === false &&
          <button onClick={() => this.showConfirm()}>
            Delete
          </button>
        }
        {this.state.confirm === true &&
          <button style={style.inactive}>
            Delete
          </button>
        }
        {this.state.confirm === true &&
          <div style={style.panel}>
            <div>Delete this Node?</div><br />
            <button onClick={() => this.deleteNode(this.props.id)}>Yes</button>
            <button onClick={() => this.cancelDelete()}>No</button>
          </div>
        }
      </div>
    );
  }
}

class NodeEdit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: {
        title: props.title,
        body: props.body,
      },
    };
    this.patchNode = this.patchNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  patchNode() {
    let data = {
        "data": {
          "id": this.props.id,
          "type": "node--article", // Not in documentation but required.
          "attributes": {
            "title": `${this.state.input.title}`,
            "body": {
              "value": `${this.input.value}`,
            }
        }
      }
    };
    this.props.patchNode(this.props.id, data);
    this.props.cancelEdit();
  }

  handleChange(event, target) {
    this.setState({input: { [target]: event.target.value}}, () => console.log(this.state));
  }

  handleSubmit(e) {
    this.patchNode();
    e.preventDefault();
  }

  render() {
    let styles = {
      form: {
        margin: '30px'
      },
      formItem: {
        margin: '10px'
      }
    }
    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        {/* https://reactjs.org/docs/forms.html#controlled-components */}
        <input
          name="title"
          type="text"
          value={this.state.input.title}
          onChange={(e) => this.handleChange(e, 'title')}
          style={styles.formItem}
        />
        <br />
        {/* https://reactjs.org/docs/uncontrolled-components.html */}
        <textarea
          name="body"
          id="patch-body"
          type="textarea"
          rows="4"
          cols="30"
          ref={(input) => this.input = input}
          defaultValue={this.state.input.body}
          style={styles.formItem}
        />

        <br />
        <input
          name="submit"
          type="submit"
          value="Save"
          style={styles.button}
        />
      </form>
    );
  }
}

class NodeItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
    }
    this.editNode = this.editNode.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  editNode(id) {
    this.props.editNode(id);
  }

  showEdit(e) {
    this.setState({ showEdit: true });
    e.preventDefault();
  }

  cancelEdit() {
    this.setState({ showEdit: false });
  }

  render() {
    let style = {
      content: {
        margin: '30px',
      },
      buttons: {
        margin: '30px',
      }
    };
    return (
      <div id={this.props.id}>
        <div style={style.content}>
          <h2>{this.props.attributes.title}</h2>
          {this.props.attributes.body && <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />}
        </div>
        <hr />
        <div style={style.buttons}>
          {this.state.showEdit === false &&
            <div>
              <button onClick={(e) => this.showEdit(e)}>
                Edit
              </button>
            </div>
          }
          {this.state.showEdit === true &&
            <div>
              <NodeEdit {...this.props} title={this.props.attributes.title} body={this.props.attributes.body.value} cancelEdit={this.cancelEdit} />
              <button onClick={() => this.cancelEdit()}>
                View
              </button>
            </div>
          }
          <NodeDelete {...this.props} />
        </div>
      </div>
    );
  }
}

class NodeList extends React.Component {
  render() {
    let { data, patchNode, deleteNode } = this.props;
    return (
        <div>
          {data !== null &&
            data.data !== undefined &&
            data.data !== null &&
            data.data.length > 0 ?
            data.data.map(item =>
              <NodeItem
                {...item}
                key={`node-${item.id}`}
                patchNode={patchNode}
                deleteNode={deleteNode}
              />)
            :
            <NoData />
          }
        </div>
    );
  }
}

class NodeNew extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        title: '',
      },
    };
    this.postNode = this.postNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postNode() {
    let data = {
      "data": {
        "type": "node--article", // Not in documentation but required.
        "attributes": {
          "title": `${this.state.input.title}`,
          "body": {
            "value": `${this.input.value}`,
            "format": 'plain_text',
          }
        }
      }
    };
    // console.log(data);
    this.props.postNode(data);
  }

  handleChange(event, target) {
    this.setState({input: { [target]: event.target.value}}, () => console.log(this.state));
  }

  handleSubmit(event) {
    this.postNode();
    event.preventDefault();
    // Clear out form.
    this.setState({input: { title: ''}});
    document.getElementById('post-body').value = "";
  }

  render() {
    let styles = {
      form: {
        margin: '30px'
      },
      formItem: {
        margin: '10px'
      }
    }
    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        <h3>Add a new article</h3>
        {/* https://reactjs.org/docs/forms.html#controlled-components */}
        <input
          name="title"
          type="text"
          value={this.state.input.title}
          placeholder="Title"
          onChange={(e) => this.handleChange(e, 'title')}
          style={styles.formItem}
        />
        <br />
        {/* https://reactjs.org/docs/uncontrolled-components.html */}
        <textarea
          id="post-body"
          name="body"
          type="textarea"
          rows="4"
          cols="30"
          ref={(input) => this.input = input}
          placeholder="Body"
          style={styles.formItem}
        />
        <br />
        <input
          name="submit"
          type="submit"
          value="Add Node"
          style={styles.button}
        />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-app'));
