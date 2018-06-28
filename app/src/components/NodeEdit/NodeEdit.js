import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class NodeEdit extends React.Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      input: {
        title: props.attributes.title,
        body: props.attributes.body.value,
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
              "value": `${this.state.input.body}`,
            }
        }
      }
    };
    this.props.patchNode(this.props.id, data);
    this.props.cancelEdit();
  }

  handleChange(event) {
    let newState = Object.assign({}, this.state);
    newState.input[event.target.name] = event.target.value;
    this.setState(newState, () => console.log(this.state));
    event.preventDefault();
  }

  handleSubmit(event) {
    this.patchNode();
    event.preventDefault();
  }

  render() {
    const style = {
      marginRight: 20,
    };
    return (
      <form onSubmit={this.handleSubmit}>
        {/* https://reactjs.org/docs/forms.html#controlled-components */}
        <TextField
          name="title"
          defaultValue={this.state.input.title}
          floatingLabelText="Title"
          floatingLabelFixed={true}
          onChange={(e) => this.handleChange(e)}
        /><br />
        <TextField
          name="body"
          // defaultValue={this.state.input.body}
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
