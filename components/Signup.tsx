import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

type ValuesType = {
  name: string;
  email: string;
  password: string;
};

type ErrorsType = {
  [key in keyof ValuesType]?: string;
};

const Signup = () => {
  const [values, setValues] = useState<ValuesType>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const navigation = useNavigation();

  const validate = (values: ValuesType): ErrorsType => {
    const errors: ErrorsType = {};
    if (!values.name) errors.name = 'Emri është i detyrueshëm.';
    if (!values.email) {
      errors.email = 'Email është i detyrueshëm.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Email nuk është valid.';
    }
    if (!values.password) {
      errors.password = 'Fjalëkalimi është i detyrueshëm.';
    } else if (values.password.length < 6) {
      errors.password = 'Fjalëkalimi duhet të ketë të paktën 6 karaktere.';
    }
    return errors;
  };

  const handleInputChange = (field: keyof ValuesType, value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://10.0.2.2:3008/v1/register', values)
        .then((res) => {
          if (res.data.token) {
            Alert.alert('Sukses', 'U regjistruat me sukses!');
            navigation.navigate('Login' as never); // ndrysho 'Login' nëse emri i ekranit është tjetër
          }
        })
        .catch((err) => {
          console.error(err);
          Alert.alert('Gabim', 'Ndodhi një gabim gjatë regjistrimit.');
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Regjistrohu</Text>
      {(['name', 'email', 'password'] as const).map((field) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={styles.label}>
            {field === 'name' ? 'Emri' : field === 'email' ? 'Email' : 'Fjalëkalimi'}
          </Text>
          <TextInput
            secureTextEntry={field === 'password'}
            style={styles.input}
            value={values[field]}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholder={`Shkruaj ${field}`}
          />
          {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
        </View>
      ))}
      <Button title="Regjistrohu" onPress={handleSubmit} color="#007bff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#007bff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

export default Signup;
