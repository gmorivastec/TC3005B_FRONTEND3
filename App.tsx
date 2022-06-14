import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MandaMensajes from './classes/MandaMensajes';

export default function App() {
  return (
    <View style={styles.container}>
      <MandaMensajes></MandaMensajes>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
