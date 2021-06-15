import React, { Component } from "react";
import SwipeCardsContext from "./SwipeCardsContext";

class SwipeCardsContextProvider extends Component {

  state = {
    
  }

  render() {
    return (
      <SwipeCardsContext.Provider
      >
        {this.props.children}
      </SwipeCardsContext.Provider>
    );
  }
}

export default SwipeCardsContextProvider;
