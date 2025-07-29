@echo off
echo Installing server dependencies...
npm install

echo Building React app...
cd my-chat-ui
npm install
npm run build
cd ..

echo Starting server...
node server.js
