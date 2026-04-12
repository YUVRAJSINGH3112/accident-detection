/**
 * Test Socket.IO Client
 * 
 * This file demonstrates how to create a simple client to test the server
 * without using the web frontend.
 * 
 * Usage:
 *   npm install socket.io-client
 *   node test-client.js
 */

const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

// ============ Socket Event Handlers ============

socket.on('connect', () => {
  console.log('\n✓ Connected to server!');
  console.log(`Socket ID: ${socket.id}\n`);
  
  // Send a movement event after connecting
  setTimeout(() => {
    console.log('📡 Sending movement sensor data...');
    socket.emit('movement', {
      sensorId: 'TEST-SENSOR-001',
      intensity: Math.random() * 100,
      location: 'Test Location',
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

socket.on('accident_detected', (data) => {
  console.log('\n🚨 ACCIDENT ALERT RECEIVED! 🚨');
  console.log('─────────────────────────────────');
  console.log(`Message: ${data.message}`);
  console.log(`Source: ${data.source}`);
  console.log(`Time: ${new Date(data.timestamp).toLocaleString()}`);
  console.log(`Client ID: ${data.clientId}`);
  if (data.sensorData) {
    console.log(`Sensor Data:`, JSON.stringify(data.sensorData, null, 2));
  }
  console.log('─────────────────────────────────\n');
});

socket.on('client_count', (count) => {
  console.log(`📊 Connected clients: ${count}`);
});

socket.on('disconnect', () => {
  console.log('\n✗ Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});

// ============ Interactive Commands ============

console.log('\n═══════════════════════════════════════');
console.log('🧪 Socket.IO Test Client');
console.log('═══════════════════════════════════════');
console.log('\nAttempting to connect to http://localhost:3000...\n');

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n\nClosing connection...');
  socket.disconnect();
  process.exit(0);
});

// Example: Send another event after 5 seconds
setTimeout(() => {
  if (socket.connected) {
    console.log('\n🚨 Sending manual alert...');
    socket.emit('manual_alert', {
      message: 'Test alert from test client',
      location: 'Test Environment'
    });
  }
}, 5000);

// Expose socket globally for manual testing in REPL
global.socket = socket;
console.log('You can now use "socket.emit(...)" in this terminal to send custom events');
