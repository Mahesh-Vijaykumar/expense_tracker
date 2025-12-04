# 🚀 Quick Deployment Guide - Free Hosting

Deploy your Expense Tracker in 3 simple steps!

## 📦 Step 1: Setup MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account → Create free cluster (M0)
3. Create database user (username + password)
4. Network Access → Add IP: `0.0.0.0/0` (allow all)
5. Database → Connect → Get connection string
6. Replace `<password>` and `<dbname>` in connection string
   - Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority`

## 🔧 Step 2: Deploy Backend to Render (10 minutes)

1. **Push code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to [Render](https://render.com)** → Sign up with GitHub

3. **New → Web Service**:
   - Connect your GitHub repo
   - Settings:
     - **Name**: `expense-tracker-backend`
     - **Root Directory**: `Backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Environment Variables**:
   ```
   PORT=10000
   MONGO_URL=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
   JWT_SECRET=your-random-secret-key-here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

5. **Deploy** → Wait for URL (e.g., `https://expense-tracker-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Go to [Vercel](https://vercel.com)** → Sign up with GitHub

2. **Add New Project**:
   - Import your GitHub repo
   - Settings:
     - **Framework Preset**: Create React App
     - **Root Directory**: `Frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://expense-tracker-backend.onrender.com/api/v1
   ```
   (Use your actual Render backend URL)

4. **Deploy** → Get your frontend URL!

## ✅ Done!

Your app is live! Visit your Vercel URL to test it.

---

## 🔄 Update Backend CORS (After Frontend Deploy)

Once you have your frontend URL, update the backend environment variable:

1. Go to Render dashboard → Your backend service
2. Environment → Edit `FRONTEND_URL`
3. Set it to your Vercel URL: `https://your-app.vercel.app`
4. Save → Manual Deploy

---

## 🎯 Alternative: Railway (Backend)

If Render is slow, try [Railway](https://railway.app):

1. New Project → Deploy from GitHub
2. Add service → Select repo
3. Settings:
   - Root: `Backend`
   - Start: `npm start`
4. Add same environment variables
5. Deploy!

---

## 📝 Environment Variables Summary

### Backend (Render/Railway):
```
PORT=10000
MONGO_URL=your-mongodb-atlas-connection-string
JWT_SECRET=generate-random-string-here
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel):
```
REACT_APP_API_URL=https://your-backend.onrender.com/api/v1
```

---

## 🆓 Free Tier Limits

- **Vercel**: Unlimited deployments, 100GB/month
- **Render**: 750 hours/month, sleeps after 15min (wakes on request)
- **Railway**: $5 credit/month
- **MongoDB Atlas**: 512MB storage, shared cluster

---

## 🐛 Common Issues

**Backend won't start:**
- Check `PORT` is set (Render uses 10000)
- Verify MongoDB connection string
- Check logs in Render dashboard

**Frontend can't connect:**
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Make sure backend is deployed and running

**CORS errors:**
- Update `FRONTEND_URL` in backend environment variables
- Redeploy backend after updating

---

## 🎉 That's It!

Your Expense Tracker is now live on the internet for free!

**Need help?** Check the detailed guide in `DEPLOYMENT.md`

