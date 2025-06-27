import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await AsyncStorage.removeItem('token');
        Alert.alert('Logged out successfully');
        navigation.navigate('Login' as never);
      } catch (error) {
        Alert.alert('Error during logout');
      }
    };

    performLogout();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Logout;
