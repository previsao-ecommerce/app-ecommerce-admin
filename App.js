// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Orders from "./Orders";
import TaskSales from "./TaskSales";
import NotificationsScreen from "./NotificationsScreen";
import ActivityScreen from "./ActivityScreen";
import Customers from "./Customers";

const Tab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Início"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Início") iconName = "home";
            else if (route.name === "Dashboard") iconName = "speedometer";
            else if (route.name === "Clientes") iconName = "people";
            else if (route.name === "Pedidos") iconName = "cart";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3b5998",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Clientes" component={Customers} />
        <Tab.Screen name="Pedidos" component={Orders} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
