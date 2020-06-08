import React from "react";
import Header from "components/Header";

import "./style.scss";

export default class Homepage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.props.handleDrawerToggle}
          title="Python Create"
        />

        <main className={this.props.classes.main}>
          Homepage.
        </main>
      </React.Fragment>
    );
  }
}
