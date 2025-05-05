
// This is a helper script to download OpenCV models and cascade files
// Required files should be placed in the public/opencv directory

// Function to download a file
const downloadFile = (url, outputPath) => {
  const https = require('https');
  const fs = require('fs');
  const path = require('path');
  
  return new Promise((resolve, reject) => {
    // Create directories if they don't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(outputPath);
    
    console.log(`Downloading ${url} to ${outputPath}...`);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        console.log(`Redirecting to ${response.headers.location}`);
        return downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${outputPath}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file on error
      reject(err.message);
    });
  });
};

// Main function to download all required OpenCV files
const downloadOpenCVFiles = async () => {
  const files = [
    {
      url: 'https://docs.opencv.org/4.x/opencv.js',
      path: 'opencv.js'
    },
    {
      url: 'https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_frontalface_default.xml',
      path: 'haarcascade_frontalface_default.xml'
    },
    {
      url: 'https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_eye.xml',
      path: 'haarcascade_eye.xml'
    }
  ];

  console.log('==========================================');
  console.log('Starting download of OpenCV files...');
  console.log('==========================================');
  
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
      
      // Skip if file already exists and is not empty
      if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        console.log(`File already exists and appears valid: ${outputPath}`);
        continue;
      }
      
      await downloadFile(file.url, outputPath);
    }
    
    console.log('==========================================');
    console.log('All OpenCV files downloaded successfully!');
    console.log('==========================================');
    console.log('You can now use the AI face matching feature.');
  } catch (error) {
    console.error('Error downloading OpenCV files:', error);
    console.log('');
    console.log('Please try downloading the files manually:');
    console.log('1. Create a folder public/opencv/ if it doesn\'t exist');
    console.log('2. Download these files and place them in that folder:');
    console.log('   - opencv.js: https://docs.opencv.org/4.x/opencv.js');
    console.log('   - haarcascade_frontalface_default.xml: https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_frontalface_default.xml');
    console.log('   - haarcascade_eye.xml: https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_eye.xml');
  }
};

// Run the download
downloadOpenCVFiles();
