import { useRef, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import orders from "../../../assets/data/orders.json";
import vendors from "../../../assets/data/vendors.json";

import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";

const order = orders[0];
const vendor = vendors[0];

const vendorLocation = {
  latitude: order.vendorLat,
  longitude: order.vendorLng,
};
const deliveryLocation = {
  latitude: order.userLat,
  longitude: order.userLng,
};

const ORDER_STATUSES = {
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  ACCEPTED: "ACCEPTED",
  PICKED_UP: "PICKED_UP",
};

const OrderDelivery = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState(
    ORDER_STATUSES.READY_FOR_PICKUP
  );
  const [isDriverClose, setIsDriverClose] = useState(false);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    fetchLocation();

    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );

    return () => {
      foregroundSubscription.remove();
    };
  }, []);

  if (!driverLocation) {
    return <ActivityIndicator size={"large"} />;
  }

  const onButtonPressed = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      bottomSheetRef.current?.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setDeliveryStatus(ORDER_STATUSES.ACCEPTED);
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
      bottomSheetRef.current?.collapse();
      setDeliveryStatus(ORDER_STATUSES.PICKED_UP);
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
      bottomSheetRef.current?.collapse();
      navigation.goBack();
      console.warn("Delivery Finished");
    }
  };

  const renderButtonTitle = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      return "Accept Order";
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED) {
      return "At Location";
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP) {
      return "Completed";
    }
  };

  const isButtonDisabled = () => {
    if (deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.ACCEPTED && isDriverClose) {
      return false;
    }
    if (deliveryStatus === ORDER_STATUSES.PICKED_UP && isDriverClose) {
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ width, height }}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            deliveryStatus === ORDER_STATUSES.ACCEPTED
              ? vendorLocation
              : deliveryLocation
          }
          strokeWidth={10}
          waypoints={
            deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP
              ? [vendorLocation]
              : []
          }
          strokeColor="#3FC060"
          apikey={"AIzaSyCiJyEgtQMaJooIVEePYaT4toc2XZHhb5I"}
          onReady={(result) => {
            setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <Marker
          coordinate={{
            latitude: order.vendorLat,
            longitude: order.vendorLng,
          }}
          title={order.vendorName}
          description={order.vendorAddress}
        >
          {/* <Image
            source={require("path_to_your_vendor_icon")}
            style={{ width: 30, height: 30 }}
          /> */}
        </Marker>

        <Marker
          coordinate={{
            latitude: order.userLat,
            longitude: order.userLng,
          }}
          title={order.userName}
          description={order.userDeliveryAddress}
        >
          {/* <Image
            source={require("user icon")}
            style={{ width: 30, height: 30 }}
          /> */}
        </Marker>
      </MapView>
      {deliveryStatus === ORDER_STATUSES.READY_FOR_PICKUP && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="black"
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>
            {totalMinutes.toFixed(0)} min
          </Text>
          <FontAwesome5
            name="shopping-bag"
            size={30}
            color="#3FC060"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.vendorName}>{order.vendorName}</Text>
          <View style={styles.addressContainer}>
            <Fontisto name="shopping-store" size={22} color="grey" />
            <Text style={styles.addressText}>{order.vendorAddress}</Text>
          </View>
          <View style={styles.addressContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
            <Text style={styles.addressText}>{order.userDeliveryAddress}</Text>
          </View>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderItemText}>Mens Haircut x1</Text>
            <Text style={styles.orderItemText}>Womens Haircut x3</Text>
            <Text style={styles.orderItemText}>Beard x3</Text>
          </View>
        </View>
        <Pressable
          style={{
            ...styles.buttonContainer,
            backgroundColor: isButtonDisabled() ? "grey" : "#3FC060",
          }}
          onPress={onButtonPressed}
          disabled={isButtonDisabled()}
        >
          <Text style={styles.buttonText}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};


export default OrderDelivery;