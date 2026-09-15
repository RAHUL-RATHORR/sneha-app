import AsyncStorage from '@react-native-async-storage/async-storage';

// In-memory fallback if AsyncStorage native module is null or unavailable
const memoryStore = new Map();

export const safeStorage = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      return memoryStore.get(key) || null;
    }
  },

  setItem: async (key, value) => {
    memoryStore.set(key, value);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Memory fallback is already updated above
    }
  },

  removeItem: async (key) => {
    memoryStore.delete(key);
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Memory fallback is already updated above
    }
  },
};

export default safeStorage;
