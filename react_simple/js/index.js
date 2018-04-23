class ToggleButton extends React.Component {
  constructor() {
    super();
    this.state = { status: 0 };
    this.buttonActivate = this.buttonActivate.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
  }
  buttonActivate() {
    this.setState({status: 1});
  }
  buttonDisable() {
    this.setState({status: 0});
  }
  render() {
    var style = {
      active: {
        width: '200px',
        height: '40px',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#fff',
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
        backgroundColor: '#cccccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
      }
    };
    return (
      <div>
        {this.state.status === 1 &&
          <div
            onClick={this.buttonDisable}
            style={style.active}
          >
            Enabled
          </div>
        }
        {this.state.status === 0 &&
          <div
            onClick={this.buttonActivate}
            style={style.inactive}
          >
            Disabled
          </div>
        }
      </div>
    );
  }
}

// # Example 2
// Create a new component that displays the content of the node.
class Welcome extends React.Component {
  // Set up the initial state.
  constructor() {
    super();
    this.state = { name: 'World' };
  }
  // Output
  render() {
    var style = {
      color: '#fff',
      backgroundColor: '#DDDDDD',
    };
    // View data in console.
    // console.log(this.props.children);
    return (
      <div
        style={style}
      >
        <h1>Hello, {this.state.name}. {this.props.message}!</h1>
        <ToggleButton />
        {/* Raw markup */}
        {/* {this.props.children.join('')} */}

        {/* Put node content in a div & render HTML */}
        <div dangerouslySetInnerHTML={{ __html: this.props.children.join('') }} />
      </div>
    );
  }
}

ReactDOM.render(
  <Welcome message="Hi! How are things?"> { document.getElementById('react-app').innerHTML } </Welcome>,
  document.getElementById('react-app')
);
