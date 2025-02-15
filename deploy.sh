#!/bin/bash

echo "Starting deployment process..."

# 1. Handle conflicts first
echo "Handling potential conflicts..."
git stash save --include-untracked "Temporary stash before deployment"
git checkout main
git reset --hard origin/main

# 2. Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# 3. Install/update Composer dependencies
echo "Installing Composer dependencies..."
php /opt/cpanel/composer/bin/composer install --no-dev --optimize-autoloader

# 4. Install Node.js dependencies and build assets
echo "Setting up Node.js environment..."
# Bỏ phần nvm nếu đã cài đặt Node.js globally
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm use 20.11.1

# Kiểm tra Node.js version
NODE_VERSION=$(node -v)
echo "Using Node.js version: $NODE_VERSION"

echo "Installing Node.js dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Cài đặt vite globally
echo "Installing vite globally..."
yarn global add vite

# Cài đặt dependencies với platform override
if ! ESBUILD_BINARY_PATH="/opt/node/bin/esbuild" yarn install --frozen-lockfile; then
    echo "Installation failed with frozen lockfile, trying without..."
    rm -f yarn.lock
    ESBUILD_BINARY_PATH="/opt/node/bin/esbuild" yarn install --force --network-timeout 100000
fi

echo "Building frontend assets..."
export NODE_OPTIONS="--max-old-space-size=128"
ESBUILD_BINARY_PATH="/opt/node/bin/esbuild" $(yarn global bin)/vite build

# Ensure build directory exists and has correct permissions
mkdir -p public/build/{js,css,assets}
chmod -R 775 public/build

# Copy built files to correct locations
echo "Copying built files..."
if [ -d "public/build/.vite" ]; then
    cp -r public/build/.vite/* public/build/
    rm -rf public/build/.vite
fi

# Create manifest if not exists
if [ ! -f "public/build/manifest.json" ]; then
    echo "Creating manifest..."
    echo '{
        "resources/js/app.tsx": {
            "file": "js/app.js",
            "src": "resources/js/app.tsx",
            "isEntry": true,
            "css": ["css/app.css"]
        },
        "resources/scss/app.scss": {
            "file": "css/app.css",
            "src": "resources/scss/app.scss",
            "isEntry": true
        }
    }' > public/build/manifest.json
fi

# Verify files exist
echo "Verifying built files..."
for file in "js/app.js" "css/app.css" "manifest.json"; do
    if [ ! -f "public/build/$file" ]; then
        echo "Error: $file not found"
        ls -la public/build/
        exit 1
    else
        echo "✓ $file exists"
    fi
done

# Set correct permissions
find public/build -type f -exec chmod 644 {} \;
find public/build -type d -exec chmod 755 {} \;

echo "Build completed successfully"

# 5. Clear and cache Laravel configurations
echo "Optimizing Laravel..."
php artisan cache:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

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
php artisan storage:link

echo "Deployment completed!"

# Show versions and status
echo "Environment Information:"
echo "PHP Version: $(php -v | head -n 1)"
echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"
echo "Composer Version: $(php /opt/cpanel/composer/bin/composer -V)"

# Check if key Laravel directories are writable
echo -e "\nPermissions Check:"
[ -w "storage" ] && echo "✓ storage directory is writable" || echo "✗ storage directory is not writable"
[ -w "bootstrap/cache" ] && echo "✓ bootstrap/cache directory is writable" || echo "✗ bootstrap/cache directory is not writable"
[ -w "public/build" ] && echo "✓ public/build directory is writable" || echo "✗ public/build directory is not writable"
