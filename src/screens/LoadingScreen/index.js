import React from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import malliImage from "../../../assets/malli.png";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#B8F2E6", "#AED9E0"]} style={styles.gradient}>
        <Text style={styles.title}>Bloom</Text>
        <View style={styles.imageContainer}>
          <Image source={malliImage} style={styles.image} />
        </View>
        <Text style={styles.versionText}>v.2_Vendor</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 100,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "#324ab2",
    fontSize: 60,
    textAlign: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 70,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 18,
    color:"gray"
  },
});