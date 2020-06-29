import React from "react";
import ReactMarkdown from 'react-markdown'

import { Paper } from "@material-ui/core";
import markdownSource from "pages/Homepage/Homepage.md"
import Header from "components/Header";
import { Helmet } from "react-helmet";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { markdown: null }
  }

  componentDidMount() {
    fetch(markdownSource).then((response) => response.text()).then((text) => {
      this.setState({ markdown: text })
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header onDrawerToggle={this.props.handleDrawerToggle} />
        <Helmet>
          <title>Homepage | Python Create</title>
          <meta name="description" content="Python Create offers generators and instructions on using Python optimally. Get help writing your code with the tools we offer." />
          <meta name="robots" content="index, follow" />
        </Helmet>
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
