# Wallet Cashback Store - Full Stack Deployment Guide

A complete full-stack application for wallet cashback store with backend on Render and frontend on Vercel.

## Project Structure

```
wallet-cashback-store/
├── backend/                 # Node.js + Express + MongoDB API
│   ├── DEPLOYMENT.md       # Backend deployment guide
│   ├── render.yaml         # Render configuration
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Express server
│   ├── models/             # MongoDB models
│   └── routes/             # API routes
│
└── frontend/                # React + Vite + Tailwind CSS
    ├── DEPLOYMENT.md       # Frontend deployment guide
    ├── vercel.json         # Vercel configuration
    ├── .env.example        # Environment variables template
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API and utilities
    │   └── App.jsx         # Main app
    └── vite.config.js      # Vite configuration
```

## Quick Start - Local Development

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL: http://localhost:5000
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Deployment Architecture

```
┌─────────────────┐
│   Vercel        │
│   Frontend      │
│   (React/Vite)  │
└────────┬────────┘
         │
         │ HTTPS API Calls
         │
┌────────▼────────┐       ┌──────────────────┐
│   Render        │◄──────┤  MongoDB Atlas   │
│   Backend       │       │   Database       │
│   (Express)     │       └──────────────────┘
└─────────────────┘
```

## Deployment Steps

### 1. Backend Deployment on Render

**Prerequisites:**
- MongoDB Atlas account and connection string
- GitHub repository (public or private with Render access)

**Steps:**

1. **Prepare Backend**
   ```bash
   cd backend
   git add .
   git commit -m "Add render.yaml and deployment config"
   git push
   ```

2. **Create MongoDB Atlas Cluster**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Create database user with username/password
   - Get connection string
   - Whitelist Render IP address: `0.0.0.0/0` (for development)

3. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select branch (main)
   - Configure:
     - **Name**: `wallet-cashback-backend`
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Set Environment Variables**
   - In Render dashboard, go to "Environment"
   - Add variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster...
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app (set after frontend deploy)
     PORT=5000
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render builds and deploys automatically
   - Get your backend URL: `https://your-app-name.onrender.com`

### 2. Frontend Deployment on Vercel

**Prerequisites:**
- Vercel account
- GitHub repository

**Steps:**

1. **Prepare Frontend**
   ```bash
   cd frontend
   git add .
   git commit -m "Add vercel.json and deployment config"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select framework: **Vite**
   - Set root directory: `frontend`

3. **Set Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-backend.onrender.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys frontend
   - Get your frontend URL: `https://your-project.vercel.app`

### 3. Link Backend and Frontend

**Update Backend CORS:**
- Go back to Render dashboard
- Update `FRONTEND_URL` to your Vercel URL: `https://your-project.vercel.app`

## Environment Variables Reference

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wallet-cashback
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com
```

## Monitoring and Maintenance

### Render Backend Monitoring
- View logs: Render Dashboard → logs tab
- Monitor performance: Render Dashboard → metrics
- Set up email alerts for build failures

### Vercel Frontend Monitoring
- View builds: Vercel Dashboard → deployments
- Monitor performance: Analytics tab
- Get email notifications for build failures

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas includes Render IPs
- Ensure credentials are correct
- Check network status of MongoDB cluster

**CORS Errors**
- Verify `FRONTEND_URL` matches your Vercel domain exactly
- Check backend CORS configuration in `server.js`
- Ensure both HTTP and HTTPS are allowed (HTTPS for production)

**Build Failed on Render**
- Check logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node.js version compatibility (20.x)

### Frontend Issues

**API Calls Fail**
- Check `VITE_API_URL` in Vercel environment
- Verify backend is running and accessible
- Check browser DevTools Network tab for failed requests
- Ensure backend CORS allows frontend domain

**Blank Page**
- Check browser console for JavaScript errors
- Verify build output in Vercel logs
- Clear browser cache and reload

**Build Failed**
- Check logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility

## Performance Tips

### Backend
- Enable compression middleware
- Use connection pooling for MongoDB
- Implement rate limiting
- Cache frequently accessed data
- Monitor database query performance

### Frontend
- Enable gzip compression
- Optimize images and assets
- Implement lazy loading for routes
- Use React.memo for expensive components
- Monitor Core Web Vitals

## Security Considerations

- ✅ Separate backend and frontend deployments
- ✅ Use environment variables for sensitive data
- ✅ CORS properly configured
- ✅ MongoDB user with limited permissions
- ✅ Input validation on backend
- ✅ HTTPS enforced (automatic on Render/Vercel)

**Additional Security:**
- Add request validation middleware
- Implement rate limiting
- Use helmet.js for security headers
- Implement JWT authentication (if needed)
- Regular security audits

## Deployment Checklist

### Before Deploying Backend
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] `.env.example` committed to git
- [ ] `render.yaml` added to backend
- [ ] `DEPLOYMENT.md` updated with instructions
- [ ] Package.json updated with production settings
- [ ] All dependencies installed
- [ ] Health check endpoint works

### Before Deploying Frontend
- [ ] `.env.example` committed to git
- [ ] `vercel.json` added to frontend
- [ ] API client created (`apiClient.js`)
- [ ] All API calls use apiClient
- [ ] Build works locally (`npm run build`)
- [ ] Environment variables documented

### After Deployment
- [ ] Backend health check: `curl https://backend.onrender.com/api/health`
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] CORS allows frontend domain
- [ ] Database operations work
- [ ] Performance acceptable
- [ ] Monitoring set up

## Next Steps

1. Update this README with actual deployed URLs
2. Set up continuous monitoring
3. Plan backup strategy for MongoDB
4. Implement error logging/tracking
5. Set up analytics for frontend
6. Create incident response procedures
7. Plan scaling strategy

## Support and Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Help](https://www.mongodb.com/docs/atlas/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)

## License

ISC

---

**Last Updated**: March 9, 2026
**Status**: Production Ready
