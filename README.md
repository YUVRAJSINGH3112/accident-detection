# 🚨 Accident Detection System - Real-time Backend

A beginner-friendly real-time accident detection system built with **Node.js**, **Express.js**, and **Socket.IO** for instant notifications across multiple clients.

**NEW:** Includes **📱 Phone Motion Detection** and **📍 GPS Location Tracking**!

## 📋 Features

- ✅ **📱 Real-time phone motion detection** - Detects shakes and sudden movements
- ✅ **📍 GPS location tracking** - Automatically captures location with alerts
- ✅ **Real-time communication** using Socket.IO
- ✅ **REST API endpoint** for triggering alerts via HTTP
- ✅ **WebSocket events** for immediate client updates
- ✅ **Broadcast alerts** to all connected clients simultaneously
- ✅ **Beautiful responsive frontend** with visual alerts
- ✅ **Event logging** for debugging
- ✅ **Client connection tracking**

---

## 🏗️ Project Structure

```
backend/
├── server.js              # Main server file (Express + Socket.IO)
├── package.json           # Project dependencies
├── public/
│   └── index.html         # Frontend web page
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Step 1: Install Dependencies

Open terminal in the `backend` folder and run:

```bash
npm install
```

This will install:
- `express` - Web framework
- `socket.io` - Real-time communication
- `nodemon` - Auto-restart server during development (optional)

### Step 2: Start the Server

#### Option A: Using `npm start` (Production)
```bash
npm start
```

#### Option B: Using `npm run dev` (Development with auto-reload)
```bash
npm run dev
```

You should see output like:
```
═══════════════════════════════════════
🚨 Accident Detection System Server
═══════════════════════════════════════
Server is running on http://localhost:3000
WebSocket endpoint: ws://localhost:3000

Endpoints:
  • GET  http://localhost:3000/ (Frontend)
  • POST http://localhost:3000/accident (REST API)

WebSocket Events:
  • Emit: "movement" - trigger accident alert
  • Listen: "accident_detected" - receive alerts
═══════════════════════════════════════
```

---

## 🌐 Frontend - How to Connect

### Automatic Connection
Open your browser and navigate to:
```
http://localhost:3000
```

The frontend will automatically:
1. ✅ Connect to the WebSocket server
2. ✅ Display connection status
3. ✅ Listen for accident alerts in real-time
4. ✅ (On phones) Request motion & location permissions

### 📱 Phone Users
When you open the page on a mobile device:
1. You'll see **"Phone Motion Sensor"** status section
2. Grant motion permission when prompted
3. Grant location permission
4. **Shake your phone** to trigger alerts
5. Location is automatically captured and sent

**See [PHONE-GUIDE.md](PHONE-GUIDE.md) for detailed phone setup!**

### Manual Connection Example
```html
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script>
  const socket = io('http://localhost:3000');
  
  // Listen for alerts
  socket.on('accident_detected', (data) => {
    console.log('Accident alert:', data);
    // Show alert to user
  });
  
  // Send movement data
  socket.emit('movement', {
    sensorId: 'SENSOR-001',
    intensity: 75
  });
</script>
```

---

## 📡 API & Event Reference

### REST API

#### Trigger Accident Alert

**Endpoint:** `POST /accident`

**Using cURL:**
```bash
curl -X POST http://localhost:3000/accident
```

**Using JavaScript (Fetch):**
```javascript
fetch('http://localhost:3000/accident', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Alert sent:', data));
```

**Using Python:**
```python
import requests

response = requests.post('http://localhost:3000/accident')
print(response.json())
```

**Response:**
```json
{
  "success": true,
  "message": "Accident alert broadcasted to all clients",
  "clientsNotified": 3
}
```

---

### WebSocket Events

#### Client → Server

**1. Send Movement Sensor Data**
```javascript
socket.emit('movement', {
  sensorId: 'SENSOR-001',
  intensity: 85.5,
  location: 'Intersection A',
  timestamp: '2026-04-12T10:30:45Z'
});
```

**2. Send Manual Alert**
```javascript
socket.emit('manual_alert', {
  message: 'Emergency button pressed',
  location: 'Downtown'
});
```

#### Server → Client

**Receive Accident Detected Event**
```javascript
socket.on('accident_detected', (data) => {
  console.log(data);
  /* Response:
  {
    message: 'Accident detected! Movement sensor triggered.',
    timestamp: '2026-04-12T10:30:46Z',
    source: 'Movement Sensor',
    clientId: 'socket-id-123',
    sensorData: { ... }
  }
  */
});
```

**Receive Client Count Update**
```javascript
socket.on('client_count', (count) => {
  console.log(`Total connected clients: ${count}`);
});
```

---

## 🧪 Testing the System

### Test 1: Using the Web Frontend
1. Open http://localhost:3000 in your browser (or multiple tabs)
2. Click "📡 Simulate Movement" button
3. All tabs should show the alert notification

### Test 2: Using REST API
```bash
# Open terminal and run:
curl -X POST http://localhost:3000/accident
```
Refresh the frontend page - you should see the alert appear.

### Test 3: Using Manual Alert Button
1. Open http://localhost:3000
2. Click "🚨 Manual Alert"
3. Alert notification appears on all connected clients

### Test 4: Using WebSocket with Node.js
Create a file `test-client.js`:
```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected!');
  
  // Send movement event
  socket.emit('movement', {
    sensorId: 'TEST-SENSOR',
    intensity: 90
  });
  
  // Listen for alerts
  socket.on('accident_detected', (data) => {
    console.log('🚨 Alert received:', data);
  });
});
```

Run it:
```bash
npm install socket.io-client
node test-client.js
```

---

## 🔄 How It Works

```
┌─────────────────────┐
│   Client 1 (Web)    │
│   sends: "movement" │
└──────────┬──────────┘
           │
           ├─→ Server receives event
           │
           └─→ Broadcasts "accident_detected" to ALL clients
                │
                ├─→ Client 1 receives alert ✓
                ├─→ Client 2 receives alert ✓
                └─→ Client 3 receives alert ✓
```

**Flow:**
1. A client sends a "movement" event OR the REST API receives a POST request
2. Server logs the event and prepares broadcast data
3. Server broadcasts "accident_detected" to **ALL connected clients**
4. Each client displays the alert notification and logs the event
5. Frontend shows animated alert for 5 seconds, then auto-hides

---

## 📊 Server Logs Example

```
✓ New client connected: BdAqb1234567
📊 Total connected clients: 1

Movement detected from BdAqb1234567: { sensorId: 'SENSOR-001', intensity: 85.5 }

✗ Client disconnected: BdAqb1234567
📊 Total connected clients: 0
```

---

## 🛠️ Customization

### Change Server Port

Edit `server.js`:
```javascript
const PORT = process.env.PORT || 5000;  // Change 3000 to 5000
```

### Add More WebSocket Events

In `server.js`:
```javascript
socket.on('custom_event', (data) => {
  console.log('Custom event received:', data);
  io.emit('another_event', { /* data */ });
});
```

In frontend `index.html`:
```javascript
socket.emit('custom_event', { /* data */ });
socket.on('another_event', (data) => {
  // Handle event
});
```

### Style Customization

Modify CSS in `public/index.html` to change:
- Colors
- Button styles
- Alert animations
- Layout

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install` in the backend folder

### Issue: "Port 3000 is already in use"
**Solution:** Change the port in `server.js` or kill the process:
```bash
# On Windows (PowerShell):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Issue: Frontend doesn't connect to server
**Solution:** 
- Ensure server is running (`npm start`)
- Check browser console for errors (F12)
- Verify correct URL: http://localhost:3000
- Check firewall settings

### Issue: Events not being received
**Solution:**
- Check browser console (F12) for connection logs
- Ensure `socket` connection is established
- Check server logs for incoming events

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

---

## 📝 Example: Full Client Integration

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
  <h1>Accident Detection</h1>
  <div id="status">Connecting...</div>
  <div id="alerts"></div>
  
  <button onclick="triggerAlert()">Send Alert</button>
  
  <script>
    const socket = io('http://localhost:3000');
    
    socket.on('connect', () => {
      document.getElementById('status').textContent = 'Connected ✓';
    });
    
    socket.on('accident_detected', (data) => {
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `<strong>${data.message}</strong><br>${data.timestamp}`;
      document.getElementById('alerts').appendChild(alertDiv);
      
      // Sound notification
      const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
      audio.play();
    });
    
    function triggerAlert() {
      socket.emit('movement', { sensorId: 'TEST' });
    }
  </script>
</body>
</html>
```

---

## 🎯 Summary

| Task | Command | URL |
|------|---------|-----|
| **Start Server** | `npm start` | - |
| **Open Frontend** | Open browser | `http://localhost:3000` |
| **Test REST API** | `curl -X POST http://localhost:3000/accident` | `POST /accident` |
| **Monitor Logs** | Check terminal | - |

---

## 📄 License

MIT License - Feel free to use for your projects!

---

**Happy coding! 🚀** If you have questions, check the browser console (F12) and server logs for debugging.
#   a c c i d e n t - d e t e c t i o n  
 