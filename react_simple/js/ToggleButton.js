// # Example 3
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

ReactDOM.render(
  <ToggleButton />,
  document.getElementById('react-app')
);
