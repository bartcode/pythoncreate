import React from "react";
import ReactMarkdown from 'react-markdown'

import { Paper } from "@material-ui/core";
import markdownSource from "pages/Homepage/Homepage.md"

export default class Homepage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { markdown: null }
  }

  componentWillMount() {
    fetch(markdownSource).then((response) => response.text()).then((text) => {
      this.setState({ markdown: text })
    })
  }

  render() {
    return (
      <React.Fragment>
        <main className={this.props.classes.main}>
          <Paper className={this.props.classes.paper}>
            <div className={this.props.classes.contentWrapper}>
              <ReactMarkdown
                source={this.state.markdown}
                escapeHtml={false}
              />
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
