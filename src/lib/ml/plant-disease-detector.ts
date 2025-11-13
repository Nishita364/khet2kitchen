import * as tf from '@tensorflow/tfjs';

export interface DiseaseDetectionResult {
  disease: string;
  confidence: number;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PlantDiseaseClass {
  name: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

// Common plant diseases with treatments
export const DISEASE_CLASSES: PlantDiseaseClass[] = [
  {
    name: 'Healthy',
    treatment: 'No treatment needed. Continue regular care.',
    severity: 'low'
  },
  {
    name: 'Bacterial Blight',
    treatment: 'Apply copper-based fungicide. Remove affected leaves.',
    severity: 'high'
  },
  {
    name: 'Brown Spot',
    treatment: 'Use fungicide spray. Improve air circulation.',
    severity: 'medium'
  },
  {
    name: 'Leaf Smut',
    treatment: 'Apply systemic fungicide. Remove infected parts.',
    severity: 'high'
  },
  {
    name: 'Powdery Mildew',
    treatment: 'Spray with neem oil or sulfur-based fungicide.',
    severity: 'medium'
  },
  {
    name: 'Rust',
    treatment: 'Apply copper fungicide. Ensure proper drainage.',
    severity: 'medium'
  },
  {
    name: 'Mosaic Virus',
    treatment: 'Remove infected plants. Control aphid vectors.',
    severity: 'high'
  },
  {
    name: 'Anthracnose',
    treatment: 'Use copper-based spray. Improve plant spacing.',
    severity: 'medium'
  }
];

export class PlantDiseaseDetector {
  private model: tf.LayersModel | null = null;
  private isLoading = false;

  async loadModel(): Promise<void> {
    if (this.model || this.isLoading) return;
    
    this.isLoading = true;
    try {
      // For demo purposes, we'll create a simple model
      // In production, you'd load a pre-trained model
      this.model = await this.createDemoModel();
      console.log('Plant disease detection model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
      throw new Error('Failed to load plant disease detection model');
    } finally {
      this.isLoading = false;
    }
  }

  private async createDemoModel(): Promise<tf.LayersModel> {
    // Create a simple demo model for demonstration
    // In production, replace this with a real pre-trained model
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [224, 224, 3],
          filters: 32,
          kernelSize: 3,
          activation: 'relu'
        }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 128, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.5 }),
        tf.layers.dense({ units: DISEASE_CLASSES.length, activation: 'softmax' })
      ]
    });

    // Compile the model
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  async detectDisease(imageFile: File): Promise<DiseaseDetectionResult> {
    if (!this.model) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      // Preprocess the image
      const tensor = await this.preprocessImage(imageFile);
      
      // Make prediction
      const predictions = this.model.predict(tensor) as tf.Tensor;
      const probabilities = await predictions.data();
      
      // Find the class with highest probability
      const maxIndex = probabilities.indexOf(Math.max(...probabilities));
      const confidence = probabilities[maxIndex];
      
      const diseaseClass = DISEASE_CLASSES[maxIndex];
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();

      return {
        disease: diseaseClass.name,
        confidence: Math.round(confidence * 100) / 100,
        treatment: diseaseClass.treatment,
        severity: diseaseClass.severity
      };
    } catch (error) {
      console.error('Disease detection failed:', error);
      throw new Error('Failed to analyze the image');
    }
  }

  private async preprocessImage(imageFile: File): Promise<tf.Tensor> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Create canvas to resize image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Resize to model input size (224x224)
          canvas.width = 224;
          canvas.height = 224;
          ctx.drawImage(img, 0, 0, 224, 224);

          // Convert to tensor
          const tensor = tf.browser.fromPixels(canvas)
            .expandDims(0) // Add batch dimension
            .div(255.0); // Normalize to [0, 1]

          resolve(tensor);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(imageFile);
    });
  }

  // Simulate disease detection for demo purposes
  async simulateDetection(imageFile: File): Promise<DiseaseDetectionResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return random disease for demo
    const randomIndex = Math.floor(Math.random() * DISEASE_CLASSES.length);
    const diseaseClass = DISEASE_CLASSES[randomIndex];
    const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
    
    return {
      disease: diseaseClass.name,
      confidence: Math.round(confidence * 100) / 100,
      treatment: diseaseClass.treatment,
      severity: diseaseClass.severity
    };
  }
}

// Singleton instance
export const plantDiseaseDetector = new PlantDiseaseDetector();