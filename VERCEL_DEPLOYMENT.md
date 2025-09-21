# Vercel Deployment Guide for Secure Cargo Ledger

This guide provides step-by-step instructions for deploying the Secure Cargo Ledger application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all code is committed and pushed to the main branch
2. Verify the following files exist in the root directory:
   - `package.json`
   - `vite.config.ts`
   - `index.html`
   - `tsconfig.json`

## Step 2: Connect to Vercel

### Option A: Import from GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select "Import Git Repository"
5. Choose `GabrielaMCG/secure-cargo-ledger`
6. Click "Import"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /path/to/secure-cargo-ledger
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name: secure-cargo-ledger
# - Directory: ./
# - Override settings? No
```

## Step 3: Configure Build Settings

### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_endpoint
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

### How to Add Environment Variables:

1. Go to your project dashboard in Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable:
   - **Name**: `NEXT_PUBLIC_CHAIN_ID`
   - **Value**: `11155111`
   - **Environment**: Production, Preview, Development
   - Click "Save"
5. Repeat for all variables

## Step 4: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to be issued

## Step 5: Deploy

### Automatic Deployment
- Push changes to the main branch
- Vercel will automatically build and deploy

### Manual Deployment
```bash
# From project directory
vercel --prod
```

## Step 6: Verify Deployment

1. Check the deployment URL provided by Vercel
2. Test wallet connection
3. Verify all features work correctly

## Troubleshooting

### Build Failures

**Error**: `Module not found: Can't resolve '@rainbow-me/rainbowkit'`
**Solution**: Ensure all dependencies are in `package.json` and run `npm install` locally to verify

**Error**: `TypeScript compilation errors`
**Solution**: Check `tsconfig.json` configuration and fix type errors

### Runtime Errors

**Error**: `Wallet connection not working`
**Solution**: Verify environment variables are set correctly, especially `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

**Error**: `Network connection issues`
**Solution**: Check RPC URLs and ensure they're accessible

### Performance Issues

**Issue**: Slow loading times
**Solution**: 
- Enable Vercel's Edge Functions
- Optimize bundle size
- Use Vercel's Analytics

## Advanced Configuration

### Custom Build Command
If you need a custom build process:

```json
{
  "buildCommand": "npm run build && npm run postbuild",
  "outputDirectory": "dist"
}
```

### Edge Functions
For serverless functions, create `api/` directory in your project root.

### Analytics
Enable Vercel Analytics in your project settings for performance monitoring.

## Monitoring and Maintenance

1. **Check Deployment Status**: Monitor builds in Vercel dashboard
2. **View Logs**: Check function logs for errors
3. **Performance**: Use Vercel Analytics for insights
4. **Updates**: Push to main branch for automatic deployments

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **API Keys**: Use Vercel's environment variable system
3. **CORS**: Configure if needed for API calls
4. **Rate Limiting**: Implement if necessary

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Project Issues: Create issue in GitHub repository

## Deployment Checklist

- [ ] Repository is connected to Vercel
- [ ] Build settings are configured correctly
- [ ] Environment variables are set
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] All features are functional
- [ ] Performance is acceptable
- [ ] Analytics are enabled (optional)

## Post-Deployment

1. Test all functionality thoroughly
2. Monitor for any errors in Vercel dashboard
3. Set up monitoring and alerts if needed
4. Document any custom configurations
5. Share deployment URL with stakeholders

---

**Note**: This deployment guide assumes you have the necessary permissions and access to the GitHub repository and Vercel account. Make sure to follow security best practices when handling environment variables and API keys.
