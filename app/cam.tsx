import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const API_URL = 'http://10.101.218.117:8000/predict'; 

// --- Updated Theme Colors ---
const COLORS = {
  primary: '#388E3C', // Main theme green
  accent: '#66BB6A', // Lighter green for highlights
  white: '#FFFFFF',
  black: '#000000',
  red: '#D32F2F', // Modern red for cancel
  overlay: 'rgba(0, 0, 0, 0.6)',
  textPrimary: '#FFFFFF',
};

export default function CamScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const showErrorAlert = useCallback((title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current || isUploading) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8, base64: false });
      setPreviewUri(photo.uri);
    } catch (error) {
      showErrorAlert('Camera Error', 'Failed to capture photo. Please try again.');
      console.error('Camera capture error:', error);
    }
  }, [isUploading, showErrorAlert]);

  const pickFromGallery = useCallback(async () => {
    if (isUploading) return;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        showErrorAlert('Permission Denied', 'Media library access is required to select images.');
        return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setPreviewUri(result.assets[0].uri);
      }
    } catch (error) {
      showErrorAlert('Gallery Error', 'Failed to select image. Please try again.');
      console.error('Gallery pick error:', error);
    }
  }, [isUploading, showErrorAlert]);

  const uploadToBackend = async (imageUri: string): Promise<{ predicted_class: string; confidence: number }> => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: imageUri.split('/').pop() || 'image.jpg',
    } as any);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Prediction failed');
    }

    return await response.json();
  };

  const analyzeImage = useCallback(async () => {
    if (!previewUri) {
      showErrorAlert('No Image Selected', 'Please capture or select an image first.');
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadToBackend(previewUri);

      router.push({
        pathname: '/result',
        params: {
          disease: result.predicted_class || 'Unknown',
          confidence: (result.confidence || 0).toFixed(2),
        },
      });
    } catch (error: any) {
      showErrorAlert('Analysis Error', error.message || 'Failed to analyze image. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [previewUri, router, showErrorAlert]);

  const flipCamera = useCallback(() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }, []);

  const cancelPreview = useCallback(() => {
    setPreviewUri(null);
  }, []);

  if (permission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.infoText}>Initializing camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>
          We need access to your camera to capture plant disease images.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {previewUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: previewUri }} style={styles.previewImage} resizeMode="contain" />
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={cancelPreview} disabled={isUploading}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.uploadButton]} onPress={analyzeImage} disabled={isUploading}>
              {isUploading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.buttonText}>Analyze</Text>}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          <View style={styles.overlay}>
              <View style={styles.header}>
                  <Text style={styles.headerText}>Plant Disease Scanner</Text>
              </View>
              <View style={styles.footer}>
                  <TouchableOpacity style={styles.iconButton} onPress={pickFromGallery}>
                      <Text style={styles.iconText}>🖼️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                      <View style={styles.captureInner} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={flipCamera}>
                      <Text style={styles.iconText}>🔄</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </>
      )}
    </View>
  );
}

// --- Updated Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    padding: 20,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: (Platform.OS === 'ios' ? 50 : 20) + 10,
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.overlay,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
  },
  iconText: {
    fontSize: 30,
    color: COLORS.textPrimary,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  actionButtons: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  permissionText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  infoText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
});
