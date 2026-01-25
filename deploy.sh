#!/bin/bash

echo "Pulling latest changes..."
git pull origin main

echo "Installing dependencies..."
yarn install

echo "Building TypeScript..."
yarn build

echo "Restarting app with PM2..."
pm2 restart 0

echo "✅ Deployment complete."
