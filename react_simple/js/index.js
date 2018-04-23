// Create a new component that displays the content of the node.
class NodeContent extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </div>
    );
  }
}

ReactDOM.render(
  <NodeContent
    title={document.getElementById('react-content').getAttribute("data-title")}
    content={document.getElementById('react-content').innerHTML}
  />,
  document.getElementById('react-app')
);
