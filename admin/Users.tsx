import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Button, StyleSheet, FlatList, 
  Alert, ActivityIndicator, TouchableOpacity 
} from 'react-native';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://10.0.2.2:3008/v2/login');
      setUsers(res.data);
    } catch (error) {
      setMessage('Error fetching users.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (key: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.role || (!isEdit && !formData.password)) {
      Alert.alert('Gabim', 'Plotëso të gjitha fushat e nevojshme.');
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`http://10.0.2.2:3008/v1/login/${formData.id}`, formData);
        setMessage('User updated successfully.');
      } else {
        await axios.post('http://10.0.2.2:3008/v1/login', formData);
        setMessage('User added successfully.');
      }
      setFormData({ id: '', name: '', email: '', password: '', role: '' });
      setIsEdit(false);
      fetchUsers();
    } catch (error) {
      setMessage('Error saving user.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ ...user, password: '' });
    setIsEdit(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Konfirmo fshirjen',
      'A jeni të sigurt që doni ta fshini këtë përdorues?',
      [
        { text: 'Anulo', style: 'cancel' },
        { 
          text: 'Fshij', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await axios.delete(`http://10.0.2.2:3008/v1/login/${id}`);
              setMessage('User deleted successfully.');
              fetchUsers();
            } catch (error) {
              setMessage('Error deleting user.');
              console.log(error);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menaxho Përdoruesit</Text>

      {!!message && <Text style={[styles.message, message.includes('Error') ? styles.error : styles.success]}>{message}</Text>}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Emri"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
        />
        {!isEdit && (
          <TextInput
            style={styles.input}
            placeholder="Fjalëkalimi"
            secureTextEntry
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Roli (admin / user)"
          value={formData.role}
          onChangeText={text => handleChange('role', text)}
        />

        <Button
          title={isEdit ? 'Përditëso Përdoruesin' : 'Shto Përdorues'}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        style={{ marginTop: 20, width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.userText}>{item.name}</Text>
              <Text style={styles.userText}>{item.email}</Text>
              <Text style={styles.userText}>{item.role}</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.button, styles.editBtn]} onPress={() => handleEdit(item)}>
                <Text style={styles.btnText}>Edito</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={() => handleDelete(item.id)}>
                <Text style={styles.btnText}>Fshij</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nuk ka përdorues për tu shfaqur.</Text>
        )}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  message: { marginVertical: 10, fontSize: 16 },
  error: { color: 'red' },
  success: { color: 'green' },
  form: { width: '100%', marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
    fontSize: 16,
  },
  userRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  userText: { fontSize: 16 },
  buttons: { flexDirection: 'row' },
  button: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 8,
  },
  editBtn: { backgroundColor: '#f0ad4e' },
  deleteBtn: { backgroundColor: '#d9534f' },
  btnText: { color: 'white', fontWeight: 'bold' },
});
