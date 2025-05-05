
// This is a helper script to download OpenCV models and cascade files
// Required files should be placed in the public/opencv directory

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

// Main function to download all required OpenCV files
const downloadOpenCVFiles = async () => {
  const baseUrl = 'https://raw.githubusercontent.com/opencv/opencv/master';
  const files = [
    {
      url: 'https://docs.opencv.org/4.x/opencv.js',
      path: 'opencv.js'
    },
    {
      url: `${baseUrl}/data/haarcascades/haarcascade_frontalface_default.xml`,
      path: 'haarcascade_frontalface_default.xml'
    },
    {
      url: `${baseUrl}/data/haarcascades/haarcascade_eye.xml`,
      path: 'haarcascade_eye.xml'
    }
  ];

  console.log('Starting download of OpenCV files...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Create opencv directory if it doesn't exist
    const opencvDir = path.join(__dirname);
    if (!fs.existsSync(opencvDir)) {
      fs.mkdirSync(opencvDir, { recursive: true });
    }
    
    // Download all files
    for (const file of files) {
      const outputPath = path.join(opencvDir, file.path);
      
      // Skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`File already exists: ${outputPath}`);
        continue;
      }
      
      await downloadFile(file.url, outputPath);
    }
    
    console.log('All OpenCV files downloaded successfully!');
  } catch (error) {
    console.error('Error downloading OpenCV files:', error);
  }
};

// Run the download
downloadOpenCVFiles();
