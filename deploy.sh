#!/bin/bash

echo "Starting deployment process..."

# 1. Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# 2. Install dependencies
echo "Installing dependencies..."
composer install
yarn install

# 3. Build frontend assets
echo "Building frontend assets..."
rm -rf public/build
yarn build

# Copy manifest file if it exists
if [ -f "public/build/.vite/manifest.json" ]; then
    cp public/build/.vite/manifest.json public/build/manifest.json
fi

# 4. Clear all caches
echo "Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

# 5. Set permissions
echo "Setting permissions..."
chmod -R 777 storage
chmod -R 777 bootstrap/cache
chmod -R 777 public/build

# 6. Handle storage link
echo "Checking storage link..."
if [ -e public/storage ]; then
    rm public/storage
fi
php artisan storage:link

echo "Deployment completed!"

# Show status
echo "Checking application status..."
php artisan --version
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Yarn version: $(yarn -v)"
