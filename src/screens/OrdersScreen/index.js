import { useRef, useMemo, useEffect, useState } from "react";
import { View, Text, FlatList, useWindowDimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import orders from "../../../assets/data/orders.json";
import OrderItem from "../../components/OrderItem";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import * as Location from 'expo-location';
import couriers from "../../../assets/data/couriers.json";

const OrdersScreen = () => {
  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const [currentLocation, setCurrentLocation] = useState(null);
    const courier = couriers[0]
  const snapPoints = useMemo(() => ["12%", "95%"], []);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.log('Error getting current location:', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    const distanceMiles = distance * 0.621371; 
    return distanceMiles;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const filteredOrders = orders.filter((order) => {
    if (!currentLocation) {
      return false;
    }
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      order.vendorLat,
      order.vendorLng
    );
    return distance < courier.workRange; 
  });

  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <MapView style={{ height, width }} showsUserLocation followsUserLocation>
        {filteredOrders.map((order) => (
          <Marker
            key={order.id}
            title={order.vendorName}
            description={order.vendorAddress}
            coordinate={{
              latitude: order.vendorLat,
              longitude: order.vendorLng,
            }}
          >
            <View style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}>
              <Entypo name="shop" size={24} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", letterSpacing: 0.5, paddingBottom: 5 }}>
            You're Online
          </Text>
          <Text style={{ letterSpacing: 0.5, color: "grey" }}>
            Pending Appointments: {filteredOrders.length}
          </Text>
        </View>
        <FlatList data={filteredOrders} renderItem={({ item }) => <OrderItem order={item} />} />
      </BottomSheet>
    </View>
  );
};

export default OrdersScreen;