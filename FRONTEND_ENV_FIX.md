# 🔧 Fix 404 Error - Frontend Environment Variable

## Problem
Getting 404 error: "Request failed with status code 404"

This means the frontend is calling the wrong URL.

## ✅ Solution: Fix Vercel Environment Variable

### Step 1: Check Current Environment Variable

1. Go to **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. Check what `REACT_APP_API_URL` is set to

### Step 2: Set Correct Value

The environment variable **MUST** be:

```
REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com/api/v1
```

**Important:**
- ✅ Must include `/api/v1`
- ✅ No trailing slash
- ✅ Use `https://` not `http://`
- ✅ No `/auth/` at the end

### Step 3: Redeploy Frontend

1. After updating the environment variable
2. Go to **Deployments** tab
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**

### Step 4: Verify

1. Open your frontend
2. Open browser console (F12)
3. You should see logs like:
   ```
   Using API URL with /api/v1: https://expense-tracker-ytcm.onrender.com/api/v1/auth/
   Final BASE_URL for auth: https://expense-tracker-ytcm.onrender.com/api/v1/auth/
   ```

## 🧪 Test the Correct URL

The frontend should call:
```
✅ https://expense-tracker-ytcm.onrender.com/api/v1/auth/register
✅ https://expense-tracker-ytcm.onrender.com/api/v1/auth/login
```

**NOT:**
```
❌ https://expense-tracker-ytcm.onrender.com/auth/register
❌ https://expense-tracker-ytcm.onrender.com/api/v1/register
```

## 📋 Common Mistakes

### Wrong:
```
REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com
```
This will try to call: `https://expense-tracker-ytcm.onrender.com/api/v1/auth/register` ✅ (Actually correct now!)

### Wrong:
```
REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com/api/v1/
```
Trailing slash might cause issues.

### Correct:
```
REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com/api/v1
```

## 🔍 Debug in Browser Console

After redeploying, check browser console:
1. Look for the log: `Final BASE_URL for auth: ...`
2. Check Network tab → See actual request URL
3. Verify it matches: `https://expense-tracker-ytcm.onrender.com/api/v1/auth/register`

## ✅ After Fix

Once the environment variable is correct and frontend is redeployed:
- Registration should work
- Login should work
- No more 404 errors!

