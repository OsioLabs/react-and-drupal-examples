// # Example 4
class NodeItem extends React.Component {
  render() {
    return <div>
      <h2>{this.props.attributes.title}</h2>
      <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />
    </div>;
  }
}

class NoData extends React.Component {
  render() {
    return <div>No pages found.</div>;
  }
}

class Loading extends React.Component {
  render() {
    return <div>Loading data</div>;
  }
}

class NodeList extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
    this.loadNodeData = this.loadNodeData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.checkInvalidData = this.checkInvalidData.bind(this);
  }

  componentWillMount() {
    this.loadNodeData();
  }

  loadNodeData() {
    const API_ROOT = 'http://localhost:8888/drupal/jsonapi/';
    const url = `${API_ROOT}node/page`;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then((data) => this.updateData(data))
      .catch(err => console.log('API got an error', err))
  }

  updateData(responseData) {
    console.log(responseData);
    const validatedData = this.checkInvalidData(responseData);
    if (validatedData) {
      this.setState( { data: responseData.data }, () => console.log(this.state));
    }
  }

  checkInvalidData(data) {
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

  render() {
    return (
      <div>
        {this.state.data !== null ?
          this.state.data.map(item => <NodeItem {...item} />)
          :
          <NoData />
        }
      </div>
    );
  }
}

ReactDOM.render(
  <NodeList />,
  document.getElementById('react-app')
);
