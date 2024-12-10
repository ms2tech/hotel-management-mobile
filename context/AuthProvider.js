
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (userData, token) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await SecureStore.setItemAsync('jwtToken', token);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    await SecureStore.deleteItemAsync('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default { AuthContext, AuthProvider };
