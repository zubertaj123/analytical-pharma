# Deployment Instructions

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## Production Build

1. Create production build:
   ```bash
   npm run build
   ```

2. Preview production build:
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=pharma AI Frontend
```

## Deployment Platforms

### Vercel
1. Connect your repository to Vercel
2. Set build command to `npm run build`
3. Set output directory to `dist`

### Netlify
1. Connect your repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload the `dist` folder contents to your web server
