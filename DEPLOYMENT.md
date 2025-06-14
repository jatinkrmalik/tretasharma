# Deployment Guide - Treta Sharma Portfolio Website

This guide provides step-by-step instructions for deploying the Treta Sharma portfolio website to GitHub Pages with a custom domain.

## 📋 Prerequisites

- Git installed on your local machine
- GitHub account
- Domain name (tretasharma.com) with DNS management access
- Basic knowledge of Git commands

## 🚀 Deployment Steps

### 1. Repository Setup

1. **Create GitHub Repository**
   ```bash
   # If you haven't already, create a new repository on GitHub named 'tretasharma'
   # Make sure it's public for GitHub Pages to work
   ```

2. **Initialize Git and Connect to GitHub**
   ```bash
   cd /path/to/tretasharma
   git init
   git add .
   git commit -m "Initial commit: Professional portfolio website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/tretasharma.git
   git push -u origin main
   ```

### 2. GitHub Pages Configuration

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy from the main branch

2. **Verify Workflow**
   - Check the "Actions" tab in your repository
   - Ensure the "Deploy Jekyll site to Pages" workflow runs successfully
   - The site will be available at `https://USERNAME.github.io/tretasharma`

### 3. Custom Domain Setup

#### 3.1 DNS Configuration

Configure your domain's DNS settings with your domain registrar:

**For Apex Domain (tretasharma.com):**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**For WWW Subdomain:**
```
Type: CNAME
Name: www
Value: USERNAME.github.io
TTL: 3600
```

#### 3.2 GitHub Repository Settings

1. **Configure Custom Domain**
   - Go to repository Settings → Pages
   - Under "Custom domain", enter: `tretasharma.com`
   - Check "Enforce HTTPS"
   - GitHub will automatically create a CNAME file in your repository

2. **Verify Domain**
   - Wait for DNS propagation (can take up to 24 hours)
   - GitHub will verify the domain automatically
   - A green checkmark will appear when verification is complete

### 4. SSL Certificate

GitHub Pages automatically provides SSL certificates for custom domains:
- Certificate is issued by Let's Encrypt
- Automatic renewal every 90 days
- HTTPS enforcement can be enabled in repository settings

### 5. Verification Steps

1. **Check DNS Propagation**
   ```bash
   # Use online tools or command line
   nslookup tretasharma.com
   dig tretasharma.com
   ```

2. **Test Website**
   - Visit `https://tretasharma.com`
   - Verify SSL certificate (green lock icon)
   - Test all navigation links and functionality
   - Check mobile responsiveness

3. **Performance Testing**
   - Use Google PageSpeed Insights
   - Test with GTmetrix or similar tools
   - Verify Core Web Vitals scores

### 6. SEO Configuration

1. **Google Search Console**
   - Add property for `tretasharma.com`
   - Verify ownership using HTML file method
   - Submit sitemap: `https://tretasharma.com/sitemap.xml`

2. **Google Analytics** (Optional)
   - Create GA4 property
   - Add tracking ID to `_config.yml`
   - Verify tracking is working

## 🔧 Maintenance

### Regular Updates

1. **Content Updates**
   ```bash
   # Make changes to content
   git add .
   git commit -m "Update: [description of changes]"
   git push origin main
   ```

2. **Dependency Updates**
   ```bash
   # Update Jekyll and gems
   bundle update
   git add Gemfile.lock
   git commit -m "Update dependencies"
   git push origin main
   ```

### Monitoring

1. **Check GitHub Actions**
   - Monitor deployment workflows
   - Check for any build failures
   - Review logs for warnings or errors

2. **Website Health**
   - Regular broken link checks
   - Performance monitoring
   - SSL certificate expiration (automatic renewal)

## 🛠 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Jekyll build locally
   bundle exec jekyll build --verbose
   
   # Fix any syntax errors or missing dependencies
   bundle install
   ```

2. **DNS Issues**
   - Verify DNS records are correct
   - Check propagation status
   - Ensure TTL values are reasonable (3600 seconds)

3. **SSL Certificate Issues**
   - Disable and re-enable HTTPS enforcement
   - Check domain verification status
   - Wait 24 hours for certificate provisioning

4. **Custom Domain Not Working**
   - Verify CNAME file exists in repository
   - Check DNS configuration
   - Ensure domain is verified in GitHub settings

### Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📊 Performance Optimization

### Image Optimization
- Use WebP format when possible
- Implement lazy loading
- Optimize image dimensions

### Caching Strategy
- Leverage browser caching
- Use CDN for external resources
- Implement service worker caching

### Code Optimization
- Minify CSS and JavaScript
- Remove unused code
- Optimize font loading

## 🔒 Security Considerations

1. **HTTPS Enforcement**
   - Always use HTTPS
   - Implement HSTS headers
   - Use secure external resources

2. **Content Security Policy**
   - Implement CSP headers
   - Restrict resource loading
   - Monitor for violations

3. **Regular Updates**
   - Keep Jekyll and dependencies updated
   - Monitor security advisories
   - Review third-party integrations

## 📈 Analytics & Monitoring

1. **Performance Metrics**
   - Core Web Vitals
   - Page load times
   - Mobile usability

2. **User Analytics**
   - Visitor tracking
   - Behavior analysis
   - Conversion monitoring

3. **SEO Monitoring**
   - Search rankings
   - Organic traffic
   - Keyword performance

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly at tretasharma.com
- [ ] HTTPS is working and enforced
- [ ] All navigation links work properly
- [ ] Contact form submissions work
- [ ] Mobile responsiveness verified
- [ ] Google Search Console configured
- [ ] Sitemap submitted
- [ ] Analytics tracking verified
- [ ] Performance scores optimized
- [ ] Social media previews working (Open Graph)
- [ ] Print stylesheets tested
- [ ] Accessibility compliance verified

## 📞 Support Contact

For technical issues or questions about the deployment:
- **Email**: tretasharma@gmail.com
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Refer to README.md for additional information

---

**Last Updated**: June 2025  
**Version**: 1.0  
**Maintainer**: Treta Sharma
