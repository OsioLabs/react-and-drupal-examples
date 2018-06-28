import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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
    this.cancelDelete();
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
            <RaisedButton label="Yes" onClick={() => this.deleteNode(this.props.id)} />
            <RaisedButton label="No" onClick={() => this.cancelDelete()} />
          </div>
        }
        {this.state.confirm === false &&
          <RaisedButton label="Delete" onClick={() => this.showConfirm()} />
        }
      </div>
    );
  }
}
