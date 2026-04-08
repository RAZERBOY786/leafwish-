# ML Model Integration Guide

## Overview
This React Native app now includes on-device machine learning for plant disease detection using TensorFlow.js. The ML service runs directly on the mobile device without requiring an external API.

## Features
- 🎯 **On-device inference**: No internet required for predictions
- 🚀 **Fast predictions**: Immediate results without network latency
- 🔒 **Privacy-focused**: Images stay on device
- 📱 **Cross-platform**: Works on both iOS and Android
- 🌿 **38 Disease Classes**: Detects diseases across 14 plant types

## Supported Plants & Diseases
- **Apple**: Apple Scab, Black Rot, Cedar Apple Rust, Healthy
- **Blueberry**: Healthy
- **Cherry**: Powdery Mildew, Healthy
- **Corn**: Gray Leaf Spot, Common Rust, Northern Leaf Blight, Healthy
- **Grape**: Black Rot, Esca, Leaf Blight, Healthy
- **Orange**: Citrus Greening
- **Peach**: Bacterial Spot, Healthy
- **Pepper**: Bacterial Spot, Healthy
- **Potato**: Early Blight, Late Blight, Healthy
- **Raspberry**: Healthy
- **Soybean**: Healthy
- **Squash**: Powdery Mildew
- **Strawberry**: Leaf Scorch, Healthy
- **Tomato**: 9 disease classes + Healthy

## Installation

### 1. Install Dependencies
```bash
cd m
npm install
```

This will install:
- `@tensorflow/tfjs`: Core TensorFlow.js library
- `@tensorflow/tfjs-react-native`: React Native bindings
- `expo-file-system`: For reading image files
- `expo-gl`: Required for TensorFlow.js

### 2. Using a Mock Model (Current Setup)
The app currently uses a mock model for testing. It will generate random predictions to demonstrate the UI and flow.

### 3. Integrating Your Real Model (Recommended)

#### Step 1: Convert Your Model to TensorFlow.js Format
```bash
cd ../ML
pip install -r requirements_tfjs.txt
python convert_to_tfjs.py
```

This will create a `tfjs_model` folder with:
- `model.json`: Model architecture
- `group1-shard*.bin`: Model weights

#### Step 2: Add Model to Assets
```bash
# Create assets folder if it doesn't exist
mkdir -p ../m/assets/tfjs_model

# Copy the converted model
cp -r tfjs_model/* ../m/assets/tfjs_model/
```

#### Step 3: Update MLService.ts
Open `m/services/MLService.ts` and update the `initialize()` method:

```typescript
async initialize(): Promise<void> {
  if (this.isInitialized) return;

  try {
    await tf.ready();
    console.log('TensorFlow.js initialized');

    // Load the real model
    const modelJson = require('../assets/tfjs_model/model.json');
    this.model = await tf.loadLayersModel(modelJson);
    
    console.log('Model loaded successfully');
    this.isInitialized = true;
  } catch (error) {
    console.error('Failed to initialize ML service:', error);
    throw new Error('Failed to initialize ML model');
  }
}
```

## Architecture

### File Structure
```
m/
├── services/
│   └── MLService.ts           # ML inference service
├── constants/
│   └── diseases.ts            # Disease information database
├── app/
│   ├── cam.tsx                # Camera screen with ML integration
│   └── result.tsx             # Results display screen
└── assets/
    └── tfjs_model/            # (Optional) Your converted model
        ├── model.json
        └── group1-shard*.bin
```

### MLService API

#### `initialize(): Promise<void>`
Loads and initializes the TensorFlow.js model. Call once on app startup.

#### `predict(imageUri: string): Promise<{ disease: string; confidence: number }>`
Performs inference on a single image and returns the top prediction.

**Parameters:**
- `imageUri`: File URI of the image to analyze

**Returns:**
- `disease`: Disease class name (e.g., "Tomato___Early_blight")
- `confidence`: Prediction confidence (0-1)

#### `predictTopN(imageUri: string, topN: number): Promise<Array<{disease: string; confidence: number}>>`
Returns the top N predictions for an image.

#### `dispose(): void`
Cleans up model resources. Call on component unmount.

## Usage Example

```typescript
import MLService from '../services/MLService';

// Initialize model (do once)
await MLService.initialize();

// Make prediction
const result = await MLService.predict('file:///path/to/image.jpg');
console.log(`Detected: ${result.disease} (${(result.confidence * 100).toFixed(1)}%)`);

// Get top 3 predictions
const topPredictions = await MLService.predictTopN('file:///path/to/image.jpg', 3);
topPredictions.forEach((pred, idx) => {
  console.log(`${idx + 1}. ${pred.disease}: ${(pred.confidence * 100).toFixed(1)}%`);
});

// Cleanup when done
MLService.dispose();
```

## Image Preprocessing

The service automatically:
1. Reads the image from the file system
2. Decodes JPEG format
3. Resizes to 224x224 pixels (standard input size)
4. Normalizes pixel values to [0, 1]
5. Adds batch dimension

## Performance Tips

1. **Model Size**: Keep the model under 20MB for faster loading
2. **Input Size**: 224x224 is a good balance between accuracy and speed
3. **Quantization**: Consider quantizing your model for mobile deployment
4. **Caching**: The model is loaded once and reused for all predictions

## Troubleshooting

### "Model not initialized" error
Make sure you call `MLService.initialize()` before making predictions.

### Slow predictions
- Check if model is too large (>50MB)
- Consider using a quantized model
- Ensure you're not initializing the model multiple times

### "Failed to load model" error
- Verify the model files are in the correct location
- Check that model.json and weight files are accessible
- Ensure TensorFlow.js dependencies are installed

### Low accuracy predictions
- Ensure images are clear and well-lit
- The leaf should occupy most of the frame
- Use the real trained model instead of the mock model

## Model Training

To train your own model, see the `ML/` folder:

```bash
cd ML
pip install -r requirements.txt
python train_model.py
```

Then convert and integrate as described above.

## Next Steps

1. **Add Model Versioning**: Track model versions for updates
2. **Offline Storage**: Cache predictions for offline review
3. **Batch Processing**: Analyze multiple images at once
4. **Model Updates**: Implement over-the-air model updates
5. **Performance Monitoring**: Track prediction times and accuracy

## Resources

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [TensorFlow.js React Native](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native)
- [Expo Documentation](https://docs.expo.dev/)

## License

This ML integration is part of the Plant Disease Detection app.
