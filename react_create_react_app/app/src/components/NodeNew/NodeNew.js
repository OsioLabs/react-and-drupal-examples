import React from 'react';

export default class NodeNew extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {
        title: '',
        // body: '',
      },
      placeholder: {
        title: 'Default Title',
        body: 'Default Body',
      }
    };
    this.postNode = this.postNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postNode() {
    let data = {
      "data": {
        "type": "node--page", // Not in documentation but required.
        "attributes": {
          "title": `${this.state.input.title}`,
          "body": {
            "value": `${this.input.value}`,
            "format": 'plain_text',
          }
        }
      }
    };
    console.log(data);
    this.props.postNode(data);
  }

  handleChange(event, target) {
    this.setState({input: { [target]: event.target.value}}, () => console.log(this.state));
  }

  handleSubmit(event) {
    this.postNode();
    event.preventDefault();
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
          value="Add Node"
          style={styles.button}
        />
      </form>
    );
  }
}
