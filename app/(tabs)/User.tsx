import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface UserData {
  name: string;
  weight: number;
  heightFeet: number;
  heightInches: number;
  age: number;
  gender: string;
  bmi: number;
  dailyCalories: number;
}

export default function User() {
  const [userData, setUserData] = useState<UserData>({
    name: "Guest",
    weight: 0,
    heightFeet: 0,
    heightInches: 0,
    age: 0,
    gender: "",
    bmi: 0,
    dailyCalories: 0,
  });

  const [user, setUser] = useState("Guest");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUser(parsedUserData.name || "Guest");
          setUserData({
            name: parsedUserData.name || "Guest",
            weight: parsedUserData.weight || 0,
            heightFeet: parsedUserData.heightFeet || 0,
            heightInches: parsedUserData.heightInches || 0,
            age: parsedUserData.age || 0,
            gender: parsedUserData.gender || "",
            bmi: parsedUserData.bmi || 0,
            dailyCalories: parsedUserData.dailyCalories || 0,
          });
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const {
    name,
    weight,
    heightFeet,
    heightInches,
    age,
    gender,
    bmi,
    dailyCalories,
  } = userData;

  return (
    <View style={styles.card}>
      {user !== "Guest" ? (
        <View style={styles.user}>
          <View style={styles.card}>
            <Text style={styles.strong}>Name: </Text>
            <Text>{name}</Text>
            <Text style={styles.strong}>Weight:</Text>
            <Text>{weight} lbs</Text>
            <Text style={styles.strong}>Height:</Text>
            <Text>
              {heightFeet}'{heightInches}"
            </Text>
            <Text style={styles.strong}>Age:</Text>
            <Text>{age}</Text>
            <Text style={styles.strong}>Gender:</Text>
            <Text>{gender}</Text>
            <Text style={styles.strong}>BMI:</Text>
            <Text>{bmi}</Text>
            <Text style={styles.strong}>Daily Calories:</Text>
            <Text>{dailyCalories}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.guestContainer}>
          <Text style={styles.welcomeText}>Welcome Guest</Text>
          <Text>
            Please{" "}
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />{" "}
            to get started
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    boxShadowColor: "#000",
    boxShadowOpacity: 0.1,
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowRadius: 10,
  },
  user: {
    alignItems: "flex-start",
  },
  strong: {
    fontWeight: "bold",
  },
  guestContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
  },
});
