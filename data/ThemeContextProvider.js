import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
        dark: {
            background: 'black',
            antiBackground: 'white',
            foreground1: '#ddd',
            foreground2: '#303030',
            foreground3: '#202020',
            foreground4: '#151515',
            blue: '#4faaff',/* 
            blue: 'white', */
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            tabBar: 'rgba(0, 0, 0, 0.7)',
            /* tabBar: 'transparent', */
            tabBarInactiveTint: '#e0e0e0'/* 
            tabBarInactiveTint: '#ddd' */
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
            /* tabBar: 'rgba(255, 255, 255, 0.9)', */
            tabBar: 'rgba(255, 255, 255, 0.6)',
            tabBarInactiveTint: '#222'
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
