import { View, Text, FlatList, StyleSheet } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import vendors from "../../../assets/data/vendors.json";

const OrdersScreen = () => {
  return (
    <View style={{ backgroundColor: "#FAF3DD", flex: 1, width: "100%" }}>
      <View style={Styles.circle}></View>
      <View style={Styles.circle2}></View>
      <FlatList
        data={vendors}
        renderItem={({ item }) => {
          console.log(item);
          return <OrderListItem order={item} />;
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create(
  {
    circle: {
      width: 240,
      height: 240,
      borderRadius: 240 / 2,
      backgroundColor: "#fa020e",
      left: "40%",
      top: "70%",
      position: 'absolute'
    },
    circle2: {
      width: 200,
      height: 200,
      borderRadius: 200 / 2,
      backgroundColor: "#4f90db",
      left: "0%",
      top: "80%",
      position: 'absolute'

    }
  })

export default OrdersScreen;