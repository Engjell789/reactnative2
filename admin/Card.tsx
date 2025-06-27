import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Krijojmë array me emra ikonash nga MaterialCommunityIcons
const courses = [
  {
    title: 'Cilesi',
    iconName: 'office-building', // zëvendësim për BiBuilding
  },
  {
    title: 'Siguri',
    iconName: 'cctv', // zëvendësim për BiCctv
  },
  {
    title: 'Rehati',
    iconName: 'bed-king', // zëvendësim për BiBed
  },
];

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      {courses.map((item, index) => (
        <View style={styles.card} key={index}>
          <MaterialCommunityIcons name={item.iconName} size={40} color="#333" />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    width: 100,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Card;
