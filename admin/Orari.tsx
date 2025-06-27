import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  AddFood: undefined;
  EditFood: { id: string };
  Menu: undefined;
  Orari: undefined;
  AddOrari: undefined;
};

type OrariScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Orari'
>;

type Orari = {
  id: string;
  name: string;
  role: string;
  h: string;
  m: string;
  me: string;
  e: string;
  p: string;
};


const Orari = () => {
  const [puntoretOrari, setPuntoretOrari] = useState<Orari[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    name: '',
    role: '',
    h: '',
    m: '',
    me: '',
    e: '',
    p: '',
  });

  const navigation = useNavigation<OrariScreenNavigationProp>();

  useEffect(() => {
    const fetchAllPuntoretOrari = async () => {
      try {
        const res = await axios.get('http://10.0.2.2:3008/orari');
        setPuntoretOrari(res.data);
      } catch (err) {
        console.log(err);
        Alert.alert('Error', 'Nuk u morën të dhënat e orarit');
      }
    };
    fetchAllPuntoretOrari();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://10.0.2.2:3008/orari/${id}`);
      setPuntoretOrari(puntoretOrari.filter((orari) => orari.id !== id));
      Alert.alert('Sukses', 'Orari u fshi me sukses');
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Nuk mund të fshihet orari');
    }
  };

  const handleEdit = (id: string) => {
    const orari = puntoretOrari.find((item) => item.id === id);
    if (orari) {
      setEditingId(id);
      setEditValues({
        name: orari.name,
        role: orari.role,
        h: orari.h,
        m: orari.m,
        me: orari.me,
        e: orari.e,
        p: orari.p,
      });
    }
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      await axios.put(`http://10.0.2.2:3008/orari/${editingId}`, editValues);
      setPuntoretOrari((prevData) =>
        prevData.map((item) =>
          item.id === editingId ? { ...item, ...editValues } : item
        )
      );
      setEditingId(null);
      setEditValues({
        name: '',
        role: '',
        h: '',
        m: '',
        me: '',
        e: '',
        p: '',
      });
      Alert.alert('Sukses', 'Orari u ruajt me sukses');
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Nuk u ruajt orari');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({
      name: '',
      role: '',
      h: '',
      m: '',
      me: '',
      e: '',
      p: '',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Orari i Punëtorëve</Text>

      {puntoretOrari.map((orari) => (
        <View key={orari.id} style={styles.card}>
          {editingId === orari.id ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Emri"
                value={editValues.name}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, name: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Roli"
                value={editValues.role}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, role: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Hënë"
                value={editValues.h}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, h: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Martë"
                value={editValues.m}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, m: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Mërkurë"
                value={editValues.me}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, me: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Enjte"
                value={editValues.e}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, e: text }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Premte"
                value={editValues.p}
                onChangeText={(text) =>
                  setEditValues((prev) => ({ ...prev, p: text }))
                }
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Ruaj</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Anulo</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>{orari.name}</Text>
              <Text style={styles.cardSubtitle}>Roli: {orari.role}</Text>
              <View style={styles.scheduleList}>
                <Text>Hënë: {orari.h}</Text>
                <Text>Martë: {orari.m}</Text>
                <Text>Mërkurë: {orari.me}</Text>
                <Text>Enjte: {orari.e}</Text>
                <Text>Premte: {orari.p}</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => handleEdit(orari.id)}
                >
                  <Text style={styles.buttonText}>Edito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(orari.id)}
                >
                  <Text style={styles.buttonText}>Fshij</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddOrari')}
      >
        <Text style={styles.addButtonText}>+ Shto Orar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Orari;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  scheduleList: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
