# Hospital Management System - Deployment Guide

## Local Development

### Prerequisites
- Node.js v18+
- MongoDB connection string
- npm or yarn

### Setup

1. **Backend Setup**
```bash
cd server
npm install
```

2. **Frontend Setup**
```bash
cd client
npm install
```

3. **Environment Variables**

**Server** (server/.env):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Client** (client/.env.local for development):
```
VITE_API_URL=http://localhost:5000
```

### Running Locally

Terminal 1 - Backend:
```bash
cd server
node server.js
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Visit: http://localhost:5175

---

## Production Deployment on Render

### Backend Deployment

1. Push your code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repo
5. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables** (add in Render dashboard):
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

6. Deploy and note the backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment on Render

1. Create another Web Service for frontend
2. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview` (or use `npm install -g serve && serve -s dist`)
   - **Root Directory**: `client`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

3. Deploy

### Update CORS on Backend

For production, update your server.js CORS configuration with your frontend URL:

```javascript
app.use(
  cors({
    origin: [
      "https://your-frontend-url.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);
```

### Environment Files Structure

**Development** (checked into git):
- `server/.env` - local development vars
- `client/.env.local` - local dev frontend URL

**Production** (set via hosting provider dashboard):
- Backend: Set vars in Render dashboard
- Frontend: Set `VITE_API_URL` to production backend URL in Render dashboard

---

## Testing Login

### Local
- Email: `admin@test.com`
- Password: `password123`

To create a user on production:
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@prod.com","password":"pass123","role":"admin"}'
```

---

## Troubleshooting

**"Invalid Credentials" on production:**
- Ensure backend URL is correct in VITE_API_URL
- Check CORS configuration includes frontend URL
- Verify MongoDB connection is working on production

**CORS errors:**
- Backend CORS must include frontend URL
- Check both http:// and https://

**Login button not working:**
- Open browser DevTools (F12)
- Check Network tab for API request errors
- Check Console for JavaScript errors
