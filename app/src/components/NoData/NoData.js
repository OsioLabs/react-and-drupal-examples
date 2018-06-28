import React from 'react';
import Paper from 'material-ui/Paper';

export default class NoData extends React.Component {
  render() {
    const style = {
      margin: 10,
      padding: 30,
      display: 'inline-block',
    };
    return <Paper style={style} zDepth={2}>
      No articles found.
    </Paper>
  }
}
