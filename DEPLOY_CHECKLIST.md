# ✅ Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] All features are tested locally
- [ ] Environment variables are documented
- [ ] No hardcoded localhost URLs (except for development)

## MongoDB Atlas Setup

- [ ] Account created at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Free cluster (M0) created
- [ ] Database user created with username and password
- [ ] IP address whitelisted (0.0.0.0/0 for development)
- [ ] Connection string copied and tested
- [ ] Connection string has password and database name replaced

## Backend Deployment (Render/Railway)

- [ ] Account created on hosting platform
- [ ] GitHub repository connected
- [ ] Web service created with correct settings:
  - [ ] Root directory: `Backend`
  - [ ] Build command: `npm install`
  - [ ] Start command: `npm start`
- [ ] Environment variables set:
  - [ ] `PORT=10000` (or platform default)
  - [ ] `MONGO_URL` (MongoDB Atlas connection string)
  - [ ] `JWT_SECRET` (secure random string)
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (will update after frontend deploy)
- [ ] Service deployed successfully
- [ ] Backend URL obtained (e.g., `https://your-backend.onrender.com`)
- [ ] Backend health check: Visit backend URL, should see "Hello World"

## Frontend Deployment (Vercel)

- [ ] Account created on [Vercel](https://vercel.com)
- [ ] GitHub repository connected
- [ ] Project created with correct settings:
  - [ ] Framework: Create React App
  - [ ] Root directory: `Frontend`
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `build`
- [ ] Environment variable set:
  - [ ] `REACT_APP_API_URL` (your backend URL + `/api/v1`)
- [ ] Project deployed successfully
- [ ] Frontend URL obtained (e.g., `https://your-app.vercel.app`)

## Post-Deployment

- [ ] Update backend `FRONTEND_URL` environment variable
- [ ] Redeploy backend with updated CORS settings
- [ ] Test frontend URL in browser
- [ ] Test user registration
- [ ] Test user login
- [ ] Test adding income
- [ ] Test adding expense
- [ ] Test viewing dashboard
- [ ] Test dark mode toggle
- [ ] Check browser console for errors
- [ ] Check backend logs for errors

## Security Checklist

- [ ] JWT_SECRET is a strong random string (not default)
- [ ] MongoDB password is strong
- [ ] Environment variables are not committed to Git
- [ ] CORS is configured correctly (not allowing all origins in production)
- [ ] MongoDB IP whitelist is configured (consider restricting in production)

## Performance

- [ ] Frontend loads quickly
- [ ] API responses are fast
- [ ] Images/assets are optimized
- [ ] No console errors

## Documentation

- [ ] Deployment URLs are saved
- [ ] Environment variables are documented
- [ ] Team members have access (if applicable)

---

## 🎉 Deployment Complete!

Once all items are checked, your app is live and ready to use!

**Next Steps:**
- Share your app URL
- Monitor usage and errors
- Set up error tracking (optional)
- Consider custom domain (optional)

