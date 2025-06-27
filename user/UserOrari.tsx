import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';

type Orari = {
  id: number | string;
  _id?: number | string;  // nëse API jep _id në vend të id
  name: string;
  role: string;
  h: string;
  m: string;
  me: string;
  e: string;
  p: string;
};

const UOrari = () => {
  const [puntoretOrari, setPuntoretOrari] = useState<Orari[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editValues, setEditValues] = useState<Omit<Orari, 'id' | '_id'>>({
    name: '',
    role: '',
    h: '',
    m: '',
    me: '',
    e: '',
    p: '',
  });

  useEffect(() => {
    fetchAllPuntoretOrari();
  }, []);

  const fetchAllPuntoretOrari = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:3008/orari');
      console.log('Data nga API:', res.data);
      setPuntoretOrari(res.data);
    } catch (err) {
      Alert.alert('Gabim', 'Nuk mund të ngarkohet orari');
      console.error(err);
    }
  };

  const handleDelete = (id: number | string) => {
    Alert.alert(
      'Konfirmo fshirjen',
      'A jeni i sigurt që doni ta fshini këtë orar?',
      [
        { text: 'Anulo', style: 'cancel' },
        {
          text: 'Fshi',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:3008/orari/${id}`);
              setPuntoretOrari((prev) => prev.filter((orari) => (orari.id ?? orari._id) !== id));
            } catch (err) {
              Alert.alert('Gabim', 'Fshirja nuk u realizua');
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (orari: Orari) => {
    const currentId = orari.id ?? orari._id;
    setEditingId(currentId);
    setEditValues({
      name: orari.name || '',
      role: orari.role || '',
      h: orari.h || '',
      m: orari.m || '',
      me: orari.me || '',
      e: orari.e || '',
      p: orari.p || '',
    });
  };

  const handleSave = async () => {
    if (editingId === null) {
      Alert.alert('Gabim', 'ID e punëtorit nuk është e saktë.');
      return;
    }

    try {
      await axios.put(`http://10.0.2.2:3008/orari/${editingId}`, editValues);

      setPuntoretOrari((prev) =>
        prev.map((item) =>
          (item.id === editingId || item._id === editingId) ? { ...item, ...editValues } : item
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
    } catch (err) {
      Alert.alert('Gabim', 'Ruajtja nuk u realizua');
      console.error(err);
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

  const renderItem = ({ item }: { item: Orari }) => (
    <View style={styles.card}>
      {editingId === (item.id ?? item._id) ? (
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Emri"
            value={editValues.name}
            onChangeText={(text) => setEditValues({ ...editValues, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Roli"
            value={editValues.role}
            onChangeText={(text) => setEditValues({ ...editValues, role: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Hënë"
            value={editValues.h}
            onChangeText={(text) => setEditValues({ ...editValues, h: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Martë"
            value={editValues.m}
            onChangeText={(text) => setEditValues({ ...editValues, m: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mërkurë"
            value={editValues.me}
            onChangeText={(text) => setEditValues({ ...editValues, me: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enjte"
            value={editValues.e}
            onChangeText={(text) => setEditValues({ ...editValues, e: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Premte"
            value={editValues.p}
            onChangeText={(text) => setEditValues({ ...editValues, p: text })}
          />
          <View style={styles.buttonRow}>
            <Button title="Ruaj" onPress={handleSave} />
            <Button title="Anulo" color="gray" onPress={handleCancel} />
          </View>
        </ScrollView>
      ) : (
        <>
          <Text style={styles.title}>{item.name}</Text>
          <Text>Roli: {item.role}</Text>
          <Text>Hënë: {item.h}</Text>
          <Text>Martë: {item.m}</Text>
          <Text>Mërkurë: {item.me}</Text>
          <Text>Enjte: {item.e}</Text>
          <Text>Premte: {item.p}</Text>
          <View style={styles.buttonRow}>
            <Button title="Edito" onPress={() => handleEdit(item)} />
            <Button title="Fshi" color="red" onPress={() => handleDelete(item.id ?? item._id)} />
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orari i Punëtorëve</Text>
      <FlatList
        data={puntoretOrari}
        keyExtractor={(item) => (item.id ?? item._id).toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert('Shto punëtor (implemento navigimin)')}
      >
        <Text style={styles.addButtonText}>+ Shto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#007bff' },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UOrari;
