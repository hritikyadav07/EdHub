@echo off
echo 🚀 EdHub Vercel Deployment Setup Complete!
echo ==============================================
echo.
echo ✅ Created configuration files:
echo    - Backend/vercel.json
echo    - frontend/vercel.json
echo    - frontend/.env.production
echo    - Updated Backend/server.js CORS
echo    - Updated frontend/vite.config.js
echo.
echo 📋 Next Steps:
echo 1. Go to https://vercel.com and login/signup
echo 2. Deploy Backend first:
echo    - Click 'Add New Project'
echo    - Import your GitHub repository
echo    - Set Root Directory: Backend
echo    - Add environment variables:
echo      MONGO_URI=mongodb+srv://Azmo:v9EVgustnUtyMIE8@cluster0.egfji.mongodb.net
echo      JWT_SECRET=your_strong_production_secret_here
echo      JWT_EXPIRE=30d
echo      NODE_ENV=production
echo.
echo 3. Deploy Frontend:
echo    - Create another project
echo    - Set Root Directory: frontend
echo    - Add environment variable:
echo      VITE_API_URL=https://your-backend-url.vercel.app/api
echo.
echo 4. Update Backend environment with frontend URL:
echo      FRONTEND_URL=https://your-frontend-url.vercel.app
echo.
echo 📖 For detailed instructions, see: VERCEL-DEPLOYMENT-GUIDE.md
echo.
echo 🎉 Your EdHub project is ready for deployment!
pause
