import React from 'react';
import NoData from './../NoData/NoData';
import NodeItem from './../NodeItem/NodeItem';

export default class NodeList extends React.Component {
  render() {
    let { data, patchNode, deleteNode } = this.props;
    return (
        <div>
          {data !== null &&
            data.data !== undefined &&
            data.data !== null &&
            data.data.length > 0 ?
            data.data.map(item =>
              <NodeItem
                {...item}
                key={`node-${item.id}`}
                patchNode={patchNode}
                deleteNode={deleteNode}
              />)
            :
            <NoData />
          }
        </div>
    );
  }
}
