// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Orders from './Orders';
import TaskSales from './TaskSales';
import NotificationsScreen from './NotificationsScreen';
import ActivityScreen from './ActivityScreen';
import Customers from './Customers';

const Tab = createBottomTabNavigator();



export function App() {
  return (
    <NavigationContainer>
        
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Dashboard') iconName = 'speedometer';
            else if (route.name === 'Analytics') iconName = 'analytics';
            else if (route.name === 'Customers') iconName = 'people';
            else if (route.name === 'Orders') iconName = 'cart';
            else if (route.name === 'Task Sales') iconName = 'checkbox';
            else if (route.name === 'Notifications') iconName = 'notifications';
            else if (route.name === 'Activity') iconName = 'pulse';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3b5998',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Analytics" component={Analytics} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Customers" component={Customers} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="Task Sales" component={TaskSales} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
