# Performance Testing Guide

## Automated Testing

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:

1. Open http://localhost:3000 in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
5. Click "Analyze page load"

**Target Scores:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Chrome DevTools Performance Profiling

1. Open DevTools → Performance tab
2. Click Record button
3. Interact with page (scroll, click)
4. Stop recording after 5-10 seconds
5. Analyze:
   - Frame rate (target: 60fps desktop, 30fps mobile)
   - Scripting time (<100ms)
   - Rendering time (<50ms)
   - Main thread activity

### Web Vitals Monitoring

Key metrics to monitor:

```
✅ First Contentful Paint (FCP): <1.5s
✅ Time to Interactive (TTI): <3s
✅ Largest Contentful Paint (LCP): <2.5s
✅ Cumulative Layout Shift (CLS): <0.1
✅ First Input Delay (FID): <100ms
```

## Manual Testing Checklist

### Desktop Testing (1920x1080)

- [ ] Page loads in <2 seconds
- [ ] 3D scene renders correctly
- [ ] Animations are smooth (60fps)
- [ ] Scroll animations trigger correctly
- [ ] All sections visible and interactive
- [ ] No console errors
- [ ] No layout shifts

### Tablet Testing (768x1024)

- [ ] Responsive layout adapts correctly
- [ ] 3D scene scales appropriately
- [ ] Touch interactions work
- [ ] Performance maintained (30fps+)
- [ ] Text remains readable
- [ ] Buttons are touch-friendly (44px min)

### Mobile Testing (375x667)

- [ ] Mobile-optimized layout
- [ ] Reduced 3D complexity
- [ ] Shadows disabled
- [ ] Animations simplified
- [ ] Load time <3 seconds
- [ ] No horizontal scroll
- [ ] Touch gestures work

## Performance Optimization Checklist

### Bundle Size
- [x] Code splitting implemented
- [x] Dynamic imports for sections
- [x] Tree-shaking enabled
- [x] Initial bundle <300KB
- [ ] Total JS <1MB

### 3D Assets
- [ ] All models use Draco compression
- [ ] Models <500KB each
- [ ] Textures max 2048x2048
- [ ] Total 3D assets <1MB
- [x] LOD system for mobile

### Runtime Performance
- [x] Error boundaries implemented
- [x] Suspense boundaries added
- [x] Mobile optimizations active
- [x] Adaptive pixel ratio
- [x] Reduced animations on mobile

### Network
- [ ] Enable gzip/brotli compression
- [ ] CDN for static assets
- [ ] Preload critical resources
- [ ] Lazy load images
- [ ] Cache static assets

## Browser Compatibility Testing

### Required Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] iOS Safari
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet

### WebGL Support
All modern browsers support WebGL. Fallback message should display for unsupported browsers.

## Performance Benchmarks

### Current Performance (Expected)

**Desktop (high-end):**
- FCP: ~1.2s
- TTI: ~2.5s
- FPS: 60fps
- Bundle size: ~250KB initial

**Mobile (mid-range):**
- FCP: ~2.0s
- TTI: ~3.5s
- FPS: 30fps+
- Bundle size: ~250KB initial

## Common Issues & Solutions

### Issue: Low FPS on mobile
**Solution:**
- Reduce model complexity
- Disable shadows (already done)
- Lower texture resolution
- Reduce animation complexity

### Issue: Large bundle size
**Solution:**
- Check for duplicate dependencies
- Use dynamic imports
- Remove unused code
- Enable tree-shaking

### Issue: Slow page load
**Solution:**
- Optimize images (WebP/AVIF)
- Enable CDN
- Implement caching
- Preload critical assets

### Issue: Layout shift
**Solution:**
- Reserve space for 3D canvas
- Use aspect-ratio CSS
- Avoid dynamic content insertion
- Load fonts early

## Production Checklist

Before deployment:

- [ ] Run Lighthouse audit (all scores >90)
- [ ] Test on real devices
- [ ] Check console for errors
- [ ] Verify all links work
- [ ] Test form submissions
- [ ] Check mobile responsiveness
- [ ] Verify 3D scene loads
- [ ] Test scroll animations
- [ ] Check cross-browser compatibility
- [ ] Optimize meta tags (SEO)
- [ ] Enable production mode
- [ ] Set up analytics
- [ ] Configure error tracking

## Monitoring in Production

### Tools to integrate:
1. **Google Analytics** - User behavior tracking
2. **Sentry** - Error monitoring
3. **Vercel Analytics** - Performance monitoring
4. **Web Vitals** - Core metrics tracking

### Key Metrics to Monitor:
- Page load time
- 3D asset load time
- Error rate
- Bounce rate
- User engagement
- Device distribution

## Performance Testing Commands

```bash
# Build for production
npm run build

# Analyze bundle size
npm run build && npx @next/bundle-analyzer

# Start production server locally
npm run start

# Run Lighthouse CI
npx lighthouse http://localhost:3000 --view
```

## Results Tracking

Document your results:

```
Date: ___________
Performance Score: ___/100
FCP: ___ms
TTI: ___ms
LCP: ___ms
Bundle Size: ___KB
Notes: _________________________
```

## Next Steps After Testing

1. Fix any issues found
2. Re-test until targets met
3. Deploy to staging
4. Final production test
5. Monitor metrics post-launch
