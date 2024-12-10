import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import SearchInput from './SearchInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserVerifiedCommunities, getAllCurrentUserCommunities, signOut } from '../lib/appwrite';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const screenHeight = Dimensions.get("window").height;
const screenWidth =  Dimensions.get("window").width;

export default function CustomDrawerContent(props) {
  const { top, bottom } = useSafeAreaInsets();
  const { user, communities, setCommunities, setUser, setIsLogged } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/login");
  };

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const verifiedCommunities =  await getAllCurrentUserCommunities()     // await getUserVerifiedCommunities();
        setCommunities(verifiedCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, [setCommunities]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Image
          source={{ uri: user?.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontWeight: '500', fontSize: 18, paddingTop: 10 }}>
          {user?.name}
        </Text>
      </View>
      
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 0.02 * screenHeight }}>
        <Text style={{
          fontFamily: 'PlusJakartaSans-SemiBold',
          fontWeight: '600',
          fontSize: 18,
          lineHeight: 22.8,
          color: '#172331',
          textAlign: 'center',
          paddingTop: '5%',
        }}>
          Switch communities
        </Text>
        <SearchInput placeholder={'Search for anything'} />
      </View>

      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: bottom,
          // alignItems: 'flex-end', // Align items to the right
        }}
      >
        <DrawerItemList {...props} />
        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            communities.map((community) => (
              <DrawerItem
                key={community.$id}
                label={community?.name}
                onPress={() => router.push(`/community/${community.$id}`)}
                icon={({ color, size }) => <Feather name="users" size={size} color={color} />}
                style={{ }} // Align individual items to the right
              />
            ))
          )}
          <DrawerItem
            label="Logout"
            style={{ marginTop: 3, textAlign: 'right' }} // Right-aligned logout
            onPress={logout}
            icon={({ color, size }) => <AntDesign name="logout" size={size} color={color} />}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
