import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

type CreatePuntoretNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreatePuntoret'>;



const CreatePuntoret = () => {
  const [input, setInput] = useState({
    name: '',
    sname: '',
    role: '',
  });

 const navigation = useNavigation<CreatePuntoretNavigationProp>();

  const handleChange = (name: string, value: string) => {
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      await axios.post('http://10.0.2.2:3008/puntoret', input); 
      Alert.alert('Sukses', 'Puntori u shtua me sukses!');
      navigation.navigate('Puntoret'); // Emri i screen-it të routes në React Navigation
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Ndodhi një gabim gjatë shtimit!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Shto puntorin e ri</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emri</Text>
            <TextInput
              style={styles.input}
              placeholder="Shkruaj emrin"
              value={input.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mbiemri</Text>
            <TextInput
              style={styles.input}
              placeholder="Shkruaj mbiemrin"
              value={input.sname}
              onChangeText={(text) => handleChange('sname', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Roli</Text>
            <TextInput
              style={styles.input}
              placeholder="Shkruaj rolin"
              value={input.role}
              onChangeText={(text) => handleChange('role', text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text style={styles.buttonText}>Shto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CreatePuntoret;
