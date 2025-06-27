import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigation = useNavigation();

  const handleInputChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const validate = ({ email, password }: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://10.0.2.2:3008/v1/signin', values); // zëvendëso IP
        const { token, role } = res.data;

        if (token) {
          await AsyncStorage.setItem('token', token);
          if (role === 'admin') {
            navigation.navigate('Dashboard' as never); // emri i routes
          } else {
            navigation.navigate('UserDashboard' as never);
          }
        } else {
          Alert.alert('Authentication failed');
        }
      } catch (error) {
        Alert.alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={values.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={values.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Button title="Sign In" onPress={handleSubmit} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#007bff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6
  },
  error: {
    color: 'red',
    marginBottom: 8
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 16
  }
});

export default Login;
