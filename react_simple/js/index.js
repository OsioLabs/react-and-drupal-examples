class NodeItem extends React.Component {
  render() {
    return <div>
      Node Item
    </div>;
  }
}

class NoData extends React.Component {
  render() {
    return <div>No articles found.</div>;
  }
}

class NodeList extends React.Component {
  constructor() {
    super();
    this.state = { data: null };
    this.loadNodeData = this.loadNodeData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    this.loadNodeData();
  }

  componentWillMount() {
    this.loadNodeData();
  }

  loadNodeData() {
    console.log('load node data');
  }

  updateData() {
    console.log('update node data');
  }

  render() {
    const style = {
      nodeItem: {
        border: '2px solid black',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#ccc',
      },
      nodeItemActive: {
        border: '2px solid black',
        margin: '10px',
        padding: '10px',
        backgroundColor: '#fff',
      }
    };

    return (
      <div>
        <h2>Site content</h2>
        <NodeItem />
        <NoData />
      </div>
    );
  }
}

ReactDOM.render(
  <NodeList
    nid={document.getElementById('react-app').getAttribute('data-nid')}
  />,
  document.getElementById('react-app')
);
