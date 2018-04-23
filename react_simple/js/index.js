class ShowNodeContent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 0,
    };
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
  }

  showContent() {
    this.setState({status: 1});
  }
  hideContent() {
    this.setState({status: 0});
  }
  render() {
    var style = {
      active: {
        width: '200px',
        height: '40px',
        padding: '10px',
        margin: '10px',
        color: '#333',
        backgroundColor: '#ddd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      inactive: {
        width: '200px',
        height: '40px',
        padding: '10px',
        margin: '10px',
        color: '#666',
        backgroundColor: '#ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      content: {
        margin: '30px',
        padding: '30px',
        backgroundColor: '#eee',
        border: '5px solid black'
      }
    };

    return (
      <div>
        {this.state.status === 1 &&
          <div>
            <div
              onClick={this.hideContent}
              style={style.inactive}
            >
              Hide content
            </div>
            <div style={style.content}>
              {this.props.content}
            </div>
          </div>
        }
        {this.state.status === 0 &&
          <div
            onClick={this.showContent}
            style={style.active}
          >
            Show more
          </div>
        }
      </div>
    );
  }
}

// # Example 2
// Create a new component that displays the content of the node.
class NodeContent extends React.Component {
  // Set up the initial state.
  constructor() {
    super();
    this.state = { example: 'An example of a state variable' };
  }
  // Output
  render() {
    // View data in console.
    // console.log(this.props.children);
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ShowNodeContent content={this.props.content}>
          <h2>{this.state.example}</h2>
          {/* Raw markup */}
          {/* Put node content in a div & render it as HTML */}
          <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        </ShowNodeContent>
      </div>
    );
  }
}

ReactDOM.render(
  <NodeContent title={document.getElementById('react-app').getAttribute("data-title")} content={document.getElementById('react-content').textContent} />,
  document.getElementById('react-app')
);
