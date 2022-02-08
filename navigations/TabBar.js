import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator } from "./HomeStackNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { LinearGradient } from 'expo-linear-gradient';
import MeStackNavigator from "./MeStackNavigator.js";

const Tab = createBottomTabNavigator();

function TabBar() {
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const { user, uid } = React.useContext(AppContext);
  const tabBarHeight = Platform.OS === "android" ? 57 : 80;

  function TabBarComponent({ state, descriptors, navigation }) {

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View style={{
        flexDirection: 'row', justifyContent: 'space-around',
        // borderWidth: 1, borderColor: "white"
      }}>
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
                : route.name === "MeStack"
                  ? "Me" /* user */ : route.name;

          const isFocused = state.index === index;

          const iconName = route.name === "Home" ?
            (isFocused ? "home" : "home-outline") :
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
                width: 80,
                paddingTop: 10,
                // borderColor: "blue",borderWidth:1,
                alignItems: 'center',
                justifyContent: 'flex-start',
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
                marginTop: 1,
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
    <Tab.Navigator
      tabBar={props => <TabBarComponent {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} />
      <Tab.Screen
        name="MeStack"
        component={MeStackNavigator} />
    </Tab.Navigator>
  );
}

export default TabBar;
