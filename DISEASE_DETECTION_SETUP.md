# Plant Disease Detection Setup Guide

## Overview
Added AI-powered plant disease detection to Khet2Kitchen using TensorFlow.js for real-time plant health analysis.

## Features Added
- **Disease Scanner**: Upload or capture plant photos for analysis
- **AI Detection**: Identifies 8 common plant diseases
- **Treatment Recommendations**: Provides specific treatment advice
- **Detection History**: Tracks all scans with statistics
- **Multilingual Support**: Available in English, Hindi, Telugu, Tamil

## Installation

### 1. Install Dependencies
```bash
npm install @tensorflow/tfjs
```

### 2. Access the Feature
Navigate to: **Farmer Portal → Disease Detection**

## Supported Diseases
1. **Healthy** - No treatment needed
2. **Bacterial Blight** - High severity
3. **Brown Spot** - Medium severity  
4. **Leaf Smut** - High severity
5. **Powdery Mildew** - Medium severity
6. **Rust** - Medium severity
7. **Mosaic Virus** - High severity
8. **Anthracnose** - Medium severity

## How to Use

### Disease Scanner
1. Click "Upload Photo" or "Take Photo"
2. Select a clear image of the plant leaf/crop
3. Wait for AI analysis (2-3 seconds)
4. View results with confidence score and treatment

### Detection History
- View all past scans
- Track health statistics
- Monitor disease trends
- Export data for records

## Technical Implementation

### Files Added
```
src/lib/ml/plant-disease-detector.ts     # ML model and detection logic
src/components/disease-detection/        # UI components
├── disease-scanner.tsx                  # Main scanner interface
└── disease-history.tsx                  # History and statistics
src/app/farmer/disease-detection/        # Page route
└── page.tsx                            # Main page component
```

### Model Details
- **Framework**: TensorFlow.js
- **Input Size**: 224x224x3 (RGB images)
- **Architecture**: CNN with Conv2D layers
- **Output**: 8 disease classes with confidence scores
- **Performance**: ~2-3 seconds per detection

## Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Edge  
- ✅ Safari
- ⚠️ Firefox (limited camera support)

## Future Enhancements
- [ ] Load pre-trained model from cloud
- [ ] Add more disease types
- [ ] GPS location tracking
- [ ] Crop type auto-detection
- [ ] Offline mode support
- [ ] Integration with weather data
- [ ] Treatment product recommendations
- [ ] Expert consultation booking

## Demo Mode
Currently runs in demo mode with simulated results. Replace `simulateDetection()` with `detectDisease()` when you have a trained model.

## Production Deployment
1. Train a real model with plant disease dataset
2. Host model files on CDN
3. Update `loadModel()` to fetch from URL
4. Add error handling for network issues
5. Implement model versioning

## Support
For technical issues or feature requests, contact the development team.