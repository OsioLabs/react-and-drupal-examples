import React from 'react';

export default class NodeEdit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      input: {
        title: '',
        // body: '',
      },
      placeholder: {
        title: props.title,
        body: props.body,
      }
    };
    this.patchNode = this.patchNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  patchNode() {
    let data = {
        "data": {
          "id": this.props.id,
          "type": "node--page", // Not in documentation but required.
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
          placeholder={this.state.placeholder.title}
          onChange={(e) => this.handleChange(e, 'title')}
          style={styles.formItem}
        />
        <br />
        {/* https://reactjs.org/docs/uncontrolled-components.html */}
        <textarea
          name="body"
          type="textarea"
          rows="10"
          cols="30"
          // value={this.state.input.body}
          ref={(input) => this.input = input}
          placeholder={this.state.placeholder.body}
          style={styles.formItem}
          // onChange={(e) => this.handleChange(e, 'body')}
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
