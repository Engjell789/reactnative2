import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

type Reservation = {
  id: string;
  name: string;
  nr: string | number;
  qmimi: string | number;
  reservation_status: string; // '0' = Available, '1' = Reserved
  from_date?: string;
  to_date?: string;
};

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://10.0.2.2:3008/admin/reservations');
      setReservations(res.data);
    } catch (err) {
      setError('Gabim gjatë marrjes së rezervimeve');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = (roomId: string) => {
    Alert.alert(
      'Konfirmo',
      'A je i sigurt që dëshiron të anulosh këtë rezervim?',
      [
        { text: 'Anulo', style: 'cancel' },
        {
          text: 'Anulo rezervimin',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await axios.post('http://10.0.2.2:3008/cancel', { roomId });
              Alert.alert('Sukses', res.data.message);
              fetchReservations();
            } catch (err) {
              Alert.alert('Gabim', 'Gabim gjatë anulimit të rezervimit.');
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Reservation }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Nr: {item.nr}</Text>
        <Text>Çmimi: {item.qmimi}</Text>
        <Text>Statusi: {item.reservation_status === '0' ? 'Available' : 'Reserved'}</Text>
        <Text>From: {item.from_date || 'N/A'}</Text>
        <Text>To: {item.to_date || 'N/A'}</Text>
      </View>
      {item.reservation_status === '1' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancel(item.id)}
        >
          <Text style={styles.cancelButtonText}>Anulo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchReservations}>
          <Text style={styles.retryButtonText}>Riprovo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menaxhmenti i rezervimeve</Text>
      {reservations.length > 0 ? (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.infoText}>Nuk u gjet asnjë rezervim.</Text>
        </View>
      )}
    </View>
  );
};

export default AdminReservations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
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
    marginBottom: 4,
    color: '#333',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 16,
    color: '#6c757d',
  },
});
