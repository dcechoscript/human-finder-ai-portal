
# OpenCV.js Face Detection Files

To use the face detection feature, you need the following OpenCV.js files in this directory:

## Required Files:

1. `opencv.js` - The main OpenCV.js library
2. `haarcascade_frontalface_default.xml` - Haar cascade classifier for face detection
3. `haarcascade_eye.xml` - Haar cascade classifier for eye detection (optional, used for better detection)

## IMPORTANT: Files Must Be Downloaded Before Use

The AI face matching feature requires these files to work properly. Run the download script in this directory:

```bash
# Navigate to the project root
cd public/opencv
node download-models.js
```

Alternatively, run this command from the project root:
```bash
node public/opencv/download-models.js
```

## Manual Download

You can download these files manually:

1. `opencv.js`: https://docs.opencv.org/4.x/opencv.js
2. `haarcascade_frontalface_default.xml`: https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml
3. `haarcascade_eye.xml`: https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_eye.xml

After downloading, place all files in this directory (`public/opencv/`).

## Troubleshooting

If you're seeing errors like "Failed to load face detection models", make sure:
1. All required files are in the `/public/opencv` directory
2. Your web server can access these files (check network tab in browser dev tools)
3. Run the `download-models.js` script to automatically download the required files
