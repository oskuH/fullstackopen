#!/bin/bash

# this script is for Render

echo "Build script"

cd ../frontend/

npm install

npm run build:deploy

cd ../backend/

npm install