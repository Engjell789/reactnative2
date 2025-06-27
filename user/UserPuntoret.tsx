import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp } from '@react-navigation/drawer';

type RootStackParamList = {
  Create: undefined;
  Update: { id: number };
};

type RootDrawerParamList = {
  Home: undefined;
  Create: undefined;
  Update: { id: number };
};

interface Puntori {
  id: number;
  name: string;
  sname: string;
  role: string;
}

const UPuntoret = () => {
  const [puntoret, setPuntoret] = useState<Puntori[]>([]);

  // Përdor DrawerNavigationProp për të pasur openDrawer()
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  useEffect(() => {
    const fetchAllPuntoret = async () => {
      try {
        const res = await axios.get<Puntori[]>('http://10.0.2.2:3008/puntoret');
        setPuntoret(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPuntoret();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://10.0.2.2:3008/puntoret/${id}`);
      setPuntoret((prev) => prev.filter((puntori) => puntori.id !== id));
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Nuk mund të fshihet puntori.');
    }
  };

  const renderItem = ({ item }: { item: Puntori }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.sname}</Text>
      <Text style={styles.cell}>{item.role}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Fshi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('Update', { id: item.id })}>
          <Text style={styles.buttonText}>Përditëso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Menu" onPress={() => navigation.openDrawer()} />
      <Text style={styles.title}>Punëtorët e hotelit</Text>
      <FlatList
        data={puntoret}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nuk ka punëtorë.</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create')}>
        <Text style={styles.buttonText}>+ Shto puntor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#007bff' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, alignItems: 'center' },
  cell: { flex: 1, fontSize: 16 },
  actions: { flexDirection: 'row' },
  deleteButton: { backgroundColor: '#dc3545', padding: 8, marginRight: 8, borderRadius: 5 },
  updateButton: { backgroundColor: '#ffc107', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff' },
  addButton: { backgroundColor: '#28a745', padding: 12, marginTop: 20, borderRadius: 8, alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});

export default UPuntoret;
