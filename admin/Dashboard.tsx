import React from 'react';
import { View, StyleSheet } from 'react-native';
import Sidebar from './Sidebar';


const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Sidebar />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // layout horizontal
    flex: 1,
  },
});

export default Dashboard;
