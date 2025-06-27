import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Bi = BoxIcons

const courses = [
  {
    title: 'Cilesi',
    icon: 'building',
  },
  {
    title: 'Siguri',
    icon: 'cctv',
  },
  {
    title: 'Rehati',
    icon: 'bed',
  },
];

const UserCard = () => {
  return (
    <View style={styles.container}>
      {courses.map((item, index) => (
        <View key={index} style={styles.card}>
          <Icon name={item.icon} size={40} color="#4A90E2" />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    margin: 10,
    width: 100,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
