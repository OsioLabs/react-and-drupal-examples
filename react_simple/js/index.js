class ShowNodeContent extends React.Component {

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
          <div>
            <div
              onClick={this.buttonDisable}
              style={style.active}
            >
              Hide content
            </div>
            <div style={style.content}>
              {this.props.content}
            </div>
          </div>

          <div
            onClick={this.buttonActivate}
            style={style.inactive}
          >
            Show more
          </div>
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
        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
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
