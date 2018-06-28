import React from 'react';

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
        <label>Username:
          <input
            name="username"
            type="text"
            onChange={(e) => this.handleChange(e)}
          />
        </label><br />
        <label>Password:
          <input
            name="password"
            type="password"
            onChange={(e) => this.handleChange(e)}
          />
        </label><br />
        <input
          name="submit"
          type="submit"
          value="Login"
        />
      </form>
    );
  }
}
