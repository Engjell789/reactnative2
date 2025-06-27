import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Logout: undefined;
  Dashboard: undefined;
  Dhomat: undefined;
  Rezervimet: undefined;
  Orari: undefined;
  Puntoret: undefined;
  CreatePuntoret: undefined;
  UpdatePuntoret: undefined;
  Menu: undefined;
  AddFood: undefined;
  EditFood: undefined;
  AddOrari: undefined;
  Users: undefined;
  UserDashboard: undefined;
  UserDhomat: undefined;
  UserCaed: undefined;
  UserContent: undefined;
  UserContentHeader: undefined;
  UserRezervo: undefined;
  UserMenu: undefined;
  UserOrari: undefined;
  UserProfileHeader: undefined;
  UserPuntoret: undefined;
  UserSidebar: undefined;
};

type AddOrariNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddOrari'>;

const AddOrari = () => {
  const [input, setInput] = useState({
    name: '',
    role: '',
    h: '',
    m: '',
    me: '',
    e: '',
    p: '',
  });

  const navigation = useNavigation<AddOrariNavigationProp>();

  const handleChange = (name: string, value: string) => {
  setInput((prev) => ({ ...prev, [name]: value }));
};


  const handleClick = async () => {
    try {
      await axios.post('http://10.0.2.2:3008/orari', input);
      Alert.alert("Sukses", "Orari u shtua me sukses!");
      navigation.navigate("Orari"); 
    } catch (err) {
      console.log(err);
      Alert.alert("Gabim", "Ndodhi një gabim gjatë shtimit!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shto Orarin e Puntorit</Text>

      <TextInput
        style={styles.input}
        placeholder="Emri i puntorit"
        onChangeText={(text) => handleChange('name', text)}
        value={input.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Roli i puntorit"
        onChangeText={(text) => handleChange('role', text)}
        value={input.role}
      />

      <Text style={styles.subtitle}>Orari Javor</Text>

      <TextInput
        style={styles.input}
        placeholder="Hënë"
        onChangeText={(text) => handleChange('h', text)}
        value={input.h}
      />
      <TextInput
        style={styles.input}
        placeholder="Martë"
        onChangeText={(text) => handleChange('m', text)}
        value={input.m}
      />
      <TextInput
        style={styles.input}
        placeholder="Merkurë"
        onChangeText={(text) => handleChange('me', text)}
        value={input.me}
      />
      <TextInput
        style={styles.input}
        placeholder="Enjte"
        onChangeText={(text) => handleChange('e', text)}
        value={input.e}
      />
      <TextInput
        style={styles.input}
        placeholder="Premte"
        onChangeText={(text) => handleChange('p', text)}
        value={input.p}
      />

      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Shto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefefe',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddOrari;
