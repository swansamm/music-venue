# 🚀 Deploy Swan Dive PDX to Vercel - FREE Hosting

## Why Vercel?

**Vercel** is the best free hosting option for Next.js applications in 2025:

✅ **Free Forever** - Generous hobby plan with no time limits
✅ **Perfect for Next.js** - Built by the Next.js team
✅ **Auto-deployments** - Connect to GitHub for instant deploys
✅ **Global CDN** - Lightning fast worldwide
✅ **Zero Configuration** - Works out of the box
✅ **Custom Domains** - Add your own domain for free

### Free Tier Limits (More than enough for music venues!)
- **Deployments**: Unlimited
- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-hrs/month
- **Function Duration**: 10 seconds max
- **Build Time**: 6,000 minutes/month
- **Custom Domains**: Unlimited

## 🚀 Quick Deploy (5 minutes)

### Option 1: One-Click Deploy from GitHub

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Start Deploying" or "New Project"
   - Sign in with GitHub

3. **Import Repository**
   - Select your Swan Dive PDX repository
   - Click "Import"

4. **Deploy**
   - Vercel auto-detects Next.js
   - Click "Deploy"
   - ✨ Your site is live in ~60 seconds!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd music-venue
vercel

# Follow prompts:
# ? Set up and deploy "~/music-venue"? [Y/n] y
# ? Which scope? Your username
# ? Link to existing project? [y/N] n
# ? What's your project's name? swan-dive-pdx
# ? In which directory is your code located? ./

# Production deployment
vercel --prod
```

## 🔗 Your Live URLs

After deployment, you'll get:

- **Production URL**: `https://swan-dive-pdx.vercel.app`
- **Custom Domain**: Add your own domain for free
- **Preview URLs**: Automatic for every Git push

## ⚡ Auto-Deployment Setup

### Connect GitHub (Recommended)

1. In Vercel dashboard → Project Settings
2. Go to "Git" tab
3. Connect your GitHub repository
4. **Every push to main branch = instant deployment!**

### Environment Variables (if needed later)

In Vercel dashboard → Project Settings → Environment Variables:
```
# Add any future API keys here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🌍 Custom Domain Setup (Optional)

1. **Buy a domain** (or use existing)
2. **In Vercel dashboard** → Domains
3. **Add domain** → Follow DNS instructions
4. **Free SSL** certificate automatically generated!

Example: `swandivepdx.com` → Your venue website

## 📊 Performance & Analytics

Vercel includes:
- **Web Analytics** - Visitor tracking
- **Performance Monitoring** - Core Web Vitals
- **Error Tracking** - Automatic bug reports
- **Deploy Logs** - Debug any issues

## 🔧 Advanced Features (All Free!)

### Preview Deployments
- Every Git branch gets a preview URL
- Perfect for testing new features
- Share with team before going live

### Edge Functions
- Lightning fast API routes
- Run at 300+ global locations
- Perfect for future enhancements

### Image Optimization
- Automatic image compression
- Multiple formats (WebP, AVIF)
- Responsive image delivery

## 🚨 Troubleshooting

### Build Errors
```bash
# Test locally first
cd music-venue
npm run build
npm start
```

### Function Timeout
- Hobby plan: 10 second limit
- Optimize slow operations
- Consider edge functions for speed

### Domain Issues
- Check DNS propagation (up to 48 hours)
- Verify nameserver settings
- Use Vercel's DNS for simplicity

## 💰 Cost Estimates

**Free Tier**: Perfect for most music venues
- Small venue (< 1000 visitors/month): **$0**
- Medium venue (5000 visitors/month): **$0**
- Large venue (20k visitors/month): **$0**

**Pro Tier** ($20/month): Only if you need:
- Advanced analytics
- Password protection
- Team collaboration
- Longer function timeouts

## 📈 Scaling Up

When you grow:
1. **Pro Plan** ($20/month) - More limits
2. **Custom Domain** - Professional branding
3. **Team Features** - Multiple admins
4. **Advanced Analytics** - Detailed insights

## ✨ What You Get

🎯 **Production-ready hosting** for Swan Dive PDX
🌍 **Global CDN** - Fast worldwide loading
🔒 **Free SSL** - Secure HTTPS automatically
📱 **Mobile optimized** - Perfect mobile experience
🚀 **Auto-deploy** - Updates deploy instantly
📊 **Built-in analytics** - Track your visitors
💾 **Reliable storage** - localStorage persists
🎨 **Perfect design** - Your beautiful Swan Dive PDX design

## 🎉 You're Live!

Your Swan Dive PDX website is now:
- ✅ **Hosted on Vercel** - Professional, fast, free
- ✅ **Auto-deploying** - Updates push instantly
- ✅ **Globally distributed** - Fast loading worldwide
- ✅ **SSL secured** - Professional and secure
- ✅ **Analytics ready** - Track your venue's online presence

**Live URL**: `https://your-project-name.vercel.app`

Perfect for a professional music venue website! 🎵🎸
