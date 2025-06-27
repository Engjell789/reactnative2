import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  CreatePuntor: undefined;
  UpdatePuntor: { id: string };
  Puntoret: undefined;
};

type PuntoretScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Puntoret'
>;

type Puntori = {
  id: string;
  name: string;
  sname: string;
  role: string;
};

const Puntoret = () => {
  const [puntoret, setPuntoret] = useState<Puntori[]>([]);
  const navigation = useNavigation<PuntoretScreenNavigationProp>();

  useEffect(() => {
    const fetchAllPuntoret = async () => {
      try {
        const res = await axios.get('http://10.0.2.2:3008/puntoret');
        setPuntoret(res.data);
      } catch (err) {
        console.log(err);
        Alert.alert('Gabim', 'Nuk u morën të dhënat e puntorëve');
      }
    };
    fetchAllPuntoret();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://10.0.2.2:3008/puntoret/${id}`);
      setPuntoret((prev) => prev.filter((puntori) => puntori.id !== id));
      Alert.alert('Sukses', 'Puntori u fshi me sukses');
    } catch (err) {
      console.log(err);
      Alert.alert('Gabim', 'Nuk mund të fshihet puntori');
    }
  };

  const renderItem = ({ item }: { item: Puntori }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name} {item.sname}</Text>
        <Text style={styles.role}>Roli: {item.role}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() =>
            Alert.alert(
              'Konfirmo fshirjen',
              `A dëshiron të fshish ${item.name} ${item.sname}?`,
              [
                { text: 'Anulo', style: 'cancel' },
                { text: 'Fshij', style: 'destructive', onPress: () => handleDelete(item.id) },
              ]
            )
          }
        >
          <Text style={styles.buttonText}>Fshij</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={() => navigation.navigate('UpdatePuntor', { id: item.id })}
        >
          <Text style={styles.buttonText}>Ndrysho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Punetoret e hotelit</Text>

      <FlatList
        data={puntoret}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreatePuntor')}
      >
        <Text style={styles.addButtonText}>+ Shto puntorin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Puntoret;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  updateButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
