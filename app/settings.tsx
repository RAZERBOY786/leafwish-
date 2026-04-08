import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- Theme Colors ---
const COLORS = {
  primary: '#388E3C',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  background: '#FBF8F5',
  card: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#6D4C41',
  border: '#E0E0E0',
};

const SIZES = {
  base: 16,
  radius: 16,
  padding: 24,
  h1: 24,
};

export default function Settings() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const handleProfilePress = () => router.push('/profile');
  const handleChangePasswordPress = () => alert('Change Password - coming soon');

  const showModal = (type) => {
    if (type === 'privacy') {
      setModalContent({
        title: 'Privacy Policy',
        text: `Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app. We may collect information such as your name, email, device information, and usage data to provide a better user experience. Your data will be used solely for improving the functionality of our app and will never be shared with third parties without your explicit consent. We use industry-standard security measures to safeguard your information. By using this app, you agree to the terms outlined in this Privacy Policy and consent to the collection and use of information as described. You can request deletion of your data at any time by contacting our support team.`
      });
    } else if (type === 'terms') {
      setModalContent({
        title: 'Terms of Service',
        text: `By using this app, you agree to comply with all applicable laws and regulations, and you accept the responsibilities outlined in these Terms of Service. You must not use the app for any illegal or unauthorized purpose. All content provided through the app is for personal use only and should not be reproduced or distributed without permission. We reserve the right to modify, suspend, or discontinue any part of the app at our discretion. Users are responsible for maintaining the confidentiality of their account credentials. We are not liable for any damages or losses resulting from the use of the app. Continued use of the app constitutes acceptance of these terms. These Terms of Service may be updated periodically, and users will be notified of significant changes.`
      });
    }
    setModalVisible(true);
  };

  const handleSignOutPress = () => {
    alert('Sign Out - coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.item} onPress={handleProfilePress}>
            <Text style={styles.itemText}>Profile</Text>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.item} onPress={() => showModal('privacy')}>
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => showModal('terms')}>
            <Text style={styles.itemText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <View style={styles.item}>
            <Text style={styles.itemText}>App Version</Text>
            <Text style={styles.itemSubText}>1.0.0</Text>
          </View>
        </View>

      </View>

      {/* Modal for Policies */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
              <Ionicons name="close" size={28} color={COLORS.primaryDark} />
            </TouchableOpacity>
            <Text style={styles.title}>{modalContent.title}</Text>
          </View>
          <ScrollView style={{ padding: SIZES.padding }}>
            <Text style={{ fontSize: 16, color: COLORS.textPrimary, lineHeight: 24 }}>
              {modalContent.text}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SIZES.padding / 2, paddingVertical: SIZES.base / 2, backgroundColor: COLORS.background },
  backButton: { padding: SIZES.base / 2 },
  title: { flex: 1, fontSize: SIZES.h1, fontWeight: 'bold', color: COLORS.primaryDark, textAlign: 'center', marginRight: 30 },
  content: { flex: 1, paddingHorizontal: SIZES.padding, paddingTop: SIZES.padding },
  section: { marginBottom: SIZES.padding + 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textSecondary, marginBottom: SIZES.base, textTransform: 'uppercase', letterSpacing: 0.5 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.card, padding: SIZES.base, borderRadius: SIZES.radius, marginBottom: SIZES.base, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  itemText: { fontSize: 18, fontWeight: '600', color: COLORS.textPrimary },
  itemSubText: { fontSize: 18, fontWeight: '500', color: COLORS.textSecondary },
  signOutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SIZES.padding, padding: SIZES.base, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.primary, backgroundColor: 'transparent' },
  signOutButtonText: { fontSize: 18, fontWeight: '600', color: COLORS.primary, marginRight: 10 },
});