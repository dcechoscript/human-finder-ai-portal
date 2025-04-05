
// This is a helper script to download face-api.js models
// These models should be downloaded and placed in the public/models directory

// Function to download a file
const downloadFile = (url, outputPath) => {
  const https = require('https');
  const fs = require('fs');
  
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${outputPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(err.message);
    });
  });
};

// Main function to download all models
const downloadModels = async () => {
  const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
  const models = [
    'ssd_mobilenetv1_model-weights_manifest.json',
    'ssd_mobilenetv1_model-shard1',
    'face_landmark_68_model-weights_manifest.json',
    'face_landmark_68_model-shard1',
    'face_recognition_model-weights_manifest.json',
    'face_recognition_model-shard1',
    'face_recognition_model-shard2'
  ];

  console.log('Starting download of face-api.js models...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Create models directory if it doesn't exist
    const modelsDir = path.join(__dirname);
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }
    
    // Download all models
    for (const model of models) {
      const outputPath = path.join(modelsDir, model);
      
      // Skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`File already exists: ${outputPath}`);
        continue;
      }
      
      await downloadFile(`${baseUrl}/${model}`, outputPath);
    }
    
    console.log('All models downloaded successfully!');
  } catch (error) {
    console.error('Error downloading models:', error);
  }
};

// Run the download
downloadModels();

/*
Alternatively, you can download these files manually from:
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

Required models:
- ssd_mobilenetv1_model-weights_manifest.json
- ssd_mobilenetv1_model-shard1
- face_landmark_68_model-weights_manifest.json
- face_landmark_68_model-shard1
- face_recognition_model-weights_manifest.json
- face_recognition_model-shard1
- face_recognition_model-shard2

Place all these files in the public/models directory
*/
