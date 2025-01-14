#!/bin/bash

echo "Starting Laravel project setup..."

# 1. Create necessary directories
echo "Creating directories..."
mkdir -p public/build
mkdir -p storage/framework/{sessions,views,cache}
mkdir -p bootstrap/cache

# 2. Set full permissions for important directories
echo "Setting full permissions..."
chmod -R 777 storage
chmod -R 777 bootstrap/cache
chmod -R 777 public
chmod -R 777 public/build

# 3. Create .htaccess files
echo "Creating .htaccess files..."

# Root .htaccess
cat > .htaccess << 'EOL'
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Serve existing files from public directory
    RewriteCond %{DOCUMENT_ROOT}/public/$1 -f [OR]
    RewriteCond %{DOCUMENT_ROOT}/public/$1 -d
    RewriteRule ^(.*)$ public/$1 [L]

    # Route everything else to public/index.php
    RewriteRule ^(.*)$ public/index.php [L]
</IfModule>
EOL

# Public .htaccess
cat > public/.htaccess << 'EOL'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Serve static files directly
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Handle Front Controller
    RewriteRule ^ index.php [L]
</IfModule>

# Enable CORS for assets
<IfModule mod_headers.c>
    <FilesMatch "\.(css|js|ttf|woff|woff2)$">
        Header set Access-Control-Allow-Origin "*"
    </FilesMatch>
</IfModule>

# Cache Control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType application/x-font-ttf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
EOL

# Build directory .htaccess
cat > public/build/.htaccess << 'EOL'
<IfModule mod_rewrite.c>
    RewriteEngine Off
</IfModule>

<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Cache-Control "public, max-age=31536000"
</IfModule>
EOL

# 4. Set execute permissions for scripts
echo "Setting script permissions..."
chmod +x deploy.sh
chmod +x setup.sh

# 5. Set permissions for storage structure
echo "Setting storage permissions..."
find storage -type d -exec chmod 777 {} \;
find storage -type f -exec chmod 666 {} \;

# 6. Set permissions for public directory
echo "Setting public directory permissions..."
find public -type d -exec chmod 777 {} \;
find public -type f -exec chmod 666 {} \;

# 7. Create/Update .env if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    chmod 666 .env
    php artisan key:generate
fi

# 8. Install dependencies if needed
if [ ! -d "vendor" ]; then
    echo "Installing Composer dependencies..."
    composer install
fi

if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    yarn install
fi

# 9. Final permission check
echo "Verifying permissions..."
ls -la
ls -la public/
ls -la storage/
ls -la bootstrap/

echo "Setup completed! You can now run ./deploy.sh to deploy your application."
