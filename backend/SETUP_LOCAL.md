# Backend Setup Guide

## Quick Start

### 1. Create `.env` file
```bash
cd backend
cp .env.example .env
```

### 2. Edit `backend/.env`
Open the file and update `MONGODB_URI` with your actual MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://SaketMishra1234:SaketMishra62026@jwellarycluster.oygk6sl.mongodb.net/?appName=JwellaryCluster
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Backend Server
```bash
npm run dev
```

You should see:
```
============================================================
🚀 Backend Server running on http://localhost:5000
============================================================

✅ MongoDB URI configured
   Database Status: ✅ Connected

📍 Frontend URL: http://localhost:5173
🌍 Environment: development
```

### 4. Test the Backend

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Get Products:**
```bash
curl http://localhost:5000/products
```

---

## Troubleshooting

### Server won't start
- Make sure `.env` file exists in backend folder
- Check MongoDB URI is correct

### MongoDB connection fails
- Verify MongoDB URI in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure MongoDB cluster is running

### CORS errors
- Verify `FRONTEND_URL` matches your frontend URL
- Default for local dev is `http://localhost:5173`

---

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (from MongoDB Atlas)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment type (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

---

**Ready to go!** Now the frontend can connect to the backend at `http://localhost:5000`
