import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrdersScreen from "../screens/OrdersScreen";
import OrdersDeliveryScreen from "../screens/OrdersDeliveryScreen";
import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Profile from "../screens/ProfileScreen";
import OrdersScreen_v2 from "../screens/OrderHistoryScreen";
import OrderDetailsNavigator from "./OrderDetailsNavigator";
import OrderDetails from "../screens/OrderDetails";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};
const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} >
      <Tab.Screen
        name="Appointments"
        component={HomeStackNavigator}

        options={{
          tabBarInactiveBackgroundColor: "#FAF3DD",
          tabBarActiveBackgroundColor: "#FAF3DD",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={"#FFA69E"} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderStackNavigator}
        options={{
          tabBarInactiveBackgroundColor: "#FAF3DD",
          tabBarActiveBackgroundColor: "#FAF3DD",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book" size={24} color={"#FFA69E"} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Appointments" component={OrdersScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="History" component={OrdersDeliveryScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="History" component={OrdersScreen_v2} screenOptions={{ headerShown: false }} options={{ headerStyle: { backgroundColor: "#FAF3DD" } }}
      />
      <OrdersStack.Screen
        name="Appointment Details"
        component={OrderDetails}
        screenOptions={{ headerShown: false }}
      />
    </OrdersStack.Navigator>
  );
};

export default RootNavigator;