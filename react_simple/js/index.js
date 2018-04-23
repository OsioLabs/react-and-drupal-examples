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
            <button
              onClick={this.hideContent}
              style={style.inactive}
            >
              Hide content
            </button>
            <div
              style={style.content}
              dangerouslySetInnerHTML={{__html: this.props.content }}
            />
          </div>
        }
        {this.state.status === 0 &&
          <button
            onClick={this.showContent}
            style={style.active}
          >
            Show more
          </button>
        }
      </div>
    );
  }
}

// Create a new component that displays the content of the node.
class NodeContent extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <ShowNodeContent {...this.props} />
      </div>
    );
  }
}

ReactDOM.render(
  <NodeContent
    title={document.getElementById('react-content').getAttribute("data-title")}
    content={document.getElementById('react-content').innerHTML}
  />,
  document.getElementById('react-app')
);
