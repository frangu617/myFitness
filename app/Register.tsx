import { Text, View, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function Register() {
    return (
        <ThemedView style={styles.container}>
            <Text style = {styles.text}>Register</Text>
            <Image source={require('../assets/images/fitnessLogo.png')} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    
    text: {
        fontSize: 60,
        color: 'white',
    }
})