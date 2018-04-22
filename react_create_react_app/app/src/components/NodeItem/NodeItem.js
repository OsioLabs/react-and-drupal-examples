import React from 'react';
import NodeDelete from './../NodeDelete/NodeDelete';
import NodeEdit from './../NodeEdit/NodeEdit';

export default class NodeItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
    }
    this.editNode = this.editNode.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  editNode(id) {
    this.props.editNode(id);
  }

  showEdit(e) {
    this.setState({ showEdit: true });
    e.preventDefault();
  }

  cancelEdit() {
    this.setState({ showEdit: false });
  }

  render() {
    return (
      <div id={this.props.id}>

        <h2>{this.props.attributes.title}</h2>
        <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />

        {this.state.showEdit === false &&
          <div>
            <button onClick={(e) => this.showEdit(e)}>
              Edit
            </button>
          </div>
        }
        {this.state.showEdit === true &&
          <div>
            <NodeEdit {...this.props} cancelEdit={this.cancelEdit} />
            <button onClick={() => this.cancelEdit()}>
              View
            </button>
          </div>
        }


        <NodeDelete {...this.props} />
      </div>
    );
  }
}
