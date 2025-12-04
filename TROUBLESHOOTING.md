# 🔧 Troubleshooting Login/Registration Failures

## Your Backend is Live! ✅
- **Backend URL**: `https://expense-tracker-ytcm.onrender.com`
- **Status**: Connected to MongoDB ✅

## Common Issues & Fixes

### Issue 1: Frontend Not Connected to Backend

**Problem**: Frontend is still pointing to `localhost:5000` instead of your Render backend.

**Solution**:
1. **If using Vercel**:
   - Go to Vercel Dashboard → Your project
   - Settings → Environment Variables
   - Update `REACT_APP_API_URL` to:
     ```
     https://expense-tracker-ytcm.onrender.com/api/v1
     ```
   - Redeploy frontend

2. **If testing locally**:
   - Create `.env` file in `Frontend/` directory:
     ```
     REACT_APP_API_URL=https://expense-tracker-ytcm.onrender.com/api/v1
     ```
   - Restart your frontend: `npm start`

### Issue 2: CORS Errors

**Problem**: Browser console shows CORS errors.

**Solution**:
1. Go to Render Dashboard → Your backend service
2. Environment → Add/Update:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
   (Replace with your actual Vercel frontend URL)
3. If testing locally, also add:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
4. Redeploy backend

### Issue 3: Network Errors

**Problem**: "Network Error" or "Failed to fetch" in browser console.

**Check**:
1. **Backend is running**: Visit `https://expense-tracker-ytcm.onrender.com`
   - Should see: "Hello World"
2. **Test API endpoint**: Visit `https://expense-tracker-ytcm.onrender.com/api/v1/auth/register`
   - Should see error (expected, but confirms route exists)
3. **Check browser console** for actual error messages

### Issue 4: JWT_SECRET Not Set

**Problem**: Token generation fails.

**Solution**:
1. Go to Render Dashboard → Environment
2. Make sure `JWT_SECRET` is set
3. Generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
4. Update `JWT_SECRET` in Render
5. Redeploy

## 🧪 Testing Your Backend

### Test 1: Check Backend is Running
```bash
curl https://expense-tracker-ytcm.onrender.com
```
Should return: "Hello World"

### Test 2: Test Registration Endpoint
```bash
curl -X POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Expected Response** (Success):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Expected Response** (If user exists):
```json
{
  "message": "User already exists with this email!"
}
```

### Test 3: Test Login Endpoint
```bash
curl -X POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 🔍 Debugging Steps

### Step 1: Check Browser Console
1. Open your frontend in browser
2. Open Developer Tools (F12)
3. Go to Console tab
4. Try to register/login
5. Look for error messages

### Step 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to Network tab
3. Try to register/login
4. Click on the failed request
5. Check:
   - **Request URL**: Should be `https://expense-tracker-ytcm.onrender.com/api/v1/auth/register` or `/login`
   - **Status Code**: 200 = success, 400/401 = error, 500 = server error
   - **Response**: See actual error message

### Step 3: Check Render Logs
1. Go to Render Dashboard
2. Click your backend service
3. Go to "Logs" tab
4. Look for error messages when you try to register/login

## 📋 Quick Checklist

- [ ] Frontend `REACT_APP_API_URL` is set to `https://expense-tracker-ytcm.onrender.com/api/v1`
- [ ] Backend `FRONTEND_URL` is set to your Vercel frontend URL
- [ ] Backend `JWT_SECRET` is set (not default)
- [ ] Backend `MONGO_URL` is correct and MongoDB is connected
- [ ] Frontend is redeployed after changing environment variables
- [ ] Backend is redeployed after changing environment variables
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows requests going to correct URL

## 🎯 Most Common Fix

**90% of issues are caused by wrong API URL in frontend!**

Make sure in Vercel (or your frontend hosting):
```
REACT_APP_API_URL=https://expense-tracker-ytcm.onrender.com/api/v1
```

**Note**: 
- No trailing slash
- Includes `/api/v1`
- Uses `https://` not `http://`

## 🆘 Still Not Working?

1. **Share the exact error message** from browser console
2. **Share the Network tab details** (status code, response)
3. **Check Render logs** for backend errors
4. **Verify environment variables** are set correctly in both platforms

