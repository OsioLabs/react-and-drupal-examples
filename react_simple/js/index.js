class ShowNodeContent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 0,
      typeEffectContent: null,
    };
    this.buttonActivate = this.buttonActivate.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
  }
  componentDidMount() {
    let { content } = this.props;
    if (content !== undefined &&
      content !== null) {
      var lines = [];
      var maxLineLength = 100;
      var words = content.split(" ");
      var currentLine = words[0];
      var lineLength = currentLine.length;
      for (var i = 1; i < words.length; i++) {
          var word = words[i];
          lineLength += word.length + 1;
          if (word !== "") {
            if (lineLength <= maxLineLength) {
              currentLine += " " + word;
            } else {
              lines.push(currentLine);
              currentLine = word;
              lineLength = word.length;
            }
          }
        }
        lines.push(currentLine);
        this.setState({typeEffectContent: lines });
    }
  }

  componentDidUpdate() {
    if (this.state.status === 1 &&
        this.state.typeEffectContent !== null) {
        // https://mattboldt.com/demos/typed-js/
        // https://github.com/mattboldt/typed.js/blob/master/README.md
        // Full docs: https://mattboldt.com/typed.js/docs/
        var typed = new Typed('#typed', {
          strings: this.state.typeEffectContent,
          typeSpeed: 0,
          backSpeed: 0,
          fadeOut: true,
          loop: false
        });
    }
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
              onClick={this.buttonDisable}
              style={style.active}
            >
              Hide content
            </div>
            <div style={style.content}>
              <div id="typed" />
            </div>
          </div>
        }
        {this.state.status === 0 &&
          <div
            onClick={this.buttonActivate}
            style={style.inactive}
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
    var style = {
      // color: '#fff',
      // backgroundColor: '#ddd',
    };
    // View data in console.
    // console.log(this.props.children);
    return (
      <div
        style={style}
      >
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
  <NodeContent title={document.getElementById('react-app').getAttribute("data-title")} content={document.getElementById('react-app').textContent} />,
  document.getElementById('react-app')
);
