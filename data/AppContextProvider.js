import React, { Component } from "react";
import AppContext from "./AppContext";

class AppContextProvider extends Component {
  state = {
    user: "michelle",
  };

  render() {
    return (
      <AppContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
