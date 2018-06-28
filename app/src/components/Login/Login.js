import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class Login extends React.Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      input: {
        username: null,
        password: null,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let newState = Object.assign({}, this.state);
    newState.input[event.target.name] = event.target.value;
    this.setState(newState, () => console.log(this.state));
  }

  handleSubmit(event, loginFunction) {
    event.preventDefault();
    loginFunction(this.state.input.username, this.state.input.password);
  }

  render() {
    const style = {
      marginRight: 20,
    };
    return (
      <form onSubmit={(event) => { this.handleSubmit(event, this.props.loginFunction) }}>
        {/* https://reactjs.org/docs/forms.html#controlled-components */}
        <TextField
          name="username"
          defaultValue={this.state.input.username}
          floatingLabelText="username"
          floatingLabelFixed={true}
          onChange={(e) => this.handleChange(e)}
        /><br />
        <TextField
          name="password"
          floatingLabelText="password"
          floatingLabelFixed={true}
          value={this.state.input.password}
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
