import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
        dark: {
            background: 'black',
            antiBackground: 'white',
            foreground1: '#908f96',
            foreground2: '#303030',
            foreground3: '#2c2c2e',
            foreground4: '#121111',
            blue: '#3586f8',
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            tabBar: 'black',
            tabBarInactiveTint: '#e0e0e0',
            green: "#75fa4d",
        },
        light: {
            background: 'white',
            antiBackground: 'black',
            foreground1: '#333',
            foreground2: '#ddd',
            foreground3: '#e8f4ff',
            foreground4: '#f9f9f9',
            blue: '#539dfc',
            availableBalance: '#1cc96b',
            pendingBalance: '#ff851f',
            tabBar: 'rgba(255, 255, 255, 0.6)',
            tabBarInactiveTint: '#222',
            green: "#ADFF2F",
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
