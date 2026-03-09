# Wallet Cashback Store - Backend

A Node.js + Express + MongoDB backend for the wallet cashback store application.

## Prerequisites

- Node.js 20.x or higher
- MongoDB Atlas account (for MongoDB connection string)
- Render account (for deployment)

## Local Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Then update the values in `.env` with your actual credentials.

3. **Run development server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` by default.

4. **Test the API**
   ```bash
   curl http://localhost:5000/api/health
   ```

## Environment Variables

Create a `.env` file in the root directory with these variables:

- `MONGODB_URI` - Your MongoDB connection string (Atlas)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS configuration (e.g., https://your-app.vercel.app)

## Deployment on Render

### Step 1: Prepare Repository
- Ensure `.env` file is in `.gitignore`
- Commit `.env.example` and `render.yaml` to git
- Push to GitHub/GitLab

### Step 2: Connect to Render
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Select the backend folder as the root directory
5. Choose deployment settings

### Step 3: Configure Environment Variables
In Render dashboard, go to Environment and add:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `FRONTEND_URL` - Your Vercel frontend URL
- `NODE_ENV` - Set to `production`

### Step 4: Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your application

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com/cloud](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist your Render IP (Render will provide this or use 0.0.0.0/0 for testing)
5. Copy the connection string and add it to Render environment variables

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /products` - Get all products
- Other routes from `/routes` folder

## Production Checklist

- [ ] `.env` is in `.gitignore`
- [ ] `MONGODB_URI` is set in Render environment
- [ ] `FRONTEND_URL` is set correctly for CORS
- [ ] `NODE_ENV` is set to `production`
- [ ] All dependencies are in `package.json`
- [ ] Server has health check endpoint
- [ ] Error handling middleware is in place
- [ ] CORS is properly configured
- [ ] MongoDB connection has retry logic

## Troubleshooting

**MongoDB Connection Failed**
- Check MONGODB_URI is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure Render IP is allowed

**CORS Errors**
- Verify `FRONTEND_URL` in environment variables
- Check frontend URL is correctly formatted

**Build Failed**
- Ensure all dependencies are in `package.json`
- Check Node.js version is 20.x compatible
- Review Render logs for detailed errors

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## License

ISC
