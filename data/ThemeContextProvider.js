import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
        dark: {
            background: 'black',
            antiBackground: 'white',
            foreground1: '#6a6a6a',
            foreground2: '#303030',
            foreground3: '#202020',
            foreground4: '#151515',
            blue: '#539dfc',
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            tabBar: 'rgba(22, 22, 22, 0.9)',
        },
        light: {
            background: 'white',
            antiBackground: 'black',
            foreground1: '#555',
            foreground2: '#ddd',
            foreground3: '#e3effe',
            foreground4: '#f9f9f9',
            blue: '#539dfc',
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            tabBar: 'rgba(255, 255, 255, 0.9)',
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
