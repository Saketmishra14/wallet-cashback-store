# Wallet Cashback Store - Frontend

A React + Vite + Tailwind CSS frontend for the wallet cashback store application.

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Vercel account (for deployment)

## Local Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Then update with your backend URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the root directory:

- `VITE_API_URL` - Backend API URL (without trailing slash)
  - Local: `http://localhost:5000`
  - Production: `https://your-backend.onrender.com`

## Using the API Client

The project includes an `apiClient` utility for making API requests. Import it in your components:

```javascript
import { apiClient } from '@/services/apiClient';

// Use it in your components
const products = await apiClient.get('/products');
```

## Deployment on Vercel

### Step 1: Prepare Repository
- Ensure `.env` is in `.gitignore`
- Commit `.env.example` and `vercel.json` to git
- Push to GitHub

### Step 2: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the frontend folder as the root directory

### Step 3: Configure Environment Variables
In Vercel project settings, add:
- **VITE_API_URL**: `https://your-backend.onrender.com`

### Step 4: Deploy
- Vercel automatically deploys on push to main branch
- First deployment happens automatically after configuration
- Future deployments trigger on git push

### Important Notes

- **Build Command**: Vercel automatically detects `vite` projects
- **Output Directory**: Set to `dist`
- **Install Command**: `npm install`
- **Framework**: Automatically detected as Vite

## Building for Production

```bash
npm run build
npm run preview
```

The build output is in the `dist/` directory.

## Project Structure

```
src/
├── components/        # React components
├── pages/            # Page components
├── services/         # API client utilities
├── assets/           # Images, videos, etc.
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Environment-Specific Configuration

The app automatically uses the correct API URL based on the environment:

- **Development**: Uses `VITE_API_URL` from `.env`
- **Production**: Uses `VITE_API_URL` environment variable set in Vercel

## API Endpoints

The app calls these endpoints from backend:

- `GET /api/health` - Health check
- `GET /products` - Get all products
- (Add other endpoints as needed)

## Performance Optimization

The Vite build is already optimized for production:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

## Troubleshooting

**API calls fail in production**
- Check `VITE_API_URL` is set in Vercel environment
- Verify backend URL is accessible
- Check CORS configuration on backend
- Look at browser console for errors

**Build fails**
- Check Node.js version is 20.x compatible
- Ensure all dependencies are installed
- Review build logs in Vercel dashboard

**Blank page or 404**
- Check build output in `dist/` folder
- Verify root path in routing

## Production Checklist

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is committed
- [ ] `VITE_API_URL` is set in Vercel environment
- [ ] Backend API URL is correct and accessible
- [ ] CORS is enabled on backend
- [ ] All dependencies are in `package.json`
- [ ] Build command runs successfully
- [ ] API client is used for all backend calls
- [ ] Console has no errors in production

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm start` - Alias for `npm run dev`

## Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **tailwindcss** - Utility CSS framework
- **lucide-react** - Icon library
- **react-qr-code** - QR code generation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
