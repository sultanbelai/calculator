# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your calculator app to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `calculator` (or your preferred name)
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Update Configuration

**IMPORTANT**: Before pushing to GitHub, update these files:

#### Update `package.json` homepage:
```json
"homepage": "https://YOUR_USERNAME.github.io/calculator"
```
Replace `YOUR_USERNAME` with your actual GitHub username.

#### Update `public/index.html` URLs:
```html
<meta property="og:url" content="https://YOUR_USERNAME.github.io/calculator/" />
<meta property="twitter:url" content="https://YOUR_USERNAME.github.io/calculator/" />
<link rel="canonical" href="https://YOUR_USERNAME.github.io/calculator/" />
```

#### Update `public/sitemap.xml`:
```xml
<loc>https://YOUR_USERNAME.github.io/calculator/</loc>
```

#### Update `src/components/Footer.js`:
```javascript
href="https://YOUR_PORTFOLIO_URL/"
href="https://github.com/YOUR_USERNAME/calculator"
```

### 3. Initialize Git and Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Modern Calculator App"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/calculator.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 4. Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

### 5. Deploy to GitHub Pages

#### Option A: Manual Deployment
```bash
npm run deploy
```

#### Option B: Automatic Deployment (Recommended)
The GitHub Actions workflow will automatically deploy when you push to the main branch.

### 6. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch
6. Click "Save"

## 🔄 Automatic Deployment

Your repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:

- Automatically build your app when you push to main/master
- Deploy to GitHub Pages using the gh-pages branch
- Run on every push and pull request

## 📱 Custom Domain (Optional)

If you have a custom domain:

1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Create a `CNAME` file in the `public` folder:
   ```
   yourdomain.com
   ```
3. Configure DNS settings with your domain provider

## 🧪 Testing Deployment

1. Wait 2-5 minutes for deployment to complete
2. Visit `https://YOUR_USERNAME.github.io/calculator`
3. Test all calculator functionality
4. Verify theme switching works
5. Check responsive design on mobile

## 🔍 Troubleshooting

### Common Issues:

#### Build Fails
- Check for syntax errors in your code
- Ensure all dependencies are installed
- Check the Actions tab for detailed error logs

#### Page Not Found (404)
- Verify the homepage URL in package.json
- Check that GitHub Pages is enabled
- Wait for deployment to complete

#### Assets Not Loading
- Ensure all file paths are correct
- Check that build folder contains all assets
- Verify public folder structure

#### Theme Not Working
- Check CSS custom properties
- Verify data-theme attribute is set
- Test in different browsers

## 📊 Performance Optimization

After deployment, consider:

1. **Lighthouse Audit**: Run performance audit in Chrome DevTools
2. **Image Optimization**: Compress images if you add any
3. **Bundle Analysis**: Use `npm run build` to check bundle size
4. **CDN**: Consider using a CDN for better global performance

## 🔐 Security Considerations

- Repository is public (required for free GitHub Pages)
- No sensitive data in your code
- Consider using environment variables for any API keys
- Enable Dependabot alerts for security updates

## 📈 Analytics (Optional)

Add Google Analytics or other tracking:

1. Create account at [Google Analytics](https://analytics.google.com)
2. Add tracking code to `public/index.html`
3. Monitor user engagement and performance

## 🎯 Next Steps

After successful deployment:

1. **Share your app**: Add to your portfolio
2. **Documentation**: Update README with live demo link
3. **Feedback**: Share with friends and get feedback
4. **Improvements**: Plan future enhancements
5. **SEO**: Submit sitemap to search engines

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs
2. Review GitHub Pages documentation
3. Search existing GitHub issues
4. Create a new issue with detailed description

---

**Happy Deploying! 🚀**

Your calculator app will be live at: `https://YOUR_USERNAME.github.io/calculator`
