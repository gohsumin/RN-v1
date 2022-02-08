import React, { Component } from "react";
import ThemeContext from "./ThemeContext";

class ThemeContextProvider extends Component {
  state = {
    colors: {
      dark: {
        antiBackground: 'white',
        mainText: "white",
        // darker
        text1: "#777",
        text2: "#999",
        text3: "#bbb",
        text4: "#ddd",
        // lighter
        background: 'black',
        eyeSafeBackground: '#121212',
        // darker
        background1: '#222',
        background2: '#444',
        background3: '#666',
        background4: '#888',
        // lighter
        blue: '#3586f8',
        availableBalance: '#3CB371',
        pendingBalance: '#ff7400',
        homeHeaderGradient: ['#0d0d0d', '#0d0d0d'],
        headerGradient: ['#040202', '#151515'],
        tabBarGradient: ['#151515', '#020000'],
        tabBarInactiveTint: '#e0e0e0',
        green: "#75fa4d",
        signGreen: "#ccff02",
      },
      light: {
        antiBackground: 'black',
        mainText: "black",
        // lighter
        text1: "#888",
        text2: "#666",
        text3: "#444",
        text4: "#222",
        // darker
        background: 'white',
        eyeSafeBackground: '#f9fafa',
        // lighter
        background1: '#f7f7f7',
        background2: '#e8f4ff',
        background3: '#ddd',
        background4: '#333',
        // darker
        blue: '#539dfc',
        availableBalance: '#1cc96b',
        pendingBalance: '#ff851f',
        homeHeaderGradient: ['white', '#f9fafa'],
        headerGradient: ['white', '#fbfbfb'],
        tabBarGradient: ['#fbfbfb', 'white'],
        tabBarInactiveTint: '#222',
        green: "#5e7",
        signGreen: "#1e7"
      }
    }
  };

  render() {
    return (
      <ThemeContext.Provider value={{ colors: this.state.colors }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
