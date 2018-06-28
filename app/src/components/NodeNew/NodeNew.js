import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class NodeNew extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        title: '',
        body: '',
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
            "value": `${this.state.input.body}`,
            "format": 'plain_text',
          }
        }
      }
    };
    this.props.postNode(data);
    this.setState({input: { title: '', body: ''}})
  }

  handleChange(event) {
    let newState = Object.assign({}, this.state);
    newState.input[event.target.name] = event.target.value;
    this.setState(newState /*, () => console.log(this.state)*/ );
    event.preventDefault();
  }

  handleSubmit(event) {
    this.postNode();
    event.preventDefault();
  }

  render() {
    const style = {
      marginRight: 20,
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Add a new Article</h3>
        {/* https://www.material-ui.com/#/components/text-field */}
        {/* https://reactjs.org/docs/forms.html#controlled-components */}

        <TextField
          name="title"
          value={this.state.input.title}
          floatingLabelText="Title"
          floatingLabelFixed={true}
          onChange={(e) => this.handleChange(e)}
        /><br />
        <TextField
          name="body"
          floatingLabelText="Body"
          floatingLabelFixed={true}
          multiLine={true}
          rows={2}
          rowsMax={4}
          fullWidth={true}
          value={this.state.input.body}
          onChange={(e) => this.handleChange(e)}
        /><br />
        <FloatingActionButton
          mini={true}
          style={style}
          name="submit"
          type="submit"
        >
          <ContentAdd />
        </FloatingActionButton>

      </form>
    );
  }
}
