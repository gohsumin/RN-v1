import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
        dark: {
            background: 'black',
            antiBackground: 'white',
            editProfileButton: '#303030',
            smallText: '#6a6a6a',
            balanceItemBackground: '#202020',
            blue: '#539dfc',
            profileFeedBackground: '#151515',
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            tabBar: 'rgba(22, 22, 22, 0.9)',
        }
    }
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ colors: this.state.colors }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
