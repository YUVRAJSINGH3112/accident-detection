# 🚀 Quick Start Guide

## ⚡ 1-Minute Setup

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Start Server (5 seconds)
```bash
npm start
```

You should see:
```
Server is running on http://localhost:3000
```

### Step 3: Open Frontend (5 seconds)

**On Desktop/Laptop:**
- Open browser → `http://localhost:3000`

**On Phone (iOS/Android):**
- Open browser → `http://localhost:3000`
- Grant motion & location permissions when prompted
- Shake phone to trigger alerts!

**Done!** ✅

---

## 🎯 Quick Action Items

### **Desktop Users:**
| What to Do | How |
|-----------|-----|
| **Test Movement Alert** | Click "📡 Simulate Movement" |
| **Test Manual Alert** | Click "🚨 Manual Alert" |
| **Test with REST API** | Run: `curl -X POST http://localhost:3000/accident` |
| **Test Multi-Client** | Open in 2-3 browser tabs |

### **Phone Users:**
| What to Do | How |
|-----------|-----|
| **Detect Shake** | Navigate to `http://localhost:3000` and **shake phone** |
| **See Location** | Check alert box - shows GPS coordinates |
| **View Sensors** | See acceleration values in real-time |
| **Change Sensitivity** | Edit `shakeThreshold` in `index.html` |

---

## 📡 Send Alert from Command Line

```bash
# Using curl (Windows PowerShell or Mac/Linux)
curl -X POST http://localhost:3000/accident

# Using Python
python -c "import requests; requests.post('http://localhost:3000/accident')"

# Using Node.js
node -e "require('http').get('http://localhost:3000/accident?', ()=>console.log('Sent!'))"
```

---

## 🧪 Advanced Testing with Socket.IO Client

1. Install socket.io-client:
```bash
npm install socket.io-client
```

2. Run the test client:
```bash
node test-client.js
```

---

## 🔧 Change Server Port

Edit `server.js` line 48:
```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to any port
```

---

## 📸 File Overview

- **server.js** - Main server with Express + Socket.IO
- **public/index.html** - Beautiful frontend dashboard
- **package.json** - Dependencies
- **test-client.js** - CLI test client
- **README.md** - Full documentation
- **QUICK-START.md** - This file

---

## 📱 Phone Motion Detection

### **How It Works:**
1. Open http://localhost:3000 on your phone
2. Grant "Motion" and "Location" permissions
3. **Shake your phone** 
4. Acceleration detected → Alert sent to all users
5. Your GPS location auto-captured with alert

### **Shake Sensitivity:**
- Default threshold: 25 m/s²
- To make more sensitive: Edit `index.html` line 30, set `shakeThreshold = 20`
- To make less sensitive: Set `shakeThreshold = 30`

**For detailed phone setup, see [PHONE-GUIDE.md](PHONE-GUIDE.md)**

---

## 🆘 Help

### Server won't start?
```bash
# Check if port is in use:
netstat -ano | findstr :3000

# Kill process using port:
taskkill /PID <PID> /F

# Try different port:
PORT=5000 npm start
```

### Frontend won't load?
- Make sure server is running
- Check http://localhost:3000 in browser
- Open browser console (F12) to see errors

### Not seeing alerts?
1. Ensure all browser tabs are on http://localhost:3000
2. Check server is running and shows "Connected clients: X"
3. Check browser console (F12) for errors

### Phone shake not detected?
1. Ensure motion permission is granted (check browser settings)
2. Shake phone harder - needs acceleration > 25 m/s²
3. Try a different phone to rule out hardware issues
4. Check browser console (F12) for acceleration values

### Phone location not showing?
1. Grant location permission in browser
2. Give app 5-10 seconds to get GPS lock
3. Go outdoors for better GPS signal
4. Check browser settings → Location is enabled

---

**That's it! You're ready to go! 🎉**
