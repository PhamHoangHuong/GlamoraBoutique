#!/bin/bash

echo "Starting deployment process..."

# 1. Handle conflicts first
echo "Handling potential conflicts..."
git reset --hard HEAD
git clean -fd
git checkout main

# 2. Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# 3. Install/update Composer dependencies
echo "Installing Composer dependencies..."
php82 /opt/cpanel/composer/bin/composer install --no-dev --optimize-autoloader

# 4. Install Node.js dependencies and build assets
echo "Setting up Node.js environment..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20.11.1

echo "Installing Node.js dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
npm install

echo "Building frontend assets..."
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Ensure build directory exists
mkdir -p public/build

# Copy manifest file
if [ -f "public/build/.vite/manifest.json" ]; then
    cp public/build/.vite/manifest.json public/build/manifest.json
fi

# 5. Clear and cache Laravel configurations
echo "Optimizing Laravel..."
php82 artisan cache:clear
php82 artisan config:cache
php82 artisan route:cache
php82 artisan view:cache
php82 artisan optimize

# 6. Set correct permissions
echo "Setting permissions..."
find storage -type d -exec chmod 0775 {} \;
find storage -type f -exec chmod 0664 {} \;
find bootstrap/cache -type d -exec chmod 0775 {} \;
find bootstrap/cache -type f -exec chmod 0664 {} \;
find public/build -type d -exec chmod 0775 {} \;
find public/build -type f -exec chmod 0664 {} \;

# 7. Handle storage link
echo "Setting up storage link..."
if [ -e public/storage ]; then
    rm public/storage
fi
php82 artisan storage:link

echo "Deployment completed!"

# Show versions and status
echo "Environment Information:"
echo "PHP Version: $(php82 -v | head -n 1)"
echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"
echo "Composer Version: $(php82 /opt/cpanel/composer/bin/composer -V)"

# Check if key Laravel directories are writable
echo -e "\nPermissions Check:"
[ -w "storage" ] && echo "✓ storage directory is writable" || echo "✗ storage directory is not writable"
[ -w "bootstrap/cache" ] && echo "✓ bootstrap/cache directory is writable" || echo "✗ bootstrap/cache directory is not writable"
[ -w "public/build" ] && echo "✓ public/build directory is writable" || echo "✗ public/build directory is not writable"
