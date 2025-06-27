import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Puntoret: undefined;
  UpdatePuntoret: { id: string };
  //... tjerat nëse i ke
};

type UpdatePuntoretNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpdatePuntoret'>;
type UpdatePuntoretRouteProp = RouteProp<RootStackParamList, 'UpdatePuntoret'>;

const UpdatePuntoret = () => {
  const [input, setInput] = useState({ name: '', sname: '', role: '' });

  const navigation = useNavigation<UpdatePuntoretNavigationProp>();
  const route = useRoute<UpdatePuntoretRouteProp>();
  const puntoriId = route.params.id;

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3008/puntoret/${puntoriId}`)
      .then(res => {
        setInput({
          name: res.data.name,
          sname: res.data.sname,
          role: res.data.role,
        });
      })
      .catch(err => console.log(err));
  }, [puntoriId]);

  const handleChange = (key: string, value: string) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const handleClick = async () => {
    try {
      await axios.put(`http://10.0.2.2:3008/puntoret/${puntoriId}`, input);
      Alert.alert('Sukses', 'Puntori u përditësua me sukses');
      navigation.navigate('Puntoret');
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Ndodhi një gabim gjatë përditësimit');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Informacionet e Puntorit</Text>

      <Text style={styles.label}>Emri</Text>
      <TextInput
        style={styles.input}
        placeholder="Shkruaj emrin"
        value={input.name}
        onChangeText={text => handleChange('name', text)}
      />

      <Text style={styles.label}>Mbiemri</Text>
      <TextInput
        style={styles.input}
        placeholder="Shkruaj mbiemrin"
        value={input.sname}
        onChangeText={text => handleChange('sname', text)}
      />

      <Text style={styles.label}>Roli</Text>
      <TextInput
        style={styles.input}
        placeholder="Shkruaj rolin"
        value={input.role}
        onChangeText={text => handleChange('role', text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleClick} color="#4CAF50" />
      </View>
    </View>
  );
};

export default UpdatePuntoret;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
