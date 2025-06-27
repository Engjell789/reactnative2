import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentHeader from '../user/UserContentHeader';
import Card from '../user/UserCard';


const Content = () => {
  return (
    <View style={styles.content}>
      <ContentHeader />
      <Card />
      
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', 
  },
});

export default Content;
