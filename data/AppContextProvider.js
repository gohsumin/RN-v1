import React, { Component } from "react";
import AppContext from "./AppContext";

class AppContextProvider extends Component {
  state = {
    user: "joe",
    theme: "dark",
  };

  render() {
    return (
      <AppContext.Provider
        value={{ user: this.state.user, theme: this.state.theme }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
