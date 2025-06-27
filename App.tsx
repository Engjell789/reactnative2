import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Admin Screens
import Dashboard from './admin/Dashboard';
import Dhomat from './admin/Dhomat';
import Rezervimet from './admin/Rezervimet';
import Orari from './admin/Orari';
import Puntoret from './admin/Puntoret';
import CreatePuntoret from './admin/CreatePuntoret';
import AddFood from './admin/AddFood';
import EditFood from './admin/EditFood';
import AddOrari from './admin/AddOrari';
import UpdatePuntoret from './admin/UpdatePuntoret';
import Menu from './admin/Menu';
import Users from './admin/Users';

// User Screens
import UCard from './user/UserCard';
import UContent from './user/UserContent';
import UContentHeader from './user/UserContentHeader'
import UDashboard from './user/UserDashboard';
import UDhomat from './user/UserDhomat';
import URezervo from './user/UserRezervo';
import UMenu from './user/UserMenu';
import UOrari from './user/UserOrari';
import UProfileHeader from './user/UserProfileHeader';
import UPuntoret from './user/UserPuntoret';
import USidebar from './user/UserSidebar';

// Auth Screens
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/logout';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Logout" component={Logout} />

        {/* Admin */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Dhomat" component={Dhomat} />
        <Stack.Screen name="Rezervimet" component={Rezervimet} />
        <Stack.Screen name="Puntoret" component={Puntoret} />
        <Stack.Screen name="CreatePuntoret" component={CreatePuntoret} />
        <Stack.Screen name="UpdatePuntoret" component={UpdatePuntoret} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Orari" component={Orari} />
        <Stack.Screen name="AddFood" component={AddFood} />
        <Stack.Screen name="EditFood" component={EditFood} />
        <Stack.Screen name="AddOrari" component={AddOrari} />
        <Stack.Screen name="Users" component={Users} />

        {/* User */}
        <Stack.Screen name="UserDashboard" component={UDashboard} />
        <Stack.Screen name="UserDhomat" component={UDhomat} />
        <Stack.Screen name="UserCard" component={UCard} />
        <Stack.Screen name="UserContent" component={UContent} />
        <Stack.Screen name="UserContentHeader" component={UContentHeader} />
        <Stack.Screen name="UserRezervo" component={URezervo} />
        <Stack.Screen name="UserMenu" component={UMenu} />
        <Stack.Screen name="UserOrari" component={UOrari} />
        <Stack.Screen name="UserProfileHeader" component={UProfileHeader} />
        <Stack.Screen name="UserPuntoret" component={UPuntoret} />
        <Stack.Screen name="UserSidebar" component={USidebar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
