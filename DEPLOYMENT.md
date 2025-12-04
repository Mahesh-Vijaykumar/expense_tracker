# Free Hosting Deployment Guide

This guide will help you deploy your Expense Tracker application to free hosting platforms.

## 🎯 Recommended Free Hosting Stack

- **Frontend**: Vercel (React apps)
- **Backend**: Render or Railway
- **Database**: MongoDB Atlas (Free tier)

---

## 📋 Prerequisites

1. GitHub account (for code hosting)
2. Accounts on:
   - [Vercel](https://vercel.com) (Frontend)
   - [Render](https://render.com) or [Railway](https://railway.app) (Backend)
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Database)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Free Database)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. **Create Cluster**: 
   - Choose "Free" tier (M0)
   - Select a region close to you
   - Click "Create Cluster"
3. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `expense-tracker-user`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
4. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production, add specific IPs
5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `expense-tracker`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority`

---

## 🚀 Step 2: Deploy Backend to Render

### Option A: Render (Recommended)

1. **Create Account**: Go to [Render](https://render.com)
2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select the repository
   - Configure:
     - **Name**: `expense-tracker-backend`
     - **Root Directory**: `Backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
3. **Add Environment Variables**:
   ```
   PORT=10000
   MONGO_URL=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```
4. **Deploy**: Click "Create Web Service"
5. **Get Backend URL**: After deployment, you'll get a URL like `https://expense-tracker-backend.onrender.com`

### Option B: Railway

1. **Create Account**: Go to [Railway](https://railway.app)
2. **New Project** → "Deploy from GitHub repo"
3. **Select Repository** → Add service
4. **Configure**:
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables** (same as Render)
6. **Deploy**

---

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Create Account**: Go to [Vercel](https://vercel.com)
2. **Import Project**:
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository
3. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. **Add Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v1
   ```
   (Replace with your actual backend URL)
5. **Deploy**: Click "Deploy"
6. **Get Frontend URL**: You'll get a URL like `https://expense-tracker.vercel.app`

---

## 🔧 Step 4: Update Code for Production

### Backend Updates Needed:

1. **Update CORS** to allow your frontend domain:
   ```javascript
   // In Backend/app.js
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

2. **Update PORT** to use environment variable:
   ```javascript
   const PORT = process.env.PORT || 5000;
   ```

### Frontend Updates:

The environment variable `REACT_APP_API_URL` is already configured in the code.

---

## 📝 Step 5: Update Environment Variables

### Backend (Render/Railway):
```
PORT=10000
MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=generate-a-secure-random-string-here
NODE_ENV=production
```

### Frontend (Vercel):
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api/v1
```

---

## 🔄 Step 6: Continuous Deployment

All platforms support automatic deployments:
- **Vercel**: Auto-deploys on every push to main branch
- **Render**: Auto-deploys on every push (can configure branch)
- **Railway**: Auto-deploys on every push

---

## 🧪 Step 7: Test Your Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Test adding income/expenses
4. Check backend logs in Render/Railway dashboard

---

## 🆓 Free Tier Limits

### Vercel:
- Unlimited deployments
- 100GB bandwidth/month
- Perfect for React apps

### Render:
- 750 hours/month free
- Sleeps after 15 minutes of inactivity (wakes on request)
- Free SSL certificate

### Railway:
- $5 free credit/month
- Pay-as-you-go after credit
- No sleep (always on)

### MongoDB Atlas:
- 512MB storage
- Shared cluster
- Perfect for development/small apps

---

## 🐛 Troubleshooting

### Backend Issues:
- **Connection timeout**: Check MongoDB Atlas IP whitelist
- **CORS errors**: Update CORS origin in backend
- **Port issues**: Use `process.env.PORT` (Render uses port 10000)

### Frontend Issues:
- **API not connecting**: Check `REACT_APP_API_URL` environment variable
- **Build fails**: Check build logs in Vercel dashboard

### Database Issues:
- **Connection refused**: Verify MongoDB connection string
- **Authentication failed**: Check username/password in connection string

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

---

## 🎉 You're Done!

Your Expense Tracker is now live on the internet for free!

**Next Steps:**
1. Share your app URL with friends
2. Monitor usage in platform dashboards
3. Consider upgrading if you need more resources

