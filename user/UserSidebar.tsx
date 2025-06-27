import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer'; // ndryshuar nga native-stack
import type { DrawerParamList } from '../types';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

const USidebar = () => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems: { label: string; icon: string; screen: keyof DrawerParamList }[] = [
    { label: 'Dashboard', icon: 'home', screen: 'UserDashboard' },
    { label: 'Dhomat', icon: 'bed', screen: 'UserDhomat' },
    { label: 'Rezervo', icon: 'calendar-check', screen: 'UserRezervo' },
    { label: 'Menu', icon: 'food', screen: 'UserMenu' },
    { label: 'Help', icon: 'help-circle', screen: 'UserHelp' },
    { label: 'Logout', icon: 'logout', screen: 'Logout' },
  ];

  return (
    <View style={styles.menu}>
      <View style={styles.logo}>
        <Icon name="book-open-page-variant" size={30} color="#000" />
        <Text style={styles.logoText}>Hotel</Text>
      </View>

      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={24} color="#000" style={styles.icon} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
  },
});

export default USidebar;
