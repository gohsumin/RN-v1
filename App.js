
import React from "react";
import TabBar from "./navigations/TabBar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContextProvider from "./data/UsersContextProvider";
import PostsContextProvider from "./data/PostsContextProvider";
import AppContextProvider from "./data/AppContextProvider";

export default function App() {
  return (
    /* Contexts can be composed later into a single component. */
    <AppContextProvider>
      <UsersContextProvider>
        <PostsContextProvider>
          <NavigationContainer>
            <TabBar />
          </NavigationContainer>
        </PostsContextProvider>
      </UsersContextProvider>
    </AppContextProvider>
  );
}
