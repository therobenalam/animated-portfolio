# Deployment Guide - Vercel

## Quick Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - 3D Portfolio"
   git remote add origin https://github.com/yourusername/animated-portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

If using environment variables, add them in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
3. Redeploy to apply changes

## Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS (choose one):

   **Option A: Vercel Nameservers**
   - Copy Vercel nameservers
   - Update at your domain registrar
   - Wait for propagation (up to 48 hours)

   **Option B: CNAME Record**
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21`

## CDN Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic SSL

### Additional Optimizations

Add to `next.config.js`:

```javascript
const nextConfig = {
  // Already configured in project
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['yourdomain.com'], // Add if loading external images
  },
};
```

## Caching Strategy for 3D Assets

Create `public/_headers`:

```
/models/*
  Cache-Control: public, max-age=31536000, immutable
```

Or use Vercel configuration:

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/models/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Build Optimization

Vercel automatically:
- Minifies JavaScript and CSS
- Optimizes images
- Generates static pages
- Enables ISR (Incremental Static Regeneration)

### Build Commands (Auto-detected)

- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## Performance Monitoring

### Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Update `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Enable Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

Update `app/layout.tsx`:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Deployment Checklist

Before deploying:

- [ ] Test production build locally: `npm run build && npm start`
- [ ] Remove console.logs (handled by next.config.js)
- [ ] Update meta tags and SEO
- [ ] Add favicons and social preview images
- [ ] Test all 3D models load correctly
- [ ] Verify environment variables
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Update README with live URL
- [ ] Add analytics tracking
- [ ] Configure custom domain (optional)

## Post-Deployment

### 1. Verify Deployment

Check:
- [ ] Site loads at production URL
- [ ] 3D scene renders correctly
- [ ] Animations work smoothly
- [ ] All sections accessible
- [ ] Forms work (if applicable)
- [ ] Mobile version works
- [ ] No console errors

### 2. Set up Monitoring

- Enable Vercel Analytics
- Configure error tracking (Sentry)
- Set up uptime monitoring
- Monitor Core Web Vitals

### 3. Share Your Portfolio

Update these files with your production URL:
- README.md
- package.json (homepage field)
- Social media profiles

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: Out of memory**
```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

### 3D Models Not Loading

Check:
1. Files are in `public/models/`
2. Paths start with `/models/` not `/public/models/`
3. File extensions are lowercase (`.glb` not `.GLB`)
4. Files are committed to git

### Slow Performance

1. Check Vercel Analytics for bottlenecks
2. Optimize images: `npm install sharp`
3. Reduce 3D model size
4. Enable caching headers
5. Use CDN for large assets

## Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### AWS Amplify

1. Connect GitHub repository
2. Configure build settings
3. Deploy

### Self-Hosted (VPS)

```bash
# Build
npm run build

# Install PM2
npm install -g pm2

# Start server
pm2 start npm --name "portfolio" -- start

# Configure nginx reverse proxy
# Point to localhost:3000
```

## Continuous Deployment

Vercel automatically redeploys on:
- Push to main branch (production)
- Push to any branch (preview)
- Pull requests (preview)

### Branch Previews

Every branch gets a unique URL:
- `main` → production (`your-project.vercel.app`)
- `feature-branch` → preview (`feature-branch-your-project.vercel.app`)

## Cost Optimization

### Vercel Free Tier Includes:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Preview deployments

**Pro Tips:**
- Optimize images (use Next.js Image component)
- Compress 3D assets
- Enable caching
- Monitor bandwidth usage

## Security

Vercel provides:
- ✅ Automatic HTTPS/SSL
- ✅ DDoS protection
- ✅ Edge network security
- ✅ Secure environment variables

### Additional Security:

Add security headers in `next.config.js`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Discord](https://vercel.com/discord)

---

🚀 **Ready to deploy!** Your 3D portfolio will be live in minutes.
