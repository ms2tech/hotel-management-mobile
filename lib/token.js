import * as SecureStore from 'expo-secure-store';

async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getToken(key) {
    return await SecureStore.getItemAsync(key);
}

async function deleteToken(key) {
    await SecureStore.deleteItemAsync(key);
}


