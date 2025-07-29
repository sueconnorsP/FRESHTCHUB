@echo off
echo Building frontend...
cd my-chat-ui
call npm install
call npm run build
cd ..

echo Committing changes...
git add .
git commit -m "Deploying latest build"
git push origin main

echo ✅ Deployment pushed to GitHub.
echo Now go to Render to trigger the redeploy or wait for auto-deploy.
pause
