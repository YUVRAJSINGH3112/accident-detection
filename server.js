const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// ✅ Better Socket config for production
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket", "polling"]
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Health check route (IMPORTANT for Render)
app.get('/health', (req, res) => {
  res.send('OK');
});

// Store connected clients count
let connectedClients = 0;

// REST API
app.post('/accident', (req, res) => {
  io.emit('accident_detected', {
    message: 'Accident detected via REST API!',
    timestamp: new Date(),
    detectionTime: new Date().toLocaleTimeString(),
    source: 'REST API'
  });

  res.json({ success: true });
});

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SOCKET
io.on('connection', (socket) => {
  connectedClients++;
  io.emit('client_count', connectedClients);

  socket.on('movement', (data) => {
    io.emit('accident_detected', {
      message: 'Accident detected!',
      timestamp: new Date(),
      source: data.sensorType || 'Movement Sensor',
      sensorData: data
    });
  });

  socket.on('manual_alert', (data) => {
    io.emit('accident_detected', {
      message: data.message || 'Manual alert',
      timestamp: new Date(),
      source: 'Manual Alert',
      sensorData: data
    });
  });

  socket.on('disconnect', () => {
    connectedClients--;
    io.emit('client_count', connectedClients);
  });
});

// PORT fix (already correct)
const PORT = process.env.PORT || 3000;

// ✅ Production-safe log
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});