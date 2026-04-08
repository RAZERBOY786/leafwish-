import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, SafeAreaView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
  primary: '#388E3C',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  background: '#FBF8F5',
  card: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#6D4C41',
  border: '#E0E0E0',
  warning: '#E53935',
  noteBackground: '#F5EFE6',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    phone: '+91 987-654-3210',
    email: 'john.doe@example.com',
    location: 'Thar, India',
  });

  // Load profile data from AsyncStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile data.');
        console.error('Load profile error:', error);
      }
    };
    loadProfile();
  }, []);

  // Save profile data to AsyncStorage
  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      Alert.alert('Success', 'Profile updated successfully.');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data.');
      console.error('Save profile error:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof typeof userProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.title}>User Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userProfile.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Enter name"
                placeholderTextColor={COLORS.textSecondary}
              />
            ) : (
              <Text style={styles.value}>{userProfile.name}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userProfile.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                placeholder="Enter phone number"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{userProfile.phone}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userProfile.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter email"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.value}>{userProfile.email}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={userProfile.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholder="Enter location"
                placeholderTextColor={COLORS.textSecondary}
              />
            ) : (
              <Text style={styles.value}>{userProfile.location}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
            onPress={isEditing ? saveProfile : () => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.note}>
          <Text style={styles.noteText}>
            {isEditing
              ? 'Enter your details and tap Save to update your profile.'
              : 'This profile displays your account details. Tap Edit to update.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: COLORS.primaryDark,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    width: '40%',
  },
  value: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 8,
    textAlign: 'right',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  saveButton: {
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  note: {
    backgroundColor: COLORS.noteBackground,
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});