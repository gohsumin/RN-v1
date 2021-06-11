import 'react-native-gesture-handler';
import React from "react";
import TabBar from "./navigations/TabBar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContextProvider from "./data/UsersContextProvider";
import PostsContextProvider from "./data/PostsContextProvider";

export default function App() {
  return (
    /* Contexts can be composed later into a single component. */
    <UsersContextProvider>
      <PostsContextProvider>
        <NavigationContainer>
          <TabBar />
        </NavigationContainer>
      </PostsContextProvider>
    </UsersContextProvider>
  );
}
