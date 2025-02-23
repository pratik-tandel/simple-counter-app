/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [count, setCount] = useState(0);
  const [clickSound, setClickSound] = useState<any>(null);

  const playSound = (sound: any) => {
    if (sound) {
      sound.play();
    }
  };

  useEffect(() => {
    const soundEffect = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
      } else {
        setClickSound(soundEffect);
      }
    });

    return () => {
      soundEffect.release();
    };
  }, []);

  const increment = () => {
    playSound(clickSound);
    Vibration.vibrate(50);
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      playSound(clickSound);
      Vibration.vibrate(50);
      setCount(count - 1);
    }
  };

  const resetConfirmation = () => {
    Vibration.vibrate(50);
    playSound(clickSound);
    if (count > 0) {
      Alert.alert(
        'Reset Counter',
        'Are you sure you want to reset the counter to 0?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Reset', onPress: () => setCount(0) },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{count}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonStyle} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetConfirmation}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 100,
    color: 'white',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 60,
  },
  buttonStyle: {
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'crimson',
    color: 'white',
  },
  buttonText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  resetButtonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
