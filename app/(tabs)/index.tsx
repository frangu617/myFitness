import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";

export default function Home() {
  const [user, setUser] = useState("Guest");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData.name || "Guest");
      }
    };

    fetchUserData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <ImageBackground
          source={require("@/assets/images/field2.webp")}
          style={styles.bgimage}
        >
          <Image
            source={require("@/assets/images/fitnessLogo.png")}
            style={styles.reactLogo}
          />
        </ImageBackground>
      }
    >
      <ThemedView style={styles.container}>
        <View>
          <ThemedText style={styles.title}>Welcome to My Fitness</ThemedText>
          {user === "Guest" ? (
            <>
              <ThemedText style={styles.paragraph}>
                My Fitness is a comprehensive application designed to assist you
                in achieving your fitness goals.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                To support your journey, this application meticulously tracks a
                range of your statistics and activities.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                Within My Fitness, you will find valuable tools to monitor your
                workouts and nutrition effectively.
              </ThemedText>
              <ThemedText style={styles.paragraph}>
                To maximize the benefits of this application, please{" "}
                <Pressable
                  style={styles.button}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text style={styles.buttonText}>something else</Text>
                </Pressable>
                .
              </ThemedText>
            </>
          ) : (
            <>
              <ThemedText>
                Welcome, {user}! My Fitness is an application dedicated to help
                you reach your fitness goals.
              </ThemedText>
              <ThemedText>
                Are you looking to{" "}
                <Text style={{ color: "blue" }}>start a new workout</Text>?
              </ThemedText>
              <ThemedText>
                or maybe just{" "}
                <Text style={{ color: "blue" }}>check your progress</Text>?
              </ThemedText>
            </>
          )}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#017eb0",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#017eb0",
    borderColor: "#b17028",
    borderWidth: 2,
    borderRadius: 10,
    marginRight: "15%",
    marginLeft: "15%",
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#d59e41",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    marginTop: 16,
    color: "#d59e41",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "yellow",
    fontSize: 16,
    fontWeight: "bold",
  },
  reactLogo: {
    height: 300,
    width: 300,
    bottom: -125,
    left: 0,
    position: "absolute",
  },

  bgimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    bottom: 5,
    left: 0,
  },
});
