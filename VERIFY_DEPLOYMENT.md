# ✅ Verify Your Deployment

## Backend Status

**Backend URL**: `https://expense-tracker-ytcm.onrender.com`

### Test Endpoints:

1. **Root endpoint** (should return "Hello World"):
   ```
   https://expense-tracker-ytcm.onrender.com/
   ```

2. **Register endpoint**:
   ```
   POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/register
   Body: {"name":"Test","email":"test@test.com","password":"test123"}
   ```

3. **Login endpoint**:
   ```
   POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/login
   Body: {"email":"test@test.com","password":"test123"}
   ```

## Frontend Configuration

### Vercel Environment Variable:

Set this in Vercel Dashboard → Environment Variables:

```
REACT_APP_API_URL = https://expense-tracker-ytcm.onrender.com/api/v1
```

**Important:**
- ✅ Includes `/api/v1`
- ✅ No trailing slash
- ✅ Uses `https://`

## Expected Frontend API Calls

After setting the environment variable correctly, your frontend should call:

- Register: `https://expense-tracker-ytcm.onrender.com/api/v1/auth/register`
- Login: `https://expense-tracker-ytcm.onrender.com/api/v1/auth/login`
- Get User: `https://expense-tracker-ytcm.onrender.com/api/v1/auth/user`
- Get Incomes: `https://expense-tracker-ytcm.onrender.com/api/v1/get-incomes`
- Get Expenses: `https://expense-tracker-ytcm.onrender.com/api/v1/get-expenses`

## Quick Test Commands

### Test Backend Registration:
```bash
curl -X POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Backend Login:
```bash
curl -X POST https://expense-tracker-ytcm.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## ✅ Checklist

- [ ] Backend is deployed and running
- [ ] Backend URL: `https://expense-tracker-ytcm.onrender.com`
- [ ] MongoDB is connected (check Render logs)
- [ ] Frontend `REACT_APP_API_URL` is set to `https://expense-tracker-ytcm.onrender.com/api/v1`
- [ ] Frontend is redeployed after setting environment variable
- [ ] Browser console shows correct API URL in logs

## 🎯 Next Steps

1. **Set environment variable in Vercel** (if not done)
2. **Redeploy frontend**
3. **Test registration/login**
4. **Check browser console** for any errors

Your backend is working! Just need to make sure frontend is pointing to the correct URL.

