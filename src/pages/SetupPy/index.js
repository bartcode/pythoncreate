import React from "react";
import Header from "components/Header";

import "./style.scss";

export default class SetupPy extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.props.handleDrawerToggle}
          title="setup.py generator"
        />

        <main className={this.props.classes.main}>
          Setup.py generator.
        </main>
      </React.Fragment>
    );
  }
}
