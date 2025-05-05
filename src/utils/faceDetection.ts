
import * as faceapi from 'face-api.js';

// Track whether models are loaded
let modelsLoaded = false;
let isLoading = false;

// Initialize and load models
export const loadFaceDetectionModels = async () => {
  if (modelsLoaded) return true;
  if (isLoading) return false;
  
  try {
    isLoading = true;
    console.log('Attempting to load face detection models...');
    
    // Load models from public folder with better error handling
    try {
      // Use absolute URLs to ensure models are found correctly
      const modelUrl = window.location.origin + '/models';
      console.log('Loading models from:', modelUrl);
      
      await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUrl);
      console.log('SSD MobileNet model loaded');
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);
      console.log('Face Landmark model loaded');
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl);
      console.log('Face Recognition model loaded');
      
      modelsLoaded = true;
      isLoading = false;
      console.log('All face detection models loaded successfully');
      return true;
    } catch (modelError) {
      console.error('Specific model loading error:', modelError);
      isLoading = false;
      throw new Error(`Failed to load face detection models: ${modelError.message}`);
    }
  } catch (error) {
    console.error('Error in loadFaceDetectionModels:', error);
    isLoading = false;
    throw error;
  }
};

// Detect if an image contains a human face
export const detectHumanFace = async (imageElement: HTMLImageElement): Promise<boolean> => {
  try {
    const modelsReady = await loadFaceDetectionModels();
    if (!modelsReady) return false;
    
    // Detect faces in the image
    const detections = await faceapi.detectAllFaces(imageElement)
      .withFaceLandmarks()
      .withFaceDescriptors();
    
    console.log(`Detected ${detections.length} faces in image`);
    
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
  similarityThreshold = 0.5  // Lower threshold makes face recognition stricter
): Promise<{matches: boolean; similarity: number}> => {
  try {
    const modelsReady = await loadFaceDetectionModels();
    if (!modelsReady) return { matches: false, similarity: 0 };
    
    // Get face descriptions for both images
    const sourceDetections = await faceapi.detectAllFaces(sourceImage)
      .withFaceLandmarks()
      .withFaceDescriptors();
      
    const targetDetections = await faceapi.detectAllFaces(targetImage)
      .withFaceLandmarks()
      .withFaceDescriptors();
    
    console.log(`Source image has ${sourceDetections.length} faces`);
    console.log(`Target image has ${targetDetections.length} faces`);
    
    // No faces detected
    if (sourceDetections.length === 0 || targetDetections.length === 0) {
      console.log('No faces detected in one or both images');
      return { matches: false, similarity: 0 };
    }
    
    // Get the first face from each image
    const sourceDescriptor = sourceDetections[0].descriptor;
    const targetDescriptor = targetDetections[0].descriptor;
    
    // Calculate similarity
    const similarity = calculateSimilarity(sourceDescriptor, targetDescriptor);
    console.log(`Face similarity score: ${similarity}`);
    
    // For exact same images, ensure they always match
    if (sourceImage.src === targetImage.src) {
      return { matches: true, similarity: 1.0 };
    }
    
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
