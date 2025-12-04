# 🚨 Quick Fix: Login/Registration Failed

## Your Backend is Working! ✅
- **URL**: `https://expense-tracker-ytcm.onrender.com`
- **Status**: Connected to MongoDB ✅

## The Problem
Your frontend is either:
1. Not deployed yet, OR
2. Using wrong API URL (still pointing to localhost)

## ✅ Solution

### If Frontend is on Vercel:

1. **Go to Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. **Add/Update**:
   ```
   REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com/api/v1
   ```
   **Important**: 
   - No trailing slash
   - Includes `/api/v1`
   - Use `https://` not `http://`

4. **Redeploy**:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### If Testing Locally:

1. **Create `.env` file** in `Frontend/` directory:
   ```
   REACT_APP_API_URL=https://expense-tracker-ytcm.onrender.com/api/v1
   ```

2. **Restart frontend**:
   ```bash
   cd Frontend
   npm start
   ```

### Update Backend CORS (After Frontend Deploy):

1. **Get your frontend URL** (from Vercel)
2. **Go to Render** → Your backend service
3. **Environment** → Add/Update:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
4. **Redeploy backend**

## 🧪 Test Backend Directly

Test if backend is working:

```bash
curl -X POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

If this works, backend is fine - the issue is frontend configuration!

## 📋 Checklist

- [ ] Frontend is deployed to Vercel
- [ ] `REACT_APP_API_URL` is set to `https://expense-tracker-ytcm.onrender.com/api/v1`
- [ ] Frontend is redeployed after setting environment variable
- [ ] Backend `FRONTEND_URL` is set to your Vercel URL
- [ ] Backend is redeployed after setting `FRONTEND_URL`

## 🔍 Check Browser Console

1. Open your frontend
2. Press F12 → Console tab
3. Try to register/login
4. Look for errors

**Common errors:**
- `Network Error` → Wrong API URL
- `CORS error` → Frontend URL not in backend CORS
- `404 Not Found` → Wrong endpoint URL

