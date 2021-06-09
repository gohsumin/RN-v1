import React from "react";
import TabBar from "./navigations/TabBar";
import { NavigationContainer } from "@react-navigation/native";
import UsersContextProvider from "./data/UsersContextProvider";
import PostsContextProvider from "./data/PostsContextProvider";

export default function App() {
  return (
    <UsersContextProvider>
      <PostsContextProvider>
        <NavigationContainer>
          <TabBar />
        </NavigationContainer>
      </PostsContextProvider>
    </UsersContextProvider>
  );
}
