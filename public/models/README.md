
# Face Detection Models

To use the face detection feature, you need to download the face-api.js models and place them in this directory.

## Required Model Files:

1. `ssd_mobilenetv1_model-weights_manifest.json`
2. `ssd_mobilenetv1_model-shard1`
3. `face_landmark_68_model-weights_manifest.json`
4. `face_landmark_68_model-shard1`
5. `face_recognition_model-weights_manifest.json`
6. `face_recognition_model-shard1`
7. `face_recognition_model-shard2`

## IMPORTANT: Models Must Be Downloaded Before Use

The AI face matching feature requires these model files to work properly. Run the download script in this directory:

```bash
# Navigate to the project root
cd public/models
node download-models.js
```

Alternatively, run this command from the project root:
```bash
node public/models/download-models.js
```

## How to Get the Models:

You can download these files manually from the face-api.js GitHub repository:
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

After downloading, place all files in this directory (`public/models/`).

## Automated Download Script:

Run the following command in your terminal to download the models:

```bash
# Create models directory if it doesn't exist
mkdir -p public/models

# Download model files
cd public/models
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/ssd_mobilenetv1_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_recognition_model-shard2
```

## Verification

To verify that the models are loaded correctly, open your browser's developer tools console when using the AI Face Matching feature. You should see a message saying "Face detection models loaded successfully" if everything is working properly.

## Troubleshooting

If you're seeing errors like "Failed to load face detection models", make sure:
1. All model files are placed in the `/public/models` directory
2. Your web server can access these files (check network tab in browser dev tools)
3. You don't have CORS issues if testing locally
4. Run the `download-models.js` script to automatically download the required files
