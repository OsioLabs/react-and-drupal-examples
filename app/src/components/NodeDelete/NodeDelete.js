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
    this.cancelDelete();
  }

  showConfirm() {
    this.setState({ confirm: true });
  }

  cancelDelete() {
    this.setState({ confirm: false });
  }

  render() {
    let style = {
      panel: {
        margin: '30px',
        padding: '30px',
        backgroundColor: '#EEE',
      },
      inactive: {
        color: '#DDD',
      }
    };
    return (
      <div>
        {this.state.confirm === false &&
          <button onClick={() => this.showConfirm()}>
            Delete
          </button>
        }
        {this.state.confirm === true &&
          <button style={style.inactive}>
            Delete
          </button>
        }
        {this.state.confirm === true &&
          <div style={style.panel}>
            <div>Delete this Node?</div><br />
            <button onClick={() => this.deleteNode(this.props.id)}>Yes</button>
            <button onClick={() => this.cancelDelete()}>No</button>
          </div>
        }
      </div>
    );
  }
}
