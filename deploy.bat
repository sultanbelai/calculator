@echo off
REM 🚀 Calculator App Deployment Script for Windows
REM This script automates the deployment process to GitHub Pages

echo 🚀 Starting deployment process...

REM Check if gh-pages is installed
npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing gh-pages package...
    npm install --save-dev gh-pages
)

REM Build the project
echo 🔨 Building the project...
npm run build

REM Deploy to GitHub Pages
echo 🚀 Deploying to GitHub Pages...
npm run deploy

echo ✅ Deployment completed!
echo 🌐 Your app should be live in a few minutes at:
echo    https://yourusername.github.io/calculator
echo.
echo 📝 Don't forget to:
echo    1. Update the homepage URL in package.json
echo    2. Update URLs in public/index.html
echo    3. Update URLs in public/sitemap.xml
echo    4. Update links in src/components/Footer.js
echo.
echo 🔧 If you haven't set up the repository yet, see DEPLOYMENT.md
pause
