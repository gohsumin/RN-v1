import React from "react";
import { View, Platform, StatusBar, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClubsScreen from "../screens/Explore.js";
import { HomeStackNavigator } from "./HomeStackNavigator";
import { ActivityStackNavigator } from "./ActivityStackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FlashMessage from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function TabBar() {
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const { user } = React.useContext(AppContext);
  const tabBarHeight = 50;

  function TabBarComponent({ state, descriptors, navigation }) {

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <LinearGradient
          style={{
            height: tabBarHeight,
            width: "100%",
            position: "absolute",
            left: 0,
            bottom: 0,
            borderTopColor: "rgba(255, 255, 255, 0.2)",
            borderTopWidth: 0.3,
          }}
          locations={[0.1, 1]}
          colors={colors.tabBarGradient}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name === "Profile"
                  ? user : route.name;

          const isFocused = state.index === index;

          const iconName = route.name === "Home" ?
            (isFocused ? "home" : "home-outline") :
            route.name === "Explore" ?
              (isFocused ? "search" : "search-outline") :
              (isFocused ? "person" : "person-outline");

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                height: tabBarHeight,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <Icon
                name={iconName}
                size={25}
                color={isFocused ? colors.blue : colors.tabBarInactiveTint} />
              <Text style={{
                color: isFocused ? colors.blue : colors.tabBarInactiveTint,
                fontSize: 10.5,
                marginTop: 2,
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })
        }
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlashMessage position="top" />
      <Tab.Navigator
        tabBar={props => <TabBarComponent {...props} />}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Explore" component={ClubsScreen} />
        <Tab.Screen name="Profile" component={ActivityStackNavigator} />
      </Tab.Navigator>
    </View>
  );
}

export default TabBar;
