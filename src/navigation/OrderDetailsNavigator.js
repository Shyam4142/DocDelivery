import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderDetails from "../screens/OrderDetails";
import OrderLiveChat from "../screens/OrderLiveChat";
import OrderCourierSubmission from "../screens/OrderCourierSubmission";


const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({ route }) => {
  const id = route?.params?.id;

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen name="Details">{() => <OrderDetails id={id} />}</Tab.Screen>

    </Tab.Navigator>
  );
};

export default OrderDetailsNavigator;
