import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

type Room = {
  id: number;
  name: string;
  nr: string;
  qmimi: string;
  reservation_status: number | string; // sepse mund vjen si string nga backend
};

export default function UApp() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState('VIP');

  useEffect(() => {
    fetchRooms(selectedType);
  }, [selectedType]);

  const fetchRooms = (type: string) => {
    if (!type) {
      setRooms([]);
      setError('Zgjidhni llojin e dhomës.');
      return;
    }
    setLoading(true);
    setError(null);

    axios
      .get(`http://10.0.2.2:3008/rooms/${type}`)
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          setRooms([]);
          setError('Nuk ka dhoma për këtë lloj.');
        } else {
          setError('Gabim gjatë marrjes së dhomave.');
        }
      });
  };

  const formatDate = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  const handleReserveClick = (room: Room) => {
    if (Number(room.reservation_status) !== 0) {
      Alert.alert('Dhoma nuk është e lirë për rezervim');
      return;
    }
    setSelectedRoom(room);
    setFromDate(new Date());
    setToDate(new Date());
    setShowModal(true);
  };

 const handleReserve = async () => {
  console.log("Po nis rezervimin...", selectedRoom);
  if (!selectedRoom) {
    Alert.alert('Gabim', 'Nuk është zgjedhur dhoma.');
    return;
  }

  if (toDate < fromDate) {
    Alert.alert('Gabim', '"Data e mbarimit" duhet të jetë pas "Data e fillimit".');
    return;
  }

  const reservationData = {
    roomId: selectedRoom.id,
    from_date: formatDate(fromDate),
    to_date: formatDate(toDate),
  };
  console.log("Dërgoj këto të dhëna:", reservationData);

  try {
    const res = await axios.post('http://10.0.2.2:3008/reserve', reservationData);
    console.log("Përgjigja nga serveri:", res.data);

    Alert.alert('Sukses', 'Dhoma u rezervua me sukses!');

    // Përditëso listën e dhomave lokal
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === selectedRoom.id
          ? { ...room, reservation_status: 1 }
          : room
      )
    );

    setShowModal(false);
    fetchRooms(selectedType);
  } catch (error) {
    console.log("Gabim gjatë rezervimit:", error);
    Alert.alert('Gabim', 'Gabim gjatë rezervimit të dhomës.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selekto një dhomë</Text>

      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="-- Zgjidh llojin e dhomës --" value="" />
        <Picker.Item label="VIP" value="VIP" />
        <Picker.Item label="Standarte" value="Standarte" />
        <Picker.Item label="Familjare" value="Familjare" />
        <Picker.Item label="Eksklusive" value="Eksklusive" />
        <Picker.Item label="Suite" value="Suite" />
      </Picker>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomRow}>
            <Text style={styles.roomCell}>Numri: {item.nr}</Text>
            <Text style={styles.roomCell}>Çmimi: {item.qmimi}</Text>
            <Text style={styles.roomCell}>
              Statusi: {Number(item.reservation_status) === 0 ? 'Available' : 'Reserved'}
            </Text>
            <TouchableOpacity
              disabled={Number(item.reservation_status) !== 0}
              style={[
                styles.button,
                Number(item.reservation_status) !== 0 && styles.buttonDisabled,
              ]}
              onPress={() => handleReserveClick(item)}
            >
              <Text style={styles.buttonText}>
                {Number(item.reservation_status) === 0 ? 'Reservo' : 'Reserved'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ marginTop: 20, textAlign: 'center' }}>
              Nuk ka dhoma për këtë lloj.
            </Text>
          ) : null
        }
      />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rezervo Dhomen</Text>

            <Text>Data e fillimit:</Text>
            <DatePicker
              date={fromDate}
              onDateChange={setFromDate}
              mode="date"
              locale="en"
              maximumDate={toDate}
            />

            <Text>Data e mbarimit:</Text>
            <DatePicker
              date={toDate}
              onDateChange={setToDate}
              mode="date"
              locale="en"
              minimumDate={fromDate}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Anulo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.reserveButton]}
                onPress={handleReserve}
              >
                <Text style={styles.buttonText}>Rezervo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  picker: { height: 50, marginBottom: 20 },
  roomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  roomCell: { flex: 1, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonDisabled: { backgroundColor: '#999' },
  buttonText: { color: '#fff', textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginVertical: 10 },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { backgroundColor: '#6c757d', flex: 1, marginRight: 10 },
  reserveButton: { backgroundColor: '#007bff', flex: 1, marginLeft: 10 },
});
