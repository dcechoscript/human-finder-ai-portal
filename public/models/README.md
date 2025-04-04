
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

## How to Get the Models:

You can download these files from the face-api.js GitHub repository:
https://github.com/justadudewhohacks/face-api.js/tree/master/weights

After downloading, place all files in this directory.

## Alternatively:

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
