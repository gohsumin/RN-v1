import React from "react";
import { LogBox, Platform, Text } from "react-native";
import * as Linking from 'expo-linking';
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import UsersContext from "./data/UsersContext";
import AppContext from "./data/AppContext";
import WebStyleContextProvider from './data/WebStyleContextProvider';
import ThemeContextProvider from "./data/ThemeContextProvider";
import WebNavigationContext from './data/WebNavigationContext';
import WebMainSimpleNavigator from "./navigations/WebMainSimple";

// #########################################################
// note:
// run...
// vercel  --local-config ~/RN-v1/vercel.json --prod
// from ~/RN-v1/web-build
// after running...
// expo build:web
// from ~/RN-v1
// #########################################################

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "", //"realhunion",
      uid: "", //"b5aU5qla3eVPqX1asJviRcpYuDq1",
      theme: "dark",
    };

    this.platform = Platform.OS;
    this.linking = {
      prefixes: [Linking.createURL('https://www.soshworld.com')],
      config: {
        screens: {
          Landing: "landing",
          Privacy: "privacy",
          Terms: "terms",
          Home: "Home",
          Profile: ":app/:id",
          Tools: "tools",
        },
      },
    };

  }

  componentDidMount() {
    LogBox.ignoreAllLogs(true);
  }

  setUser = user => {
    this.setState({ user: user });
  }

  setUID = uid => {
    this.setState({ uid: uid });
  }

  setCurrentRoute = routeInfo => {
    this.setState({ currentRoute: routeInfo });
  }

  render() {
    return (
      /* Contexts can be composed later into a single component. */
      <WebNavigationContext.Provider
        value={{
          currentRoute: this.state.currentRoute,
          setCurrentRoute: this.setCurrentRoute
        }}>
        <WebStyleContextProvider>
          <AppContext.Provider
            value={{
              platform: this.platform,
              user: this.state.user,
              uid: this.state.uid,
              theme: this.state.theme,
              setUser: this.setUser,
              setUID: this.setUID
            }}>
            <ThemeContextProvider>
              <UsersContext.Provider>
                <NavigationContainer linking={this.linking} fallback={<Text>Loading...</Text>}>
                  {Platform.OS === "web" ? <WebMainSimpleNavigator /> : <RootStackNavigator />}
                </NavigationContainer>
              </UsersContext.Provider>
            </ThemeContextProvider>
          </AppContext.Provider>
        </WebStyleContextProvider>
      </WebNavigationContext.Provider>
    );
  }
}
