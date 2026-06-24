# Deployment Checklist ✅

## Frontend Configuration
- [x] `.env.local` - Points to http://localhost:5000 (development)
- [x] `.env.production` - Points to https://hospital-management-system-lxxm.onrender.com (production)
- [x] API service uses `import.meta.env.VITE_API_URL` for dynamic URL
- [x] All components updated to use centralized API service

## Backend Configuration
- [x] CORS configured for:
  - https://name-hospital-management-frontend.onrender.com (production frontend)
  - http://localhost:5173/5174/5175 (local development)
- [x] `.env` configured for local development
- [x] `.env.production` ready for production vars
- [x] MongoDB connection working
- [x] JWT authentication working

## What Happens During Deployment

### Frontend Build
When you run `npm run build` in the client folder:
1. Vite automatically loads `.env.production`
2. Sets `VITE_API_URL=https://hospital-management-system-lxxm.onrender.com`
3. All API calls use this production URL
4. The build is static and ready to deploy

### Backend Stays Running
Your backend continues running on Render at the URL you already have

## Steps to Fix "Invalid Credentials" on Production

1. **Verify Backend URL**
   - In Render dashboard, check your backend URL
   - Should match the URL in client/.env.production

2. **Create a Production User**
   ```bash
   curl -X POST https://your-backend-url/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin","email":"admin@hospital.com","password":"password123","role":"admin"}'
   ```

3. **Check Frontend Deployment**
   - The frontend should send requests to your backend URL
   - Check browser DevTools → Network tab
   - Look at the login request URL

4. **Verify CORS**
   - If you get CORS error, update backend's CORS to include your actual frontend URL
   - Format: `https://your-frontend-domain.onrender.com`

## Current URLs (Update These)

Replace with your actual deployed URLs:
- **Backend**: https://hospital-management-system-lxxm.onrender.com (currently shows this)
- **Frontend**: https://name-hospital-management-frontend.onrender.com (shown in your CORS config)

## If Frontend URL Changed

1. Update `client/.env.production`:
   ```
   VITE_API_URL=your-new-backend-url
   ```

2. Rebuild and redeploy frontend:
   ```bash
   cd client
   npm run build
   # Deploy the dist folder
   ```

3. Update backend CORS with new frontend URL:
   ```javascript
   origin: [
     "https://your-new-frontend-url.onrender.com",
     // ... other urls
   ]
   ```

4. Redeploy backend
