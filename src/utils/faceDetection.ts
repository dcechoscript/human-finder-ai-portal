
// OpenCV-based face detection utilities

// Track whether OpenCV is loaded
let opencvLoaded = false;
let isLoading = false;

// Function to load OpenCV.js
export const loadFaceDetectionModels = async (): Promise<boolean> => {
  if (opencvLoaded) return true;
  if (isLoading) return false;
  
  try {
    isLoading = true;
    console.log('Loading OpenCV for face detection...');
    
    // Check if cv is already defined
    if (window.cv) {
      console.log('OpenCV already loaded');
      opencvLoaded = true;
      isLoading = false;
      return true;
    }
    
    // Create script element to load OpenCV
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('src', `${window.location.origin}/opencv/opencv.js`);
      
      script.onload = () => {
        console.log('OpenCV script loaded, waiting for CV to be ready');
        
        // OpenCV.js will call this function when it's ready
        window.Module = {
          onRuntimeInitialized: () => {
            console.log('OpenCV ready');
            opencvLoaded = true;
            isLoading = false;
            resolve(true);
          }
        };
      };
      
      script.onerror = (err) => {
        console.error('Error loading OpenCV:', err);
        isLoading = false;
        reject(new Error('Failed to load OpenCV.js'));
      };
      
      // Add script to document
      document.body.appendChild(script);
    });
  } catch (error) {
    console.error('Error in loadFaceDetectionModels:', error);
    isLoading = false;
    throw error;
  }
};

// Helper function to convert an HTML image element to an OpenCV matrix
const imageToMat = async (imageElement: HTMLImageElement): Promise<any> => {
  if (!window.cv) throw new Error('OpenCV not loaded');

  // Create a canvas to draw the image
  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  
  // Draw image on canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Create OpenCV matrix from image data
  const mat = window.cv.matFromImageData(imageData);
  return mat;
};

// Detect if an image contains a human face
export const detectHumanFace = async (imageElement: HTMLImageElement): Promise<boolean> => {
  try {
    // Load OpenCV
    const loaded = await loadFaceDetectionModels();
    if (!loaded || !window.cv) return false;
    
    // Convert image to grayscale mat
    const src = await imageToMat(imageElement);
    const gray = new window.cv.Mat();
    window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);
    
    // Load Haar cascade classifier
    const classifier = new window.cv.CascadeClassifier();
    const cascadePath = `${window.location.origin}/opencv/haarcascade_frontalface_default.xml`;
    
    try {
      // Fetch the cascade XML file
      const response = await fetch(cascadePath);
      if (!response.ok) {
        throw new Error(`Failed to load cascade file: ${response.statusText}`);
      }
      
      const buffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      
      // Load the classifier
      classifier.load(uint8Array);
      
      // Detect faces
      const faces = new window.cv.RectVector();
      classifier.detectMultiScale(gray, faces);
      
      // Check if faces were detected
      const numFaces = faces.size();
      console.log(`Detected ${numFaces} faces in image`);
      
      // Cleanup
      src.delete();
      gray.delete();
      faces.delete();
      classifier.delete();
      
      return numFaces > 0;
    } catch (error) {
      console.error('Error detecting faces:', error);
      return false;
    }
  } catch (error) {
    console.error('Error in detectHumanFace:', error);
    return false;
  }
};

// Compare two face images and return a similarity score
export const compareFaces = async (
  sourceImage: HTMLImageElement, 
  targetImage: HTMLImageElement,
  similarityThreshold = 0.5
): Promise<{matches: boolean; similarity: number}> => {
  try {
    const loaded = await loadFaceDetectionModels();
    if (!loaded || !window.cv) {
      return { matches: false, similarity: 0 };
    }
    
    // For exact same images, ensure they always match
    if (sourceImage.src === targetImage.src) {
      return { matches: true, similarity: 1.0 };
    }
    
    // Convert images to OpenCV matrices
    const sourceMat = await imageToMat(sourceImage);
    const targetMat = await imageToMat(targetImage);
    
    // Convert to grayscale for better comparison
    const sourceGray = new window.cv.Mat();
    const targetGray = new window.cv.Mat();
    window.cv.cvtColor(sourceMat, sourceGray, window.cv.COLOR_RGBA2GRAY);
    window.cv.cvtColor(targetMat, targetGray, window.cv.COLOR_RGBA2GRAY);
    
    // Resize images to same dimensions for comparison
    const size = new window.cv.Size(100, 100);
    const sourceResized = new window.cv.Mat();
    const targetResized = new window.cv.Mat();
    window.cv.resize(sourceGray, sourceResized, size);
    window.cv.resize(targetGray, targetResized, size);
    
    // Calculate histogram comparison (simple method)
    const sourceHist = new window.cv.Mat();
    const targetHist = new window.cv.Mat();
    const histSize = [256];
    const ranges = [0, 256];
    const hist = new window.cv.MatVector();
    
    window.cv.calcHist([sourceResized], [0], new window.cv.Mat(), sourceHist, histSize, ranges);
    window.cv.calcHist([targetResized], [0], new window.cv.Mat(), targetHist, histSize, ranges);
    
    // Normalize histograms
    window.cv.normalize(sourceHist, sourceHist, 0, 1, window.cv.NORM_MINMAX);
    window.cv.normalize(targetHist, targetHist, 0, 1, window.cv.NORM_MINMAX);
    
    // Compare histograms
    const similarity = window.cv.compareHist(sourceHist, targetHist, window.cv.HISTCMP_CORREL);
    console.log(`Face similarity score: ${similarity}`);
    
    // Cleanup OpenCV objects
    sourceMat.delete();
    targetMat.delete();
    sourceGray.delete();
    targetGray.delete();
    sourceResized.delete();
    targetResized.delete();
    sourceHist.delete();
    targetHist.delete();
    hist.delete();
    
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

// Define cv for TypeScript
declare global {
  interface Window {
    cv: any;
    Module: {
      onRuntimeInitialized: () => void;
    };
  }
}
