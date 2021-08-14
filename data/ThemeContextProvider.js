import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
        dark: {
            background: 'black',
            eyeSafeBackground: '#0d0d0d',
            webMainBackground: '#181818',
            antiBackground: 'white',
            foreground1: '#908f96',
            foreground2: '#303030',
            foreground3: '#2c2c2e',
            foreground4: '#222',
            blue: '#3586f8',
            availableBalance: '#3CB371',
            pendingBalance: '#ff7400',
            homeHeaderGradient: ['#070707','#0d0d0d'],
            headerGradient: ['#070707', '#111'],
            tabBarGradient: ['#151515', '#020000'],
            tabBarInactiveTint: '#e0e0e0',
            green: "#75fa4d",
        },
        light: {
            background: 'white',
            eyeSafeBackground: '#f9fafa',
            antiBackground: 'black',
            foreground1: '#333',
            foreground2: '#ddd',
            foreground3: '#e8f4ff',
            foreground4: '#f7f7f7',
            blue: '#539dfc',
            availableBalance: '#1cc96b',
            pendingBalance: '#ff851f',
            homeHeaderGradient: ['white', '#f9fafa'],
            headerGradient: ['white', '#fbfbfb'],
            tabBarGradient: ['#fbfbfb', 'white'],
            tabBarInactiveTint: '#222',
            green: "#5e7",
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
