import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";

export default function TodayWorkout() {
  const [user, setUser] = useState("Guest");
  const [cardio, setCardio] = useState("");
  const [cardioDuration, setCardioDuration] = useState(0);
  const [cardioStartHeartRate, setCardioStartHeartRate] = useState(0);
  const [cardioMaxHeartRate, setCardioMaxHeartRate] = useState(0);
  const [cardioCaloriesBurned, setCardioCaloriesBurned] = useState(0);
  const [cardioEffort, setCardioEffort] = useState(0);
  const [workoutLogged, setWorkoutLogged] = useState(false);
  const [todaysWorkout, setTodaysWorkout] = useState<{
    cardio?: string;
    duration?: number;
    startHeartRate?: number;
    maxHeartRate?: number;
    caloriesBurned?: number;
    effort?: number;
  } | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUser(parsedUserData.name || "Guest");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    fetchUserData();
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  let yyyy = today.getFullYear();
  let wday = today.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleSubmit = async () => {
    // Save the workout with today's date
    const workoutData = {
      date: `${mm}/${dd}/${yyyy}`,
      cardio,
      duration: cardioDuration,
      startHeartRate: cardioStartHeartRate,
      maxHeartRate: cardioMaxHeartRate,
      caloriesBurned: cardioCaloriesBurned,
      effort: cardioEffort,
    };

    try {
      await AsyncStorage.setItem("workout", JSON.stringify(workoutData));
      setTodaysWorkout(workoutData);
      setWorkoutLogged(true);

      // Clear form inputs after submission
      setCardio("");
      setCardioDuration(0);
      setCardioStartHeartRate(0);
      setCardioMaxHeartRate(0);
      setCardioCaloriesBurned(0);
      setCardioEffort(0);
    } catch (error) {
      console.error("Failed to save workout data:", error);
    }
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const storedWorkout = await AsyncStorage.getItem("workout");
        if (storedWorkout) {
          const parsedWorkout = JSON.parse(storedWorkout);
          setTodaysWorkout(parsedWorkout);
          setWorkoutLogged(true);
        }
      } catch (error) {
        console.error("Failed to load workout data:", error);
      }
    };
    fetchWorkoutData();
  }, []);

  return (
    <ThemedView>
      {user === "Guest" ? (
        <View style={styles.card}>
          <Text style={styles.header}>Welcome to Today's Workout</Text>
          <Text>
            To log a new workout, please{" "}
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />{" "}
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.header}>Today's workout</Text>
          <Text style={styles.date}>
            {week[wday]} - {mm}/{dd}/{yyyy}
          </Text>
          {workoutLogged && todaysWorkout ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Type of Cardio
                </Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Duration (min)
                </Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Starting Heart Rate
                </Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Max Heart Rate
                </Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Calories Burned
                </Text>
                <Text style={[styles.tableCell, styles.tableHeader]}>
                  Effort
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{todaysWorkout.cardio}</Text>
                <Text style={styles.tableCell}>{todaysWorkout.duration}</Text>
                <Text style={styles.tableCell}>
                  {todaysWorkout.startHeartRate}
                </Text>
                <Text style={styles.tableCell}>
                  {todaysWorkout.maxHeartRate}
                </Text>
                <Text style={styles.tableCell}>
                  {todaysWorkout.caloriesBurned}
                </Text>
                <Text style={styles.tableCell}>{todaysWorkout.effort}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.user}>
              <TextInput
                style={styles.input}
                placeholder="Today's Cardio"
                value={cardio}
                onChangeText={setCardio}
              />
              <TextInput
                style={styles.input}
                placeholder="Duration (in minutes)"
                keyboardType="numeric"
                value={cardioDuration.toString()}
                onChangeText={(value) => setCardioDuration(parseInt(value))}
              />
              <TextInput
                style={styles.input}
                placeholder="Start Heart Rate"
                keyboardType="numeric"
                value={cardioStartHeartRate.toString()}
                onChangeText={(value) =>
                  setCardioStartHeartRate(parseInt(value))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Max Heart Rate"
                keyboardType="numeric"
                value={cardioMaxHeartRate.toString()}
                onChangeText={(value) => setCardioMaxHeartRate(parseInt(value))}
              />
              <TextInput
                style={styles.input}
                placeholder="Calories Burned"
                keyboardType="numeric"
                value={cardioCaloriesBurned.toString()}
                onChangeText={(value) =>
                  setCardioCaloriesBurned(parseInt(value))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Effort (1-10)"
                keyboardType="numeric"
                value={cardioEffort.toString()}
                onChangeText={(value) => setCardioEffort(parseInt(value))}
              />
              <Button title="Log Workout" onPress={handleSubmit} />
            </View>
          )}
          <Button
            title="Add More Cardio"
            onPress={() => navigation.navigate("AddWorkout")}
          />
        </View>
      )}
    </ThemedView>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  user: {
    marginBottom: 20,
  },
});
