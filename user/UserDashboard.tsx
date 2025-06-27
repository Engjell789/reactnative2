import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Sidebar from './UserSidebar';

type ContentProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ style, children }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.sidebar}>
        <Sidebar />
      </View>
      <View style={styles.mainContent}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 250, // ose sa të duash gjerësinë e sidebar-it
    backgroundColor: '#f0f0f0', // ose lëre pa ngjyrë nëse veç ekziston në Sidebar
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
});

export default Content;
