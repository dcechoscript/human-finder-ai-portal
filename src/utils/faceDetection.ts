
import * as faceapi from 'face-api.js';

// Track whether models are loaded
let modelsLoaded = false;

// Initialize and load models
export const loadFaceDetectionModels = async () => {
  if (modelsLoaded) return;
  
  try {
    // Load models from public folder
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    ]);
    
    modelsLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.error('Error loading face detection models:', error);
    throw new Error('Failed to load face detection models');
  }
};

// Detect if an image contains a human face
export const detectHumanFace = async (imageElement: HTMLImageElement): Promise<boolean> => {
  try {
    await loadFaceDetectionModels();
    
    // Detect faces in the image
    const detections = await faceapi.detectAllFaces(imageElement)
      .withFaceLandmarks()
      .withFaceDescriptors();
    
    // If any face is detected, return true
    return detections.length > 0;
  } catch (error) {
    console.error('Error detecting faces:', error);
    return false;
  }
};

// Calculate similarity between two face descriptors (0-1 range, higher means more similar)
const calculateSimilarity = (descriptor1: Float32Array, descriptor2: Float32Array): number => {
  return 1 - faceapi.euclideanDistance(descriptor1, descriptor2);
};

// Compare two images and return similarity score
export const compareFaces = async (
  sourceImage: HTMLImageElement, 
  targetImage: HTMLImageElement,
  similarityThreshold = 0.6
): Promise<{matches: boolean; similarity: number}> => {
  try {
    await loadFaceDetectionModels();
    
    // Get face descriptions for both images
    const sourceDetections = await faceapi.detectAllFaces(sourceImage)
      .withFaceLandmarks()
      .withFaceDescriptors();
      
    const targetDetections = await faceapi.detectAllFaces(targetImage)
      .withFaceLandmarks()
      .withFaceDescriptors();
    
    // No faces detected
    if (sourceDetections.length === 0 || targetDetections.length === 0) {
      return { matches: false, similarity: 0 };
    }
    
    // Get the first face from each image
    const sourceDescriptor = sourceDetections[0].descriptor;
    const targetDescriptor = targetDetections[0].descriptor;
    
    // Calculate similarity
    const similarity = calculateSimilarity(sourceDescriptor, targetDescriptor);
    
    return {
      matches: similarity > similarityThreshold,
      similarity
    };
  } catch (error) {
    console.error('Error comparing faces:', error);
    return { matches: false, similarity: 0 };
  }
};

// Function to preload an image from a URL or data URL
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = src;
  });
};
