
# OpenCV.js Face Detection Files

To use the face detection feature, you need the following OpenCV.js files in this directory:

## Required Files:

1. `opencv.js` - The main OpenCV.js library
2. `haarcascade_frontalface_default.xml` - Haar cascade classifier for face detection
3. `haarcascade_eye.xml` - Haar cascade classifier for eye detection (optional, used for better detection)

## IMPORTANT: Download Instructions

### Option 1: Automatic Download (Recommended)

Run this command from the project root:
```bash
node public/opencv/download-models.js
```

### Option 2: Manual Download

You can download these files manually and place them in the `public/opencv/` directory:

1. `opencv.js`: 
   - Download from: https://docs.opencv.org/4.x/opencv.js
   - Save to: `public/opencv/opencv.js`

2. `haarcascade_frontalface_default.xml`: 
   - Download from: https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_frontalface_default.xml
   - Save to: `public/opencv/haarcascade_frontalface_default.xml`

3. `haarcascade_eye.xml`: 
   - Download from: https://github.com/opencv/opencv/raw/master/data/haarcascades/haarcascade_eye.xml
   - Save to: `public/opencv/haarcascade_eye.xml`

## Troubleshooting

If you're seeing errors like "Failed to load face detection models", make sure:

1. You've downloaded all required files to the `/public/opencv` directory
2. Your web server has permissions to access these files
3. Check the browser console for specific error messages
4. Try running the download script again with `node public/opencv/download-models.js`
