import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // apo react-native-vector-icons

const ContentHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.headerActivity}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search anything here..."
            style={styles.input}
          />
          <MaterialIcons name="search" size={20} color="#333" />
        </View>

        <TouchableOpacity style={styles.notify}>
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActivity: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  notify: {
    padding: 8,
  },
});

export default ContentHeader;
