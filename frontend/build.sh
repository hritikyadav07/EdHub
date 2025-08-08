#!/bin/bash
echo "🔧 Building EdHub Frontend for Vercel..."

# Set Node.js version compatibility
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
npm ci

# Build the project
npm run build

echo "✅ Build completed successfully!"
