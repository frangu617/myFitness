import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function SignUp() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const heightInCentimeters = (heightFeet * 12 + heightInches) * 2.54;
    const bmi =
      weight / ((heightInCentimeters / 100) * (heightInCentimeters / 100));
    const dailyCalories = calculateDailyCalories(bmi, age, gender);

    const userData = {
      name,
      weight,
      heightFeet,
      heightInches,
      age,
      gender,
      bmi,
      dailyCalories,
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log(`User data saved: ${JSON.stringify(userData)}`);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  function calculateDailyCalories(bmi: number, age: number, gender: string) {
    if (gender === "male") {
      bmi =
        10 * weight +
        6.25 * (heightFeet * 12 + heightInches) * 2.54 -
        5 * age +
        5;
      return bmi;
    } else if (gender === "female") {
      bmi =
        10 * weight +
        6.25 * (heightFeet * 12 + heightInches) * 2.54 -
        5 * age -
        161;
      return bmi;
    } else {
      return 0;
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Non-binary" value="non-binary" />
        </Picker>
        <Text style={styles.label}>Weight (lbs):</Text>
        <TextInput
          style={styles.input}
          value={weight.toString()}
          keyboardType="numeric"
          onChangeText={(value) => setWeight(parseInt(value))}
        />
        <Text style={styles.label}>Height (feet and inches):</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={heightFeet.toString()}
            placeholder="feet"
            keyboardType="numeric"
            onChangeText={(value) => setHeightFeet(parseInt(value))}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={heightInches.toString()}
            placeholder="inches"
            keyboardType="numeric"
            onChangeText={(value) => setHeightInches(parseInt(value))}
          />
        </View>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age.toString()}
          keyboardType="numeric"
          onChangeText={(value) => setAge(parseInt(value))}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
});
