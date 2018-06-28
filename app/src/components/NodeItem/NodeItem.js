import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
    const style = {
      nodeItem: {
        margin: 10,
        padding: 30,
        display: 'inline-block',
      },
      content: {
        padding: 30,
      }
    };
    return (
      <Paper id={this.props.id} style={style.nodeItem} zDepth={2}>
        <div style={style.content}>
          <h2>{this.props.attributes.title}</h2>
          <div dangerouslySetInnerHTML={{__html: this.props.attributes.body.value}} />
        </div>
        {this.state.showEdit === false &&
          <RaisedButton label="Edit" onClick={(e) => this.showEdit(e)} />
        }
        {this.state.showEdit === true &&
          <div>
            <NodeEdit {...this.props} cancelEdit={this.cancelEdit} />
            <RaisedButton label="View" onClick={() => this.cancelEdit()} />
          </div>
        }
        <NodeDelete {...this.props} />
      </Paper>
    );
  }
}
