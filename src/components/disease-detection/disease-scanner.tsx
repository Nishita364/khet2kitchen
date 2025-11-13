'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, XCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { plantDiseaseDetector, DiseaseDetectionResult } from '@/lib/ml/plant-disease-detector';

interface DiseaseScannerProps {
  onResult?: (result: DiseaseDetectionResult) => void;
}

export function DiseaseScanner({ onResult }: DiseaseScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const openCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Use rear camera on mobile
        audio: false
      });
      
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Failed to access camera. Please grant camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      
      // Convert canvas to blob and process
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          closeCamera();
          await handleImageUpload(file);
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    // Show preview
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    try {
      // Use simulation for demo - replace with real detection in production
      const detectionResult = await plantDiseaseDetector.simulateDetection(file);
      setResult(detectionResult);
      onResult?.(detectionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Plant Disease Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Instructions */}
          {!selectedImage && !isCameraOpen && (
            <Alert>
              <Camera className="h-4 w-4" />
              <AlertDescription>
                Click "Take a Pic" to open your camera and capture a photo of the plant leaf, or upload an existing photo.
              </AlertDescription>
            </Alert>
          )}

          {/* Camera View */}
          {isCameraOpen && (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-96 object-cover rounded-lg border bg-black"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <Button
                  onClick={capturePhoto}
                  size="lg"
                  className="rounded-full h-16 w-16"
                >
                  <Camera className="h-6 w-6" />
                </Button>
                <Button
                  onClick={closeCamera}
                  size="lg"
                  variant="destructive"
                  className="rounded-full h-16 w-16"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}

          {/* Upload Buttons */}
          {!isCameraOpen && !selectedImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openCamera}
                disabled={isScanning}
                className="flex-1 h-14"
                size="lg"
              >
                <Camera className="h-5 w-5 mr-2" />
                Take a Pic
              </Button>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isScanning}
                variant="outline"
                className="flex-1 h-14"
                size="lg"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Photo
              </Button>
            </div>
          )}

          {/* Hidden file input and canvas */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Image Preview */}
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-lg border"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p>Analyzing plant...</p>
                    </div>
                  </div>
                )}
              </div>
              {!isScanning && (
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                      openCamera();
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Another
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                      fileInputRef.current?.click();
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Another
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detection Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{result.disease}</h3>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Badge className={getSeverityColor(result.severity)}>
                    {getSeverityIcon(result.severity)}
                    <span className="ml-1 capitalize">{result.severity}</span>
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recommended Treatment:</h4>
                  <p className="text-sm bg-blue-50 p-3 rounded-lg">
                    {result.treatment}
                  </p>
                </div>

                {result.disease !== 'Healthy' && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {result.severity === 'high' 
                        ? 'Immediate action required to prevent spread.'
                        : 'Monitor closely and apply treatment as recommended.'
                      }
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}