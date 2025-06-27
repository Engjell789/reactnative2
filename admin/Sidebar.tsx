import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Defino të gjitha screenat që përdor në navigator
type RootStackParamList = {
  Dashboard: undefined;
  Dhomat: undefined;
  Rezervimet: undefined;
  Menu: undefined;
  Puntoret: undefined;
  CreatePuntor: undefined;
  UpdatePuntor: { id: string };  // Kjo ka params
  Orari: undefined;
  Help: undefined;
  Logout: undefined;
  Users: undefined;
};

type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Përzgjedhim vetëm screens pa params për menu
type MenuScreens = Exclude<
  keyof RootStackParamList,
  'UpdatePuntor' // e heqim se ka param
>;

const Sidebar = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  // menuItems me screenat pa params
  const menuItems: { label: string; icon: string; screen: MenuScreens }[] = [
    { label: 'Dashboard', icon: 'home', screen: 'Dashboard' },
    { label: 'Dhomat', icon: 'bed-king', screen: 'Dhomat' },
    { label: 'Rezervimet', icon: 'calendar-check', screen: 'Rezervimet' },
    { label: 'Menu', icon: 'account-group', screen: 'Menu' },
    { label: 'Puntoret', icon: 'account-tie', screen: 'Puntoret' },
    { label: 'Orari', icon: 'clock-outline', screen: 'Orari' },
    { label: 'Help', icon: 'help-circle-outline', screen: 'Help' },
    { label: 'Logout', icon: 'logout', screen: 'Logout' },
    { label: 'Users', icon: 'account-multiple', screen: 'Users' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="hotel" size={36} color="#4A90E2" />
        <Text style={styles.logoText}>Hotel</Text>
      </View>

      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)} // Nuk ka nevojë për cast
        >
          <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4A90E2',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
});
