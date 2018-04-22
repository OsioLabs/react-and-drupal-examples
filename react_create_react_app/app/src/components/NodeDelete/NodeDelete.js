import React from 'react';

export default class NodeDelete extends React.Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
    }
    this.deleteNode = this.deleteNode.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  deleteNode(id) {
    this.props.deleteNode(id);
  }

  showConfirm() {
    this.setState({ confirm: true });
  }

  cancelDelete() {
    this.setState({ confirm: false });
  }

  render() {
    return (
      <div>
        {this.state.confirm === true &&
          <div>
            <div>Delete this Node?</div><br />
            <button onClick={() => this.deleteNode(this.props.id)}>Yes</button>
            <button onClick={() => this.cancelDelete()}>No</button>
          </div>
        }
        {this.state.confirm === false &&
          <button onClick={() => this.showConfirm()}>
            Delete
          </button>
        }
      </div>
    );
  }
}
