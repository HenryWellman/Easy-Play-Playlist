import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {},
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        tabBarStyle: { borderTopWidth: 0 },
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "green",
        },
      })}
    >
      <tab.Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="list" size={size} color={color} />;
          },
        }}
      />
      <tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="headset" size={size} color={color} />;
          },
        }}
      />
      <tab.Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="library-music" size={size} color={color} />
            );
          },
        }}
      />
    </tab.Navigator>
  );
};

export default AppNavigator;
